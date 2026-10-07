import type { Item } from "../types";

const money = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

export function ItemList({ items, onDelete }: { items: Item[]; onDelete: (id: number) => void }) {
  if (!items.length) return <p className="muted">Aún no hay elementos.</p>;

  return (
    <ul className="grid">
      {items.map((item) => (
        <li key={item.id} className="card">
          <span className="badge">{item.category}</span>
          <h3>{item.name}</h3>
          <p className="muted">{item.description}</p>
          <p className="stock">Stock: {item.stock}</p>
          <div className="card-footer">
            <strong>{money.format(item.price)}</strong>
            <button className="link" onClick={() => onDelete(item.id)}>
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
