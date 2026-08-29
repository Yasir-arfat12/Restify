import React, { useState } from "react";

const SearchNavbar = () => {
  const [bookingDetails, setBookingDetails] = useState({
    state: "Karnataka",
    city: "Bangalore",
    date: "14 May 2026",
    time: "10:30 PM",
  });

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm">
      
      {/* MAIN NAVBAR */}
      <div
        className="
          max-w-7xl
          mx-auto
          flex
          flex-col
          lg:flex-row
          lg:items-center
          overflow-hidden
        "
      >
        
        {/* LOGO */}
        <div
          className="
            px-6
            py-5
            border-b
            lg:border-b-0
            lg:border-r
            border-gray-200
            flex
            items-center
            justify-center
            lg:justify-start
          "
        >
          <h1 className="text-5xl font-black text-red-500">
            PODS
          </h1>
        </div>

        {/* SEARCH DETAILS */}
        <div
          className="
            flex-1
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          
          {/* LOCATION */}
          <div
            className="
              px-5
              py-4
              border-b
              sm:border-r
              border-gray-200
            "
          >
            <p className="text-sm text-gray-500">
              Location
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-1">
              {bookingDetails.city},{" "}
              {bookingDetails.state}
            </h2>
          </div>

          {/* DATE */}
          <div
            className="
              px-5
              py-4
              border-b
              lg:border-r
              border-gray-200
            "
          >
            <p className="text-sm text-gray-500">
              Booking Date
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-1">
              {bookingDetails.date}
            </h2>
          </div>

          {/* TIME */}
          <div
            className="
              px-5
              py-4
              border-b
              sm:border-r
              border-gray-200
            "
          >
            <p className="text-sm text-gray-500">
              Booking Time
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-1">
              {bookingDetails.time}
            </h2>
          </div>

          {/* SEARCH BUTTON */}
          <div
            className="
              flex
              items-center
              justify-center
              p-4
            "
          >
            <button
              className="
                w-full
                bg-green-500
                hover:bg-green-600
                transition-all
                duration-300
                text-white
                font-bold
                text-xl
                py-4
                rounded-xl
              "
            >
              Search Pods
            </button>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div
          className="
            hidden
            xl:flex
            items-center
            gap-8
            px-6
            py-4
            border-l
            border-gray-200
          "
        >
          
          {/* CONTACT */}
          <div>
            <p className="text-2xl font-bold text-gray-900">
              0124-6201611
            </p>

            <p className="text-gray-500 text-sm">
              Call us to Book now
            </p>
          </div>

          {/* LOGIN */}
          <button
            className="
              border
              border-gray-300
              px-5
              py-3
              rounded-xl
              font-semibold
              hover:bg-gray-100
              transition
            "
          >
            Login / Signup
          </button>
        </div>
      </div>

      {/* MOBILE BAR */}
      <div
        className="
          lg:hidden
          bg-gray-100
          px-4
          py-3
          flex
          justify-between
          items-center
          text-sm
          font-medium
          text-gray-700
        "
      >
        
        {/* DATE */}
        <span>
          📅 {bookingDetails.date}
        </span>

        {/* TIME */}
        <span>
          ⏰ {bookingDetails.time}
        </span>
      </div>
    </div>
  );
};

export default SearchNavbar;