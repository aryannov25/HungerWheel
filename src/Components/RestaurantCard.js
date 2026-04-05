import React from "react";
import { PLACES_PHOTO_URL, formatTypes, formatPrice } from "./Constants";

const RestaurantCard = ({ place }) => {
  const { displayName, shortFormattedAddress, rating, userRatingCount,
          photos, types, currentOpeningHours, priceLevel } = place;

  const photoUrl = photos?.[0]?.name ? PLACES_PHOTO_URL(photos[0].name) : null;
  const cuisines = formatTypes(types);
  const price    = formatPrice(priceLevel);
  const isOpen   = currentOpeningHours?.openNow;

  const ratingBg = !rating         ? "bg-gray-100 text-gray-500"
    : rating >= 4   ? "bg-green-500 text-white"
    : rating >= 3.5 ? "bg-amber-400 text-white"
    :                 "bg-red-500 text-white";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">

      {/* Image */}
      <div className="relative overflow-hidden h-44 shrink-0">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={displayName?.text}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center text-5xl">
            🍽️
          </div>
        )}

        {/* Overlay badges */}
        <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-end justify-between bg-gradient-to-t from-black/50 to-transparent">
          {rating && (
            <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${ratingBg}`}>
              ★ {rating}
              {userRatingCount && (
                <span className="font-normal opacity-80">({userRatingCount})</span>
              )}
            </span>
          )}
          <div className="flex items-center gap-1.5 ml-auto">
            {price && (
              <span className="text-xs font-semibold bg-black/40 text-white px-2 py-0.5 rounded-md backdrop-blur-sm">
                {price}
              </span>
            )}
            {isOpen !== undefined && (
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}>
                {isOpen ? "Open" : "Closed"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1 flex-grow">
        <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2">
          {displayName?.text}
        </h3>
        <p className="text-orange-500 text-xs font-medium truncate">
          {cuisines.join(" · ")}
        </p>
        <p className="text-gray-400 text-xs truncate mt-auto pt-1">
          <i className="fa-solid fa-location-dot mr-1 text-gray-300" />
          {shortFormattedAddress}
        </p>
      </div>

    </div>
  );
};

export default RestaurantCard;
