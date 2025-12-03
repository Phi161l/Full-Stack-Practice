import Link from "next/link";

export default function ProductsLayout({ children }) {
  const productLinks = [1, 2, 3];

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <aside style={{ width: "150px", borderRight: "1px solid #ccc", paddingRight: "10px" }}>
        <h3>Products</h3>
        <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {productLinks.map((id) => (
            <Link key={id} href={`/products/${id}`}>
              Product {id}
            </Link>
          ))}
          <Link href="/products/create">+ Create Product</Link>
        </nav>
      </aside>
      
      <div style={{ flex: 1, paddingLeft: "10px" }}>
        {children}
      </div>
    </div>
  );
}
