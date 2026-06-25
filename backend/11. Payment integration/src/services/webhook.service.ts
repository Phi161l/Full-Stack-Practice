import { prisma } from "../config/prisma";
import { paymentQueue } from "../queues/payment.queue";

export const handlePaymentWebhook = async (body: any) => {
  const { event, tx_ref } = body;

  const payment = await prisma.payment.findFirst({
    where: {
      providerReference: tx_ref,
    },
  });

  if (!payment) return;

  // 🔥 Idempotency guard
  if (payment.status === "SUCCESS" || payment.status === "FAILED") {
    return;
  }

  if (event === "payment.success") {
    await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: { status: "SUCCESS" },
      }),

      prisma.order.update({
        where: { id: payment.orderId },
        data: { status: "PAID" },
      }),
    ]);

    // 🔥 ADD QUEUE JOB HERE
    await paymentQueue.add(
      "send-receipt",
      {
        orderId: payment.orderId,
      },
      {
        attempts: 5,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
      },
    );

    return;
  }

  if (event === "payment.failed" || event === "payment.cancelled") {
    await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: { status: "FAILED" },
      }),

      prisma.order.update({
        where: { id: payment.orderId },
        data: { status: "FAILED" },
      }),
    ]);

    return;
  }
};
