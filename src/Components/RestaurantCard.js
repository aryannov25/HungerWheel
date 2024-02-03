import React from "react";
import { IMG_CDN_URL } from "./Constants";

const RestaurantCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  areaName,
  sla,
  costForTwo,
  avgRating,
}) => {
  // Function to determine the color class based on the rating value
  const ratingColorClass = (rating) => {
    if (rating < 3.5) return "text-red-500";
    if (rating >= 3.5 && rating < 4) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="card w-64 h-auto bg-white rounded-lg overflow-hidden shadow-lg m-4 transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl">
      <img
        src={IMG_CDN_URL + cloudinaryImageId}
        alt={name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-xl mb-2 text-gray-900">{name}</h3>
        <h5 className="text-gray-600 text-sm mb-2 truncate">
          {cuisines.join(", ")}
        </h5>
        <h3 className="text-gray-800 text-sm mb-2">{areaName}</h3>
        <div className="flex items-center space-x-2 text-sm">
          {/* Apply the dynamic class for the rating color */}
          <span className={`flex items-center ${ratingColorClass(avgRating)}`}>
            &#9733; {avgRating}
          </span>
          <span className="text-gray-600">• {sla.slaString}</span>
          <span className="text-gray-600">• ₹{costForTwo}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
