const menus = {
  indian: [
    { id: "i1", name: "Butter Chicken", description: "Tender chicken in rich tomato-butter gravy", price: 32900, imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=200&fit=crop" },
    { id: "i2", name: "Paneer Tikka Masala", description: "Grilled paneer in spiced masala sauce", price: 28900, imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop" },
    { id: "i3", name: "Dal Makhani", description: "Slow-cooked black lentils with cream and butter", price: 22900, imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop" },
    { id: "i4", name: "Garlic Naan", description: "Soft leavened bread with garlic and butter", price: 8900, imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop" },
    { id: "i5", name: "Chicken Biryani", description: "Fragrant basmati rice layered with spiced chicken", price: 35900, imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&h=200&fit=crop" },
    { id: "i6", name: "Samosa (2 pcs)", description: "Crispy pastry filled with spiced potatoes and peas", price: 7900, imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop" },
    { id: "i7", name: "Mango Lassi", description: "Chilled yogurt drink with fresh mango", price: 12900, imageUrl: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=300&h=200&fit=crop" },
    { id: "i8", name: "Gulab Jamun", description: "Soft milk dumplings soaked in rose syrup", price: 11900, imageUrl: "https://images.unsplash.com/photo-1666543074055-1a9a9b7d6f87?w=300&h=200&fit=crop" },
  ],
  chinese: [
    { id: "c1", name: "Hakka Noodles", description: "Stir-fried noodles with vegetables and soy sauce", price: 22900, imageUrl: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=300&h=200&fit=crop" },
    { id: "c2", name: "Chicken Manchurian", description: "Crispy chicken balls in tangy manchurian sauce", price: 27900, imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&h=200&fit=crop" },
    { id: "c3", name: "Veg Fried Rice", description: "Wok-tossed rice with vegetables and eggs", price: 19900, imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop" },
    { id: "c4", name: "Spring Rolls (4 pcs)", description: "Crispy rolls filled with vegetables", price: 16900, imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop" },
    { id: "c5", name: "Hot & Sour Soup", description: "Tangy soup with mushrooms and tofu", price: 14900, imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=200&fit=crop" },
    { id: "c6", name: "Chilli Paneer", description: "Crispy paneer tossed with peppers and chilli sauce", price: 24900, imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=200&fit=crop" },
  ],
  fastfood: [
    { id: "f1", name: "Veg Burger", description: "Crispy patty with lettuce, tomato and cheese", price: 18900, imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop" },
    { id: "f2", name: "Chicken Burger", description: "Juicy grilled chicken fillet with mayo and veggies", price: 22900, imageUrl: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300&h=200&fit=crop" },
    { id: "f3", name: "French Fries (Large)", description: "Golden crispy fries with seasoning", price: 12900, imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=200&fit=crop" },
    { id: "f4", name: "Cheese Pizza", description: "Classic mozzarella pizza on thin crust", price: 28900, imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop" },
    { id: "f5", name: "Cold Coffee", description: "Chilled blended coffee with milk", price: 14900, imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop" },
    { id: "f6", name: "Chocolate Shake", description: "Thick creamy chocolate milkshake", price: 16900, imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=200&fit=crop" },
  ],
  cafe: [
    { id: "ca1", name: "Cappuccino", description: "Espresso with steamed milk foam", price: 18900, imageUrl: "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=300&h=200&fit=crop" },
    { id: "ca2", name: "Cold Brew", description: "Slow-steeped cold coffee served over ice", price: 22900, imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop" },
    { id: "ca3", name: "Avocado Toast", description: "Toasted sourdough with smashed avocado and seasoning", price: 24900, imageUrl: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=300&h=200&fit=crop" },
    { id: "ca4", name: "Blueberry Muffin", description: "Soft muffin loaded with fresh blueberries", price: 12900, imageUrl: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300&h=200&fit=crop" },
    { id: "ca5", name: "Croissant", description: "Buttery flaky French pastry", price: 13900, imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=200&fit=crop" },
    { id: "ca6", name: "Matcha Latte", description: "Ceremonial grade matcha with oat milk", price: 21900, imageUrl: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=300&h=200&fit=crop" },
  ],
  default: [
    { id: "d1", name: "Chef's Special Thali", description: "A wholesome platter with dal, sabzi, rice and roti", price: 34900, imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop" },
    { id: "d2", name: "Masala Chai", description: "Spiced Indian tea with milk", price: 7900, imageUrl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300&h=200&fit=crop" },
    { id: "d3", name: "Veg Sandwich", description: "Grilled sandwich with fresh veggies and chutney", price: 14900, imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300&h=200&fit=crop" },
    { id: "d4", name: "Pasta Arrabiata", description: "Penne in spicy tomato sauce with herbs", price: 24900, imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=200&fit=crop" },
    { id: "d5", name: "Caesar Salad", description: "Romaine lettuce with Caesar dressing and croutons", price: 21900, imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop" },
    { id: "d6", name: "Chocolate Brownie", description: "Warm fudgy brownie with vanilla ice cream", price: 18900, imageUrl: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=300&h=200&fit=crop" },
  ],
};

export function getMenuForPlace(types = []) {
  if (types.some((t) => t.includes("indian"))) return menus.indian;
  if (types.some((t) => t.includes("chinese") || t.includes("asian"))) return menus.chinese;
  if (types.some((t) => t.includes("fast_food") || t.includes("burger") || t.includes("pizza"))) return menus.fastfood;
  if (types.some((t) => t.includes("cafe") || t.includes("coffee") || t.includes("bakery"))) return menus.cafe;
  return menus.default;
}
