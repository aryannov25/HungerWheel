import React from "react";
import { IMG_CDN_URL } from "./Constants";

const RestaurantCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  area,
  lastMileTravelString,
  costForTwoString,
  avgRating,
}) => {
  return (
    // <div className="w-60 p-2 mt-2 m-2 shadow-lg h-full bg-purple-50">
    // <img src={IMG_CDN_URL + cloudinaryImageId} />
    // <h2 className="font-bold text-xl">{name}</h2>
    // <h3>{cuisines.join(", ")}</h3>
    // <h4>{lastMileTravelString}</h4>
    //  </div>

    <div className="card w-60 p-2 mt-2 m-4 shadow-lg h-full bg-purple-50">
      <img src={IMG_CDN_URL + cloudinaryImageId} />
      <h3 className="font-bold text-lg">{name}</h3>
      <h5>{cuisines.join(", ")}</h5>
      <h5>{area}</h5>
      <span>
        <h4> &#9733; {avgRating}</h4>
        <h4>• {lastMileTravelString}</h4>
        <h4>• {costForTwoString}</h4>
      </span>
    </div>
  );
};
export default RestaurantCard;
