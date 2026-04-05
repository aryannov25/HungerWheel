import { useState, useEffect } from "react";
import { PLACES_DETAILS_URL, DETAILS_FIELD_MASK } from "./Constants";

const useRestaurantMenu = (placeId) => {
  const [place, setPlace] = useState(null);

  useEffect(() => {
    async function fetchPlaceDetails() {
      const res = await fetch(PLACES_DETAILS_URL + placeId, {
        headers: { "X-Goog-FieldMask": DETAILS_FIELD_MASK },
      });
      const json = await res.json();
      setPlace(json);
    }
    fetchPlaceDetails();
  }, []);

  return place;
};

export default useRestaurantMenu;
