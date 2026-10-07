using System.Collections.Concurrent;
using KataryApi.Models;

namespace KataryApi.Data;

// Almacén en memoria: se reinicia cada vez que corres la API.
// Reto para casa: reemplázalo por una base de datos con Entity Framework Core.
public class ItemStore
{
    private readonly ConcurrentDictionary<int, Item> _items = new();
    private int _nextId;

    public ItemStore()
    {
        // 👉 PASO .NET: reemplaza estos datos de ejemplo por los de TU idea.
        Seed(new Item(0, "Audífonos inalámbricos", "Sonido envolvente y cancelación de ruido activa.", "Audio", 249900, 15));
        Seed(new Item(0, "Teclado mecánico RGB", "Interruptores rojos, retroiluminación personalizable.", "Periféricos", 189900, 8));
        Seed(new Item(0, "Mouse gamer", "Sensor de 12000 DPI y 7 botones programables.", "Periféricos", 89000, 25));
        Seed(new Item(0, "Monitor 27\" QHD", "Panel IPS 144 Hz para gaming y trabajo.", "Pantallas", 1299900, 4));
        Seed(new Item(0, "Smartwatch fitness", "Monitoreo de GPS, ritmo cardiaco y sueño.", "Wearables", 349900, 11));
    }

    public IEnumerable<Item> GetAll() => _items.Values.OrderBy(i => i.Id);

    public Item? Get(int id) => _items.GetValueOrDefault(id);

    public Item Add(Item item)
    {
        var created = item with { Id = Interlocked.Increment(ref _nextId) };
        _items[created.Id] = created;
        return created;
    }

    public bool Remove(int id) => _items.TryRemove(id, out _);

    private void Seed(Item item) => Add(item);
}
