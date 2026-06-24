export const createCheckoutSession = async (orderId: string) => {
  // Simulate provider response
  return {
    tx_ref: crypto.randomUUID(),
    checkout_url: `https://fake-pay.com/checkout/${crypto.randomUUID()}`,
  };
};