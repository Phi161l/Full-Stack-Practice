import { prisma } from "../config/prisma";

export const handlePaymentWebhook = async (body: any) => {
  const { event, tx_ref } = body;

  const payment = await prisma.payment.findFirst({
    where: {
      providerReference: tx_ref,
    },
  });

  if (!payment) return;

  if (event === "payment.success") {
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: "SUCCESS" },
    });

    await prisma.order.update({
      where: { id: payment.orderId },
      data: { status: "PAID" },
    });
  }

  if (event === "payment.failed" || event === "payment.cancelled") {
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: "FAILED" },
    });

    await prisma.order.update({
      where: { id: payment.orderId },
      data: { status: "FAILED" },
    });
  }
};

