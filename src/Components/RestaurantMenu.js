import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IMG_CDN_URL } from "./Constants";
import useRestaurant from "./useRestaurantMenu";
import { MenuShimmer } from "./Shimmer";
import Nav from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "./cartSlice";
import ScrollToTop from "./scrollToTop";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const restaurant = useRestaurant(resId);
  let result = [],
    uniqueFoodItems = [];
  const restaurantMenuInfo = restaurant?.cards;
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const getRestaurantInfo = (restaurant) => {
    // Check if the expected structure for mobile exists
    if (restaurant?.cards[2]?.card?.card?.info) {
      return restaurant.cards[2].card.card.info;
    }
    // Fallback to the web structure
    else if (restaurant?.cards[0]?.card?.card?.info) {
      return restaurant.cards[0].card.card.info;
    }
    // Return null or a default object if neither path works
    return null;
  };

  const restaurantInfo = getRestaurantInfo(restaurant);

  // const menu = restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.find(x => x.card.card.title=="Recommended")
  //   console.log(menu)

  const customFilter = (object, result) => {
    if (object.hasOwnProperty("itemCards")) result.push(object);

    for (var i = 0; i < Object.keys(object).length; i++) {
      if (typeof object[Object.keys(object)[i]] == "object") {
        customFilter(object[Object.keys(object)[i]], result);
      }
    }
  };
  const resMenu =
    restaurantMenuInfo?.length > 0 && customFilter(restaurantMenuInfo, result); //, "@type", "type.googleapis.com/swiggy.presentation.food.v2.Dish");
  if (result.length > 0) {
    const uniqueIds = [];
    let uniqueItems = [
      ...new Set(result.flatMap((f) => f.itemCards).map((p) => p.card.info)),
    ];
    uniqueFoodItems = uniqueItems?.filter((element) => {
      const isDuplicate = uniqueIds.includes(element.id);

      if (!isDuplicate) {
        uniqueIds.push(element.id);

        return true;
      }

      return false;
    });
  }

  const addFoodItem = (item) => {
    dispatch(addItem(item));
  };

  const removeFoodItem = () => {
    dispatch(removeItem());
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      {!restaurant ? (
        <>
          <MenuShimmer />
          <ScrollToTop />
        </>
      ) : (
        <div className="container mx-auto max-w-screen-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-dotted pb-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{restaurantInfo?.name}</h1>
              <ul className="space-y-1 text-slate-500">
                <li>{restaurantInfo?.cuisines.join(", ")}</li>
                <li>
                  {restaurantInfo?.areaName},{" "}
                  {restaurantInfo?.sla?.lastMileTravelString}
                </li>
                <li className="text-green-700">
                  {restaurantInfo?.avgRating} &#9733; ||{" "}
                  {restaurantInfo?.totalRatingsString}
                </li>
              </ul>
            </div>
            <div className="w-full">
              <img
                className="rounded-lg object-cover w-full h-60"
                srcSet={`${
                  IMG_CDN_URL + restaurantInfo?.cloudinaryImageId
                } 300w,
           ${IMG_CDN_URL + restaurantInfo?.cloudinaryImageId} 768w,
           ${IMG_CDN_URL + restaurantInfo?.cloudinaryImageId} 1280w`}
                sizes="(max-width: 300px) 100vw, (max-width: 768px) 100vw, 1280px"
                src={IMG_CDN_URL + restaurantInfo?.cloudinaryImageId}
                alt={restaurantInfo?.name}
              />
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Menu</h2>
            <ul className="space-y-4">
              {uniqueFoodItems.map((item, index) => (
                <li
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
                  key={item.id}
                >
                  <div className="md:col-span-3">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.description}</p>
                    <span className="text-lg font-bold">
                      ₹
                      {typeof item.price !== "undefined"
                        ? item.price / 100
                        : item.defaultPrice / 100}
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => removeFoodItem(item.id)}
                      className="text-gray-800 bg-red-200 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-lg px-3 py-1 transition duration-150 ease-in-out"
                    >
                      &ndash;
                    </button>
                    <span className="text-lg font-semibold">
                      {cartItems.filter((f) => f.id === item.id).length}
                    </span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => addFoodItem(item)}
                      className="text-gray-800 bg-green-200 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-lg px-3 py-1 transition duration-150 ease-in-out"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {cartItems.length > 0 && (
            <div className="fixed bottom-4 right-4 mb-12 mr-10">
              <Link to="/cart">
                <button className="px-5 py-2 text-sm font-bold tracking-wide text-white bg-orange-500 rounded-full shadow-lg hover:bg-orange-600">
                  <i className="fa fa-shopping-cart"></i> Cart -{" "}
                  {cartItems.length}
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};
export default RestaurantMenu;
