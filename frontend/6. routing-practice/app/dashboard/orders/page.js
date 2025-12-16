import Link from "next/link";

export default function OrdersPage() {
  const orderIds = [101, 102, 103];
  return (
    <div>
      <h1>Orders List</h1>
      {orderIds.map((id) => (
        <p key={id}>
          <Link href={`/dashboard/orders/${id}`}>Order {id}</Link>
        </p>
      ))}
    </div>
  );
}
