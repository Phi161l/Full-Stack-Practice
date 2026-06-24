import { prisma } from "../config/prisma";
import { createCheckoutSession } from "./provider.service";

export const initializePayment = async (orderId: string) => {
  // Call provider
  const session = await createCheckoutSession(orderId);

  // Save provider response
  const payment = await prisma.payment.create({
    data: {
      orderId,
      providerReference: session.tx_ref,
      checkoutUrl: session.checkout_url,
    },
  });

  return payment;
};