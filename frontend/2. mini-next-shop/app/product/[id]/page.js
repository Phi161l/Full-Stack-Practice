import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {

    const et = await params
    const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
    const products = await res.json();

    const product = products.find(p => p.id === parseInt(et.id));

    if (!product) return notFound();

    return (
    <div>
        <h2>{product.name}</h2>
        <p>${product.price}</p>
        <p>{product.description}</p>
    </div>
    );
}


