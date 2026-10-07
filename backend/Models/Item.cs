namespace KataryApi.Models;

// 👉 PASO .NET: agrega aquí una propiedad que tenga sentido para tu proyecto
//    (ej: int Stock, double Rating, string Origin, int Minutes).
public record Item(int Id, string Name, string Description, string Category, decimal Price, int Stock);
