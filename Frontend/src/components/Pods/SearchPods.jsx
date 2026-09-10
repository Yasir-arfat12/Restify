import React, { useEffect, useMemo, useState } from "react";
import BookingModal from "../pages/BookingModal";
import API from "../../api/axios";

const SearchPods = () => {
  const [pods, setPods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("");

  const [selectedPod, setSelectedPod] = useState(null);
  const [bookingMessage, setBookingMessage] = useState("");

  const fetchPods = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/pods");

      setPods(response.data?.pods || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load pods. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPods();
  }, []);

  const cities = useMemo(() => {
    const uniqueCities = pods
      .map((pod) => pod.city)
      .filter(Boolean)
      .filter((city, index, array) => array.indexOf(city) === index);

    return uniqueCities.sort();
  }, [pods]);

  const filteredPods = useMemo(() => {
    return pods.filter((pod) => {
      const searchableText = `
        ${pod.podName || ""}
        ${pod.city || ""}
        ${pod.location || ""}
        ${pod.description || ""}
      `.toLowerCase();

      const matchesSearch = searchableText.includes(
        searchTerm.toLowerCase()
      );

      const matchesCity =
        !cityFilter ||
        pod.city?.toLowerCase() === cityFilter.toLowerCase();

      const matchesPrice =
        !maxPrice ||
        Number(pod.hourlyPrice || 0) <= Number(maxPrice);

      const matchesCapacity =
        !capacityFilter ||
        Number(pod.capacity || 0) >= Number(capacityFilter);

      return (
        matchesSearch &&
        matchesCity &&
        matchesPrice &&
        matchesCapacity
      );
    });
  }, [pods, searchTerm, cityFilter, maxPrice, capacityFilter]);

  const resetFilters = () => {
    setSearchTerm("");
    setCityFilter("");
    setMaxPrice("");
    setCapacityFilter("");
  };

  const getPodImage = (pod) => {
    if (Array.isArray(pod.images) && pod.images.length > 0) {
      return pod.images[0];
    }

    if (typeof pod.images === "string" && pod.images.trim()) {
      return pod.images;
    }

    return "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80";
  };

  const handleBookingSuccess = () => {
    setBookingMessage(
      "Booking created successfully. You can view it from your profile."
    );

    setTimeout(() => {
      setBookingMessage("");
    }, 5000);
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#030912] via-[#0b1e3c] to-[#09101b] px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Find your perfect stay
          </p>

          <h1 className="font-bungee text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Search and Book a Pod
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Discover comfortable, affordable, and convenient pods according
            to your requirements.
          </p>
        </div>

        {/* Search and filter section */}
        <div className="mb-12 rounded-3xl border border-slate-700 bg-[#010409]/80 p-5 shadow-2xl backdrop-blur-sm sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
              🔎
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Find a pod that suits you
              </h2>

              <p className="text-sm text-slate-400">
                Use the filters below to narrow your search.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* Search input */}
            <div className="lg:col-span-2">
              <label
                htmlFor="search"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                Search pods
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-300">
                  🔍
                </span>

                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by pod name, city, or location"
                  className="w-full rounded-xl border border-slate-600 bg-[#0b1e3c] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                />
              </div>
            </div>

            {/* City filter */}
            <div>
              <label
                htmlFor="city"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                City
              </label>

              <select
                id="city"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-600 bg-[#0b1e3c] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
              >
                <option value="" className="bg-[#0b1e3c]">
                  All cities
                </option>

                {cities.map((city) => (
                  <option
                    key={city}
                    value={city}
                    className="bg-[#0b1e3c]"
                  >
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Price filter */}
            <div>
              <label
                htmlFor="maxPrice"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                Maximum hourly price
              </label>

              <input
                id="maxPrice"
                type="number"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Example: 500"
                className="w-full rounded-xl border border-slate-600 bg-[#0b1e3c] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
              />
            </div>

            {/* Capacity filter */}
            <div>
              <label
                htmlFor="capacity"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                Minimum capacity
              </label>

              <input
                id="capacity"
                type="number"
                min="1"
                value={capacityFilter}
                onChange={(e) => setCapacityFilter(e.target.value)}
                placeholder="Example: 2"
                className="w-full rounded-xl border border-slate-600 bg-[#0b1e3c] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-slate-700 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-300">
              Showing{" "}
              <span className="font-semibold text-white">
                {filteredPods.length}
              </span>{" "}
              {filteredPods.length === 1 ? "pod" : "pods"}
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="rounded-xl border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-blue-400 hover:bg-blue-400/10 hover:text-blue-300"
            >
              Reset filters
            </button>
          </div>
        </div>

        {/* Booking success message */}
        {bookingMessage && (
          <div className="mb-7 rounded-xl border border-green-400/30 bg-green-400/10 px-5 py-4 text-sm font-medium text-green-300">
            {bookingMessage}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-700 bg-[#010409]/90"
              >
                <div className="h-60 bg-slate-800" />

                <div className="space-y-4 p-5">
                  <div className="h-5 w-3/4 rounded bg-slate-800" />
                  <div className="h-4 w-1/2 rounded bg-slate-800" />
                  <div className="h-4 w-full rounded bg-slate-800" />
                  <div className="h-11 w-full rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-8 text-center">
            <p className="mb-5 text-red-300">{error}</p>

            <button
              type="button"
              onClick={fetchPods}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredPods.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-600 bg-[#010409]/80 px-6 py-16 text-center">
            <div className="mb-5 text-5xl">🏕️</div>

            <h2 className="text-xl font-bold text-white">
              No pods found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
              Try changing your search term or removing one of the filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Pod cards */}
        {!loading && !error && filteredPods.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPods.map((pod) => (
              <article
                key={pod._id}
                className="group overflow-hidden rounded-2xl border border-slate-700 bg-[#010409]/90 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-blue-950/40"
              >
                {/* Pod image */}
                <div className="relative h-60 overflow-hidden bg-slate-800">
                  <img
                    src={getPodImage(pod)}
                    alt={pod.podName || "Restify pod"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.src =
                        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80";
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <span
                    className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold ${
                      pod.status === "Available"
                        ? "bg-green-400/90 text-green-950"
                        : pod.status === "Booked"
                        ? "bg-yellow-300/90 text-yellow-950"
                        : "bg-red-400/90 text-red-950"
                    }`}
                  >
                    {pod.status || "Available"}
                  </span>

                  <div className="absolute bottom-4 left-5 right-5">
                    <p className="flex items-center gap-2 text-sm font-medium text-white/90">
                      <span>📍</span>
                      {pod.city || "Location unavailable"}
                    </p>
                  </div>
                </div>

                {/* Pod details */}
                <div className="p-5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h2 className="line-clamp-2 text-xl font-bold text-white">
                      {pod.podName || "Unnamed pod"}
                    </h2>

                    <div className="shrink-0 text-right">
                      <p className="text-lg font-bold text-blue-300">
                        ₹{pod.hourlyPrice || 0}
                      </p>

                      <p className="text-xs text-slate-400">
                        per hour
                      </p>
                    </div>
                  </div>

                  <p className="mb-3 flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-blue-300">📍</span>

                    <span className="line-clamp-1">
                      {pod.location ||
                        pod.city ||
                        "Location unavailable"}
                    </span>
                  </p>

                  <p className="mb-5 line-clamp-2 min-h-[40px] text-sm leading-5 text-slate-400">
                    {pod.description ||
                      "A comfortable and convenient pod for your short stay."}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-medium text-blue-200">
                      👥 Capacity: {pod.capacity || 0}
                    </span>

                    {Array.isArray(pod.amenities) &&
                      pod.amenities.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity}
                          className="rounded-full border border-slate-600 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-300"
                        >
                          {amenity}
                        </span>
                      ))}
                  </div>

                  <button
                    type="button"
                    disabled={
                      pod.status && pod.status !== "Available"
                    }
                    onClick={() => setSelectedPod(pod)}
                    className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                  >
                    {pod.status && pod.status !== "Available"
                      ? "Currently unavailable"
                      : "Book this pod"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Booking modal */}
      {selectedPod && (
        <BookingModal
          pod={selectedPod}
          onClose={() => setSelectedPod(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </section>
  );
};

export default SearchPods;