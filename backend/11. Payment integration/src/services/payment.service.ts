import { prisma } from "../config/prisma";

export const initializePayment = async (orderId: string) => {
  return prisma.payment.create({
    data: {
      orderId,
      providerReference: crypto.randomUUID(),
      checkoutUrl: `https://fake-pay.com/checkout/${crypto.randomUUID()}`
    }
  });
};