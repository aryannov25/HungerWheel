import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "./Constants";
import useRestaurant from "./useRestaurant";
import Shimmer from "./Shimmer";
import Nav from "./Navbar";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const restaurant = useRestaurant(resId);

  return !restaurant ? (
    <Shimmer />
  ) : (
    // <div className="flex">
    //   <div>
    //     <h1>Restraunt id: {resId}</h1>
    //     <h2>{restaurant?.name}</h2>
    //     <img src={IMG_CDN_URL + restaurant?.cloudinaryImageId} />
    //     <h3>{restaurant?.area}</h3>
    //     <h3>{restaurant?.city}</h3>
    //     <h3>{restaurant?.avgRating} stars</h3>
    //     <h3>{restaurant?.costForTwoMsg}</h3>
    //   </div>
    //   <div className="p-5">
    //     <h1>Menu</h1>
    //     <ul data-testid="menu">
    //       {Object.values(restaurant?.menu?.items).map((item) => (
    //         <li key={item.id}>{item.name} - </li>
    //         // <li>{item.rate} - </li>

    //       ))}
    //     </ul>
    //   </div>
    // </div>
    <>
      <Nav />

      <div className="restaurant-menu">
        <div className="restaurant-summary">
          <img
            className="restaurant-img"
            src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
            alt={restaurant?.name}
          />
          <div className="restaurant-summary-details">
            <h2 className="restaurant-title">{restaurant?.name}</h2>
            <p className="restaurant-tags">{restaurant?.cuisines.join(", ")}</p>
            <div className="restaurant-details">
              <div
                className="restaurant-rating"
                style={
                  restaurant?.avgRating < 4
                    ? { backgroundColor: "var(--light-red)" }
                    : restaurant?.avgRating === "--"
                    ? { backgroundColor: "white", color: "black" }
                    : { color: "white" }
                }
              >
                <i className="fa-solid fa-star"></i>
                <span>{restaurant?.avgRating}</span>
              </div>
              <div>|</div>
              <div>{restaurant?.sla.slaString}</div>
              <div>|</div>
              <div>{restaurant?.costForTwoMsg}</div>
            </div>
          </div>
        </div>

        <div className="restaurant-menu-content">
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
        </div>
      </div>
      <h4 className="p-10 m-10 text-center">
        This site is developed by{" "}
        <a
          className=" text-orange-400"
          href="https://www.linkedin.com/in/aryan-chaudhary-133855230/"
          target="_blank"
        >
          Aryan Chaudhary
        </a>
        .
      </h4>
    </>
  );
};

export default RestaurantMenu;
