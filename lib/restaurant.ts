export const RESTAURANT = {
  name: "Le Bellagio",
  tagline: {
    fr: "Cuisine française, fait maison, à Alès",
    en: "French cuisine, homemade, in Alès",
  },
  address: "23 place Henri Barbusse, 30100 Alès, France",
  addressShort: "23 pl. Henri Barbusse, Alès",
  phone: "+33 4 66 52 99 59",
  phoneRaw: "+33466529959",
  email: "lebellagioales@gmail.com",
  facebook: "https://www.facebook.com/lebellagioales",
  instagram: "https://www.instagram.com/lebellagioales",
  whatsapp: "https://wa.me/33466529959",
  google: "https://maps.google.com/?q=Le+Bellagio+Alès",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2866.0!2d4.0815!3d44.1255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b42e3e4e0b7f1b%3A0x1234567890abcdef!2s23%20Pl.%20Henri%20Barbusse%2C%2030100%20Al%C3%A8s!5e0!3m2!1sfr!2sfr!4v1718000000000!5m2!1sfr!2sfr",
}

export const HOURS = [
  { day: { fr: "Lundi", en: "Monday" }, lunch: "12h00 – 14h00", dinner: "19h00 – 22h00" },
  { day: { fr: "Mardi", en: "Tuesday" }, lunch: "12h00 – 14h00", dinner: "19h00 – 22h00" },
  { day: { fr: "Mercredi", en: "Wednesday" }, lunch: "12h00 – 14h00", dinner: "19h00 – 22h00" },
  { day: { fr: "Jeudi", en: "Thursday" }, lunch: "12h00 – 14h00", dinner: "19h00 – 22h00" },
  { day: { fr: "Vendredi", en: "Friday" }, lunch: "12h00 – 14h00", dinner: "19h00 – 22h30" },
  { day: { fr: "Samedi", en: "Saturday" }, lunch: "12h00 – 14h30", dinner: "19h00 – 22h30" },
  { day: { fr: "Dimanche", en: "Sunday" }, lunch: null, dinner: null, closed: true },
]

export interface DayHours {
  /** JS Date.getDay() convention: 0 = Sunday … 6 = Saturday */
  day: number
  ranges: Array<[string, string]>
}

// Structured version of HOURS above, used to compute live open/closed status
// and the JSON-LD openingHoursSpecification. Keep in sync with HOURS.
export const OPENING_HOURS: DayHours[] = [
  { day: 0, ranges: [] }, // Sunday — closed
  { day: 1, ranges: [["12:00", "14:00"], ["19:00", "22:00"]] },
  { day: 2, ranges: [["12:00", "14:00"], ["19:00", "22:00"]] },
  { day: 3, ranges: [["12:00", "14:00"], ["19:00", "22:00"]] },
  { day: 4, ranges: [["12:00", "14:00"], ["19:00", "22:00"]] },
  { day: 5, ranges: [["12:00", "14:00"], ["19:00", "22:30"]] },
  { day: 6, ranges: [["12:00", "14:30"], ["19:00", "22:30"]] },
]

export const MENU_CATEGORIES = [
  {
    id: "entrees",
    label: { fr: "Entrées", en: "Starters" },
    items: [
      {
        name: { fr: "Terrine de foie gras maison", en: "Homemade foie gras terrine" },
        description: {
          fr: "Brioche toastée, chutney de figues, fleur de sel",
          en: "Toasted brioche, fig chutney, fleur de sel",
        },
        price: "18.50",
        image: "/images/dish-2.png",
      },
      {
        name: { fr: "Salade de chèvre chaud", en: "Warm goat cheese salad" },
        description: {
          fr: "Toast de chèvre, miel, noix, mesclun",
          en: "Goat cheese toast, honey, walnuts, mixed greens",
        },
        price: "12.50",
        image: "/images/dish-2.png",
      },
      {
        name: { fr: "Soupe à l'oignon gratinée", en: "French onion soup" },
        description: {
          fr: "Gruyère fondu, croûtons maison",
          en: "Melted gruyère, homemade croutons",
        },
        price: "10.00",
        image: "/images/dish-2.png",
      },
      {
        name: { fr: "Crevettes à l'ail et herbes", en: "Garlic herb prawns" },
        description: {
          fr: "Beurre maître d'hôtel, pain grillé",
          en: "Maître d'hôtel butter, grilled bread",
        },
        price: "14.00",
        image: "/images/dish-2.png",
      },
    ],
  },
  {
    id: "plats",
    label: { fr: "Plats", en: "Main Courses" },
    items: [
      {
        name: { fr: "Confit de canard maison", en: "Homemade duck confit" },
        description: {
          fr: "Pommes sarladaises, sauce aux cèpes",
          en: "Sarladaise potatoes, porcini sauce",
        },
        price: "22.00",
        image: "/images/dish-1.png",
        featured: true,
      },
      {
        name: { fr: "Entrecôte grillée", en: "Grilled ribeye steak" },
        description: {
          fr: "Sauce béarnaise, frites maison, salade",
          en: "Béarnaise sauce, homemade fries, salad",
        },
        price: "26.00",
        image: "/images/dish-1.png",
        featured: true,
      },
      {
        name: { fr: "Filet de saumon au beurre blanc", en: "Salmon fillet beurre blanc" },
        description: {
          fr: "Légumes de saison, riz pilaf",
          en: "Seasonal vegetables, pilaf rice",
        },
        price: "21.00",
        image: "/images/dish-1.png",
      },
      {
        name: { fr: "Pavé de cabillaud rôti", en: "Roasted cod fillet" },
        description: {
          fr: "Vierge de tomates, haricots verts",
          en: "Tomato vierge, green beans",
        },
        price: "20.00",
        image: "/images/dish-1.png",
      },
    ],
  },
  {
    id: "pizzas",
    label: { fr: "Pizzas", en: "Pizzas" },
    items: [
      {
        name: { fr: "Margherita", en: "Margherita" },
        description: {
          fr: "Tomate, mozzarella fior di latte, basilic frais",
          en: "Tomato, fior di latte mozzarella, fresh basil",
        },
        price: "13.00",
        image: "/images/dish-3.png",
      },
      {
        name: { fr: "4 Fromages", en: "Four Cheese" },
        description: {
          fr: "Mozzarella, gorgonzola, chèvre, parmesan",
          en: "Mozzarella, gorgonzola, goat cheese, parmesan",
        },
        price: "15.00",
        image: "/images/dish-3.png",
      },
      {
        name: { fr: "Reine", en: "Queen" },
        description: {
          fr: "Tomate, mozzarella, jambon, champignons",
          en: "Tomato, mozzarella, ham, mushrooms",
        },
        price: "14.00",
        image: "/images/dish-3.png",
      },
      {
        name: { fr: "Bellagio spéciale", en: "Bellagio special" },
        description: {
          fr: "Tomate, mozzarella, merguez, poivrons, olives",
          en: "Tomato, mozzarella, merguez, peppers, olives",
        },
        price: "16.00",
        image: "/images/dish-3.png",
        featured: true,
      },
    ],
  },
  {
    id: "desserts",
    label: { fr: "Desserts", en: "Desserts" },
    items: [
      {
        name: { fr: "Crème brûlée à la vanille", en: "Vanilla crème brûlée" },
        description: {
          fr: "Recette maison, fruits rouges frais",
          en: "Homemade recipe, fresh red berries",
        },
        price: "8.50",
        image: "/images/dish-4.png",
        featured: true,
      },
      {
        name: { fr: "Fondant au chocolat", en: "Chocolate fondant" },
        description: {
          fr: "Cœur coulant, glace vanille",
          en: "Molten center, vanilla ice cream",
        },
        price: "9.00",
        image: "/images/dish-4.png",
      },
      {
        name: { fr: "Tarte tatin maison", en: "Homemade tarte tatin" },
        description: {
          fr: "Crème fraîche, caramel beurre salé",
          en: "Crème fraîche, salted butter caramel",
        },
        price: "8.00",
        image: "/images/dish-4.png",
      },
      {
        name: { fr: "Assiette de fromages", en: "Cheese plate" },
        description: {
          fr: "Sélection de fromages français, confiture",
          en: "Selection of French cheeses, jam",
        },
        price: "10.00",
        image: "/images/dish-4.png",
      },
    ],
  },
  {
    id: "boissons",
    label: { fr: "Boissons", en: "Drinks" },
    items: [
      {
        name: { fr: "Vin rouge – Faugères AOP", en: "Red wine – Faugères AOP" },
        description: {
          fr: "Carafe 25cl, vins du Languedoc",
          en: "25cl carafe, Languedoc wines",
        },
        price: "6.50",
      },
      {
        name: { fr: "Vin blanc – Picpoul de Pinet", en: "White wine – Picpoul de Pinet" },
        description: {
          fr: "Carafe 25cl, vins du Languedoc",
          en: "25cl carafe, Languedoc wines",
        },
        price: "6.50",
      },
      {
        name: { fr: "Eau minérale", en: "Mineral water" },
        description: {
          fr: "Evian ou Badoit, 50cl",
          en: "Evian or Badoit, 50cl",
        },
        price: "3.50",
      },
      {
        name: { fr: "Café express", en: "Espresso" },
        description: {
          fr: "Café de spécialité torréfié artisanalement",
          en: "Specialty coffee, artisan roasted",
        },
        price: "2.50",
      },
    ],
  },
]

export const PAYMENT_METHODS = [
  { fr: "Carte bancaire", en: "Credit card" },
  { fr: "Espèces", en: "Cash" },
  { fr: "Chèque", en: "Cheque" },
  { fr: "Ticket restaurant", en: "Meal voucher" },
]

export const SERVICES = [
  { fr: "Cuisine française", en: "French cuisine" },
  { fr: "Fait maison", en: "Homemade" },
  { fr: "Climatisé", en: "Air-conditioned" },
  { fr: "Accessible PMR", en: "Wheelchair accessible" },
  { fr: "Animaux acceptés", en: "Pets welcome" },
  { fr: "À emporter", en: "Takeaway" },
  { fr: "Réservation recommandée", en: "Booking recommended" },
]
