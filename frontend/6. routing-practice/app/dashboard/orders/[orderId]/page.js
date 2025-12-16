export default async function OrderDetail({ params }) {
  const {orderId} = await params
  return (
    <div>
      <h1>Order Details</h1>
      <p style={{fontSize: 20}}>Order ID: {orderId}</p>
    </div>
  );
}
