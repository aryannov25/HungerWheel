import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "./Constants";
import useRestaurant from "./useRestaurant";
import Shimmer from "./Shimmer";
import Nav from "./Navbar";
import Footer from "./Footer";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const restaurant = useRestaurant(resId);
  console.log(restaurant?.cards[0]?.card?.card?.info?.cuisines.join(", "));

  return !restaurant ? (
    <Shimmer />
  ) : (
    <>
      <Nav />

      <div className="restaurant-menu">
        <div className="restaurant-summary">
          <img
            className="restaurant-img"
            src={
              IMG_CDN_URL +
              restaurant?.cards[0]?.card?.card?.info?.cloudinaryImageId
            }
            alt={restaurant?.cards[0]?.card?.card?.info?.name}
          />
          <div className="restaurant-summary-details">
            <h2 className="restaurant-title">
              {restaurant?.cards[0]?.card?.card?.info?.name},{" "}
              {restaurant?.cards[0]?.card?.card?.info?.areaName}
            </h2>
            <p className="restaurant-tags">
              {restaurant?.cards[0]?.card?.card?.info?.cuisines.join(", ")}
            </p>
            <div className="restaurant-details">
              <div>
                <span>
                  &#9733;{" "}
                  {restaurant?.cards[0]?.card?.card?.info?.avgRatingString}
                </span>
              </div>
              <div>|</div>
              <div>
                {restaurant?.cards[0]?.card?.card?.info?.sla?.slaString}
              </div>
              <div>|</div>
              <div>
                {restaurant?.cards[0]?.card?.card?.info?.costForTwoMessage}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="restaurant-menu-content">
          <div className="menu-items-container">
            <div className="menu-title-wrap">
              <h3 className="menu-title">Recommended</h3>
              <p className="menu-count">
                {Object.keys(restaurant?.menu?.items).length} ITEMS
              </p>
            </div>
            <div className="menu-items-list">
              {Object.values(restaurant?.menu?.items).map((item) => (
                <div className="menu-item" key={item?.id}>
                  <div className="menu-item-details">
                    <h3 className="item-title">{item?.name}</h3>
                    <p className="item-cost">
                      {item?.price > 0
                        ? new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(item?.price / 100)
                        : " "}
                    </p>
                    <p className="item-desc">{item?.description}</p>
                  </div>
                  <div className="menu-img-wrapper">
                    {item?.cloudinaryImageId && (
                      <img
                        className="menu-item-img"
                        src={IMG_CDN_URL + item?.cloudinaryImageId}
                        alt={item?.name}
                      />
                    )}
                    <button className="btn bg-orange-400 add-btn">
                      {" "}
                      ADD +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default RestaurantMenu;
