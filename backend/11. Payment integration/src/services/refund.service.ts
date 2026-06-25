import { prisma } from "../config/prisma";
import { refundPayment } from "./provider.service";

export const createRefund = async (paymentId: string) => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
  });

  if (!payment) throw new Error("Payment not found");

  if (payment.status === "REFUNDED") return;

  // 1. Call provider (REAL WORLD STEP)
  const refund = await refundPayment(payment.providerReference!);

  if (refund.status !== "success") {
    throw new Error("Refund failed at provider");
  }

  // 2. Save everything atomically
  await prisma.$transaction([
    prisma.refund.create({
      data: {
        paymentId,
        amount: 100, // later replace with real amount
      },
    }),

    prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: "REFUNDED",
      },
    }),

    prisma.order.update({
      where: { id: payment.orderId },
      data: {
        status: "REFUNDED",
      },
    }),
  ]);

  return refund;
};