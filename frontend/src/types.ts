// Debe coincidir con backend/Models/Item.cs (en camelCase).
// 👉 PASO React: agrega aquí la propiedad nueva que creaste en .NET.
export type Item = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
};

export type NewItem = Omit<Item, "id">;

export type ChatMessage = { role: "user" | "assistant"; content: string };
