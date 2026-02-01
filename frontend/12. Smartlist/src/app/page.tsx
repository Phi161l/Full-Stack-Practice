import { getItems } from "@/lib/dataStore";

export default function HomePage() {
  const items = getItems();

  return (
    <div>
      <h1>SmartList</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.category} - {item.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
