export const createCheckoutSession = async (orderId: string) => {
  // Simulate provider response
  return {
    tx_ref: crypto.randomUUID(),
    checkout_url: `https://fake-pay.com/checkout/${crypto.randomUUID()}`,
  };
};

// refund simulation
export const refundPayment = async (providerReference: string) => {
  // simulate provider refund API call
  return {
    refund_id: crypto.randomUUID(),
    status: "success",
    providerReference,
  };
};
