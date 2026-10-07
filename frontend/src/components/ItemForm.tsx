import { useState, type FormEvent } from "react";
import { api } from "../api";
import type { NewItem } from "../types";

const empty: NewItem = { name: "", description: "", category: "", price: 0, stock: 0 };

export function ItemForm({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState<NewItem>(empty);
  const [saving, setSaving] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.createItem(form);
      setForm(empty);
      onCreated();
    } catch (err) {
      alert(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="card form" onSubmit={submit}>
      <h3>Agregar elemento</h3>
      <input placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input placeholder="Categoría" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
      <textarea placeholder="Descripción" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <input
        type="number"
        placeholder="Precio"
        value={form.price || ""}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Stock"
        value={form.stock || ""}
        onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
      />
      <button className="primary" disabled={saving}>
        {saving ? "Guardando…" : "Guardar"}
      </button>
    </form>
  );
}
