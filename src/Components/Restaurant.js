import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { PLACES_NEARBY_URL, NEARBY_FIELD_MASK, DEFAULT_LOCATION } from "./Constants";
import Shimmer from "./Shimmer";
import Nav from "./Navbar";

const RADII = [2000, 4000, 7000, 12000];
const TYPES_PER_PAGE = [
  ["restaurant"],
  ["meal_takeaway", "meal_delivery"],
  ["cafe", "bakery", "bar"],
  ["food"],
];

const CATEGORIES = [
  { id: "all",     label: "All",      icon: "🍽️" },
  { id: "indian",  label: "Indian",   icon: "🍛" },
  { id: "pizza",   label: "Pizza",    icon: "🍕" },
  { id: "chinese", label: "Chinese",  icon: "🍜" },
  { id: "cafe",    label: "Cafe",     icon: "☕" },
  { id: "burger",  label: "Burgers",  icon: "🍔" },
  { id: "dessert", label: "Desserts", icon: "🍰" },
];

function matchesCategory(place, category) {
  if (category === "all") return true;
  const types = place.types || [];
  const name = (place.displayName?.text || "").toLowerCase();
  switch (category) {
    case "indian":  return types.some((t) => t.includes("indian")) || name.includes("indian");
    case "pizza":   return types.some((t) => t.includes("pizza")) || name.includes("pizza") || name.includes("domino");
    case "chinese": return types.some((t) => t.includes("chinese") || t.includes("asian"));
    case "cafe":    return types.some((t) => t.includes("cafe") || t.includes("bakery") || t.includes("coffee"));
    case "burger":  return types.some((t) => t.includes("burger") || t.includes("fast_food"));
    case "dessert": return types.some((t) => t.includes("dessert") || t.includes("ice_cream"));
    default: return true;
  }
}

function Restaurant() {
  const [searchText, setSearchText]           = useState("");
  const [allRestaurants, setAllRestaurants]   = useState([]);
  const [filteredRestaurants, setFiltered]    = useState([]);
  const [errorMessage, setErrorMessage]       = useState("");
  const [loadingMore, setLoadingMore]         = useState(false);
  const [hasMore, setHasMore]                 = useState(true);
  const [activeCategory, setActiveCategory]   = useState("all");

  const pageRef           = useRef(0);
  const locationRef       = useRef(DEFAULT_LOCATION);
  const seenIds           = useRef(new Set());
  const allRestaurantsRef = useRef([]);
  const loadingRef        = useRef(false);
  const sentinelRef       = useRef(null);
  const searchTextRef     = useRef("");
  const activeCategoryRef = useRef("all");

  function applyFilters(text, category, restaurants) {
    let result = restaurants;
    if (category !== "all") result = result.filter((p) => matchesCategory(p, category));
    if (text.trim()) {
      const q = text.toLowerCase();
      result = result.filter((r) => r.displayName?.text?.toLowerCase().includes(q));
    }
    setFiltered(result);
    setErrorMessage(result.length === 0 && (text.trim() || category !== "all")
      ? "No restaurants found. Try a different search or category."
      : "");
  }

  useEffect(() => {
    async function init() {
      const loc = await getUserLocation();
      locationRef.current = loc;
      fetchNextPage();
    }
    init();
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) fetchNextPage(); },
      { threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  async function getUserLocation() {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          () => resolve(DEFAULT_LOCATION)
        );
      } else {
        resolve(DEFAULT_LOCATION);
      }
    });
  }

  async function fetchNextPage() {
    const pageIndex = pageRef.current;
    if (pageIndex >= RADII.length || loadingRef.current) return;
    loadingRef.current = true;
    setLoadingMore(true);

    const res = await fetch(PLACES_NEARBY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Goog-FieldMask": NEARBY_FIELD_MASK },
      body: JSON.stringify({
        includedTypes: TYPES_PER_PAGE[pageIndex],
        maxResultCount: 20,
        locationRestriction: {
          circle: {
            center: { latitude: locationRef.current.lat, longitude: locationRef.current.lng },
            radius: RADII[pageIndex],
          },
        },
      }),
    });

    const json = await res.json();
    const newPlaces = (json.places || []).filter((p) => {
      if (seenIds.current.has(p.id)) return false;
      seenIds.current.add(p.id);
      return true;
    });

    const combined = [...allRestaurantsRef.current, ...newPlaces];
    allRestaurantsRef.current = combined;
    pageRef.current = pageIndex + 1;
    setAllRestaurants(combined);
    applyFilters(searchTextRef.current, activeCategoryRef.current, combined);
    setHasMore(pageRef.current < RADII.length);
    setLoadingMore(false);
    loadingRef.current = false;
  }

  const handleSearch = (text) => {
    setSearchText(text);
    searchTextRef.current = text;
    applyFilters(text, activeCategoryRef.current, allRestaurantsRef.current);
  };

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    activeCategoryRef.current = cat;
    applyFilters(searchTextRef.current, cat, allRestaurantsRef.current);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-rose-500 text-white py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-orange-100 text-xs font-semibold uppercase tracking-widest mb-3">
            Fresh food near you
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
            What are you<br />craving today?
          </h1>
          <p className="text-orange-100 mb-8 text-base">
            Discover the best restaurants around you
          </p>
          {/* Search bar */}
          <div className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden max-w-xl mx-auto">
            <i className="fa-solid fa-magnifying-glass text-gray-400 pl-4 text-sm" />
            <input
              data-testid="search-input"
              type="text"
              className="flex-1 px-3 py-3.5 text-gray-800 bg-transparent outline-none placeholder-gray-400 text-sm"
              placeholder="Search restaurants or cuisines…"
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button
              data-testid="search-btn"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 font-semibold text-sm transition-colors shrink-0"
              onClick={() => applyFilters(searchText, activeCategoryRef.current, allRestaurantsRef.current)}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Category chips */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-orange-500 text-white shadow-sm scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {allRestaurants.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* Result count + error */}
          {errorMessage ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-5xl mb-4">🍽️</span>
              <p className="text-gray-500 font-medium">{errorMessage}</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400 font-medium mb-6">
                {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? "s" : ""} found
              </p>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRestaurants.map((place, i) => (
                  <Link
                    onClick={() => window.scrollTo(0, 0)}
                    to={"/restaurant/" + place.id}
                    key={place.id}
                    style={{ animationDelay: `${(i % 12) * 40}ms` }}
                    className="fade-up"
                  >
                    <RestaurantCard place={place} />
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Sentinel / loader */}
          <div ref={sentinelRef} className="flex justify-center py-12">
            {loadingMore ? (
              <div className="flex items-center gap-3 text-orange-500">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span className="text-sm font-medium">Loading more restaurants…</span>
              </div>
            ) : !hasMore ? (
              <p className="text-gray-300 text-sm font-medium">You've seen all restaurants nearby</p>
            ) : null}
          </div>

        </div>
      )}
    </div>
  );
}

export default Restaurant;
