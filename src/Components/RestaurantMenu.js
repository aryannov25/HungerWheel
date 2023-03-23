import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "./Constants";
import useRestaurant from "./useRestaurant";
import Shimmer from "./Shimmer";
import Nav from "./Navbar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { addItem } from "./cartSlice";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const restaurant = useRestaurant(resId);

  const recData =
    restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.find(
      (items) => items.card.card.title == "Recommended"
    );

  // console.log(recData);

  // .find(items => items.card.card.title=="Recommended")

  const dispatch = useDispatch();

  const addFoodItem = (itemCards) => {
    dispatch(addItem(itemCards));
  };

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
              <p className="menu-count">
                {Object.keys(recData?.card?.card?.itemCards).length} ITEMS
              </p>
            </div>
            <div className="menu-items-list">
              {Object.values(recData?.card?.card?.itemCards).map(
                (itemCards) => (
                  <div className="menu-item">
                    <div className="menu-item-details">
                      <h3 className="item-title">
                        {itemCards?.card?.info?.name}
                      </h3>
                      <p className="item-cost">
                        {itemCards?.card?.info?.price > 0
                          ? new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                            }).format(itemCards?.card?.info?.price / 100)
                          : " "}
                      </p>
                      <p className="item-desc">
                        {itemCards?.card?.info?.description}
                      </p>
                    </div>
                    <div className="menu-img-wrapper">
                      {itemCards?.card?.info?.imageId && (
                        <img
                          className="menu-item-img"
                          src={IMG_CDN_URL + itemCards?.card?.info?.imageId}
                          alt={itemCards?.card?.info?.description}
                        />
                      )}
                      <button
                        className="btn bg-orange-400 add-btn"
                        onClick={() => addFoodItem(itemCards?.card?.info)}
                      >
                        {" "}
                        ADD +
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RestaurantMenu;
