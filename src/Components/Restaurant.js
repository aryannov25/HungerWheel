import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { filterData } from "./Constants";
import Shimmer from "./Shimmer";
import Nav from "./Navbar";

function Restaurant() {
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [userLocation, setUserLocation] = useState({}); // added state for user location
  const [noServices, setNoServices] = useState(false); // added state for no services found

  useEffect(() => {
    getUserLocation();
    getRestaurants();
  }, []);

  async function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.log("Geolocation not supported by this browser.");
    }
  }

  //Res Details by diff url
  // const fetchapi = async () => {
  //   const data = await fetch(
  //     "https://www.swiggy.com/mapi/homepage/getCards?lat=18.4694714&lng=73.8290409"
  //   );
  //   const json = await data.json();
  //   console.log(json.data.success.cards[5].gridWidget.gridElements.infoWithStyle.restaurants);
  // };

  // useEffect(() => {
  //   fetchapi();
  // }, []);

  console.log("---------", userLocation);
  async function getRestaurants() {
    let apiUrl = "https://www.swiggy.com/dapi/restaurants/list/v5";
    if (userLocation.lat && userLocation.lng) {
      apiUrl += `?lat=${userLocation.lat}&lng=${userLocation.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
    } else {
      apiUrl += `?lat=28.5124389&lng=77.1370115&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
    }
    const data = await fetch(
      // "https://thingproxy.freeboard.io/fetch/" +
        "https://cors.bridged.cc/" +
        apiUrl

      //https://corsproxy.org/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5124389&lng=77.1370115&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING
    );

    const json = await data.json();

    if (json.data.cards.length === 0) {
      setNoServices(true);
    } else {
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      const resData = await checkJsonData(json);
      setAllRestaurants(resData);
      setFilteredRestaurants(resData);
    }
  }
  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const data = filterData(searchText, restaurants);
      setFilteredRestaurants(data);
      setErrorMessage("");
      if (data.length === 0) {
        setErrorMessage(
          `Sorry, we couldn't find any results for "${searchText}"`
        );
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };

  function scrollWin() {
    window.scrollTo(0, 0);
  }
  if (!allRestaurants) return null;

  return (
    <>
      <Nav />
      <div className="search-container p-3 text-center w-full bg-orange-50 ">
        <input
          data-testid="search-input"
          type="text"
          className="focus:bg-blue-100 p-2 w-1/5 m-2 rounded-md outline-none"
          placeholder="Search Restaurants"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            searchData(e.target.value, allRestaurants);
          }}
        />
        <button
          data-testid="search-btn"
          className="p-2 m-2 bg-orange-200 hover:bg-orange-400 hover:text-black text-white rounded-md"
          onClick={() => {
            // user click on button searchData function is called
            searchData(searchText, allRestaurants);
          }}
        >
          Search
        </button>
      </div>
      {errorMessage && <div className="error-container">{errorMessage}</div>}
      {noServices ? (
        <div className="no-services">
          We don't have any services here till now.
        </div>
      ) : allRestaurants?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="restaurant-list">
          {filteredRestaurants.map((restaurant) => {
            return (
              <Link
                onClick={scrollWin}
                to={"/restaurant/" + restaurant.info.id}
                key={restaurant.info.id}
              >
                <RestaurantCard {...restaurant.info} />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Restaurant;
