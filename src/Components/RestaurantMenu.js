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

  const menuData =
    restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[6]?.card
      ?.card?.categories[4]?.itemCards;
  console.log(menuData?.[0]?.card?.info?.defaultPrice / 100);

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

        <div className="restaurant-menu-content">
          <div className="menu-items-container">
            <div className="menu-title-wrap">
              <h3 className="menu-title">Recommended</h3>
              <p className="menu-count">{Object.keys(menuData).length} ITEMS</p>
            </div>
            <div className="menu-items-list">
              {Object.values(menuData).map((categories) => (
                <div className="menu-item">
                  <div className="menu-item-details">
                    <h3 className="item-title">
                      {menuData?.[0]?.card?.info?.name}
                    </h3>
                    <p className="item-cost">
                      {menuData?.[0]?.card?.info?.defaultPrice > 0
                        ? new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(
                            menuData?.[0]?.card?.info?.defaultPrice / 100
                          )
                        : " "}
                    </p>
                    <p className="item-desc">
                      {menuData?.[0]?.card?.info?.description}
                    </p>
                  </div>
                  <div className="menu-img-wrapper">
                    {categories?.itemCards?.card?.info?.imageId && (
                      <img
                        className="menu-item-img"
                        src={IMG_CDN_URL + menuData?.[0]?.card?.info?.imageId}
                        alt={menuData?.[0]?.card?.info?.description}
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RestaurantMenu;
