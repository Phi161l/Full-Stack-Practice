export async function GET() {
  const products = [
    { id: 1, name: "Red T-Shirt", price: 25, description: "A bright red t-shirt." },
    { id: 2, name: "Blue Jeans", price: 40, description: "Comfortable blue jeans." },
    { id: 3, name: "Sneakers", price: 60, description: "Stylish running sneakers." }
  ];
  
  return Response.json(products);
}