export default async function ProductDetail({ params }) {
  const {productId} = await params
  return (
    <div>
      <p style={{fontSize: 30, fontWeight: "bold"}}>  Welcome to Product ID: {productId}</p>
      <p style={{ height: "100vh" }}>Scroll down to test scrolling behavior...</p>
    </div>
  );
}
