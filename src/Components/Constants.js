export const PLACES_NEARBY_URL = "/gapi/v1/places:searchNearby";
export const PLACES_DETAILS_URL = "/gapi/v1/places/";
export const PLACES_PHOTO_URL = (photoName) =>
  `/photo?name=${encodeURIComponent(photoName)}`;

export const NEARBY_FIELD_MASK =
  "places.id,places.displayName,places.shortFormattedAddress,places.rating,places.userRatingCount,places.photos,places.types,places.currentOpeningHours,places.priceLevel,places.primaryTypeDisplayName";

export const DETAILS_FIELD_MASK =
  "id,displayName,formattedAddress,rating,userRatingCount,photos,types,regularOpeningHours,priceLevel,editorialSummary,reviews,websiteUri,nationalPhoneNumber,primaryTypeDisplayName";

export const DEFAULT_LOCATION = { lat: 28.5124389, lng: 77.1370115 };

// Clean up Google Places type strings → readable cuisine labels
export function formatTypes(types = []) {
  const map = {
    indian_restaurant: "Indian",
    chinese_restaurant: "Chinese",
    fast_food_restaurant: "Fast Food",
    pizza_restaurant: "Pizza",
    cafe: "Cafe",
    bakery: "Bakery",
    bar: "Bar",
    seafood_restaurant: "Seafood",
    vegetarian_restaurant: "Vegetarian",
    vegan_restaurant: "Vegan",
    dessert_shop: "Desserts",
    ice_cream_shop: "Ice Cream",
    sandwich_shop: "Sandwiches",
    burger_restaurant: "Burgers",
    ramen_restaurant: "Ramen",
    korean_restaurant: "Korean",
    thai_restaurant: "Thai",
    mexican_restaurant: "Mexican",
    italian_restaurant: "Italian",
    breakfast_restaurant: "Breakfast",
    brunch_restaurant: "Brunch",
  };
  const labels = types.map((t) => map[t]).filter(Boolean);
  return labels.length > 0 ? labels : ["Restaurant"];
}

export function formatPrice(priceLevel) {
  const map = {
    PRICE_LEVEL_FREE: "Free",
    PRICE_LEVEL_INEXPENSIVE: "₹",
    PRICE_LEVEL_MODERATE: "₹₹",
    PRICE_LEVEL_EXPENSIVE: "₹₹₹",
    PRICE_LEVEL_VERY_EXPENSIVE: "₹₹₹₹",
  };
  return map[priceLevel] || "";
}

export function filterData(searchText, restaurants) {
  return restaurants.filter((r) =>
    r.displayName?.text?.toLowerCase().includes(searchText.toLowerCase())
  );
}
