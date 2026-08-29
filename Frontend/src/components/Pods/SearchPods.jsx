import React, { useState,useEffect } from 'react'
import { useSearch } from '../../context/SearchContext';
import { LuMapPin } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { MdSchedule } from "react-icons/md";
const podsData = [
  {
    id: 1,
    name: "Luxury Sleep Pod Bengaluru",
    location: "Whitefield, Bangalore",
    rating: 4.5,
    reviews: 128,
    price: 499,
    oldPrice: 1499,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    amenities: ["149-per/hr", "349-3/hr", "499-6/hr", "999-per/hr"],
  },
  {
    id: 2,
    name: "Premium Nap Pod Hyderabad",
    location: "Hitech City, Hyderabad",
    rating: 4.2,
    reviews: 96,
    price: 599,
    oldPrice: 1299,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    amenities: ["Blanket", "WiFi", "Air Purifier", "Power Backup"],
  },
  {
    id: 3,
    name: "Airport Sleep Pod Chennai",
    location: "Kilacheri, Chennai",
    rating: 4.7,
    reviews: 221,
    price: 799,
    oldPrice: 1899,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    amenities: ["Reception", "Free WiFi", "Geyser", "24/7 Access"],
  },
  {
    id: 4,
    name: "Premium Nap Pod Hyderabad",
    location: "Hitech City, Hyderabad",
    rating: 4.2,
    reviews: 96,
    price: 599,
    oldPrice: 1299,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    amenities: ["Blanket", "WiFi", "Air Purifier", "Power Backup"],
  },
];
const podDetails = {
  address: `
    22/A, Airport Tech Park Road,
    Near Kempegowda Metro Station,
    Whitefield, Bangalore,
    Karnataka 560048
  `,

  amenities: [
    "Safe Lockers",
    "Separate Men Washroom",
    "Separate Ladies Washroom",
    "Free WiFi",
    "Charging Ports",
    "Air Conditioning",
    "Smart Lighting",
    "24/7 Security",
  ],

  pricing: [
    {
      duration: "1 Hour",
      price: "₹149",
    },
    {
      duration: "3 Hours",
      price: "₹299",
    },
    {
      duration: "6 Hours",
      price: "₹499",
    },
    {
      duration: "12 Hours",
      price: "₹799",
    },
  ],
};

const SearchPods = () => {
  const { searchCriteria } = useSearch();
  // 2. Extract your values using the keys defined in Hero.jsx
 useEffect(() => {
    console.log("🚀 Current Search Inputs inside SearchPods:", searchCriteria);
    
    // You can also log individual values cleanly like this:
    console.log("State:", searchCriteria.state);
    console.log("City:", searchCriteria.city);
    console.log("Date:", searchCriteria.date);
    console.log("Time:", searchCriteria.time);

  }, [searchCriteria]);
  const [selectedPod, setSelectedPod] = useState(null)
  const [selectedPricing, setSelectedPricing] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [openFilter, setopenFilter] = useState(false);

  const toggleFilter = () => {
      setopenFilter(!openFilter)
  }
  const serviceTax = 10;
  return (
    <>
      <div className='bg-gradient-to-r from-[#030912] via-[#0b1e3c] to-[#09101b] 
      mt-0 '>
        <div className='flex justify-center items-center'>
          <div className='bg-black/80 h-15 w-3/4  p-4 z-50 fixed bottom-1 rounded-md flex justify-between items-center'>
          <div type='text' placeholder='enter state '  className='text-sm font-bold font-bungee text-white 
        '>
           <p className='flex p-2 rounded-md bg-white/10'> <LuMapPin className="text-emerald-500 text-xl shrink-0" />
              {searchCriteria.state} || {searchCriteria.city} </p>
             
          </div>
          
           <div type='text' placeholder='enter state '  className=' text-sm font-bold font-bungee text-white 
        '>   
               <p className='flex text-sm font-bold font-bungee text-white p-2 bg-white/10 rounded-md'>
                 <MdSchedule className='text-blue-500 h-6 w-6 mr-1'/> {searchCriteria.date} || {searchCriteria.time}
               </p>   
          </div>
         <div type='text' placeholder='enter state '  className=' text-sm font-bold font-bungee text-white 
        '>   
               <p className='flex text-sm font-bold font-bungee text-white bg-white/10 p-2 rounded-md'>
                 1.Pod | 1.Guest
               </p>   
          </div>
            <div type='text' placeholder='enter state '  className=' text-sm font-bold font-bungee text-white 
        '>   
               <button className='h-8 w-20 rounded-md bg-green-400 p-1'>
                Search</button>   
          </div>
  </div>
  </div>
        <div className='w-full md:flex flex-row px-1 py-3'>  
          <div className='hidden md:block w-1/4 bg-black text-white '>
            <h1 className='text-2xl font-bold font-bungee p-4'>
              Filter
            </h1>
            <h3 className=''></h3>
            <div className='flex justify-center items-center flex-grow'>
            <input type="text" placeholder='search' className='text-xl h-10 rounded-md  w-2/3 text-center bg-white text-black'/>
               </div>
               <h3 className='text-md font-bungee font-bold p-4'>Price Range</h3>
                <label>
               <input type="radio" name='price'
               value="0-100"  className='w-2/3 h-5 text-xl bg-white'/>
               0-100</label>
               
               <div className='p-4 '>
                <h3 className='text-md font-bungee font-bold '>Accomodation Type</h3>
                <label className='flex '>
                <input type="checkbox"  /> Pods</label>
                 <label className='flex text-md font-serif '>
                <input type="checkbox"  value="hotels"/>Hotels</label>
               </div>
               <div className=' p-4'> 
                <h1 className=' text-md font-bungee font-bold text-white'>Categories </h1>
                 <label className='flex text-md font-serif '>
                <input type="checkbox"  value="hotels"/>For Family</label>
                 <label className='flex text-md font-serif '>
                <input type="checkbox"  value="hotels"/>Single Person</label>
                 <label className='flex text-md font-serif '>
                <input type="checkbox"  value="hotels"/>Double Person</label>
               </div>
                 <div className='p-4 '>
                  <label>
                <input type="checkbox" className='text-md font-bold font-bungee' /> Ratings</label>

                </div>
          </div>
          <div className='flex flex-row justify-between items-center px-2 py-2 md:hidden'>
            <button onClick={toggleFilter} className='h-8 w-15 rounded-md bg-black text-[12px] font-bold font-bungee text-white'>
              Filter
            </button>
             <button className='h-8 w-15 rounded-md bg-black text-[12px] font-bold font-bungee text-white'>
              SortBy
            </button>
             <button className='h-8 w-15 rounded-md bg-black text-[12px] font-bold font-bungee text-white'>
              Bookings
            </button>
             <button className='h-8 w-15 rounded-md bg-black text-[12px] font-bold font-bungee text-white'>
             Login
            </button>
          </div>
           

              <div className="min-h-screen bg-gradient-to-r from-[#030912] via-[#0b1e3c] to-[#09101b] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {podsData.map((pod) => (
          <div
            key={pod.id}
            className="
             bg-gray-300
              rounded-2xl
              shadow-md
              overflow-hidden
              border
              border-gray-200
              flex
              flex-col
              lg:flex-row
            "
          >
            
            {/* LEFT IMAGE SECTION */}
            <div className="lg:w-[40%] w-full flex flex-col sm:flex-row">
              
              {/* Main Image */}
              <div className="relative flex-1">
                <img
                  src={pod.image}
                  alt={pod.name}
                  className="
                    w-full
                    h-64
                    sm:h-80
                    lg:h-full
                    object-cover
                  "
                />

                {/* Tag */}
                <span
                  className="
                    absolute
                    top-3
                    left-3
                    bg-white
                    text-gray-800
                    text-sm
                    font-semibold
                    px-3
                    py-1
                    rounded-lg
                    shadow
                  "
                >
                  Sleep Pod
                </span>
              </div>

              {/* Thumbnail Images */}
              <div
                className="
                  hidden
                  sm:flex
                  lg:flex-col
                  gap-2
                  p-2
                  bg-gray-50
                "
              >
                {[1, 2, 3, 4].map((item) => (
                  <img
                    key={item}
                    src={pod.image}
                    alt="thumbnail"
                    className="
                      w-20
                      h-20
                      object-cover
                      rounded-lg
                      border
                    "
                  />
                ))}
              </div>
            </div>

            {/* RIGHT CONTENT SECTION */}
            <div
              className="
                flex-1
                p-5
                flex
                flex-col
                justify-between
              "
            >
              
              {/* Top Content */}
              <div>
                
                {/* Title */}
                <h1
                  className="
                    text-2xl
                    md:text-3xl
                    font-bold
                    text-gray-900
                    leading-snug
                  "
                >
                  {pod.name}
                </h1>

                {/* Location */}
                <p className="text-gray-500 mt-2 text-lg">
                  {pod.location}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-3 mt-5 flex-wrap">
                  
                  <div
                    className="
                      bg-green-600
                      text-white
                      px-3
                      py-1
                      rounded-lg
                      text-sm
                      font-semibold
                    "
                  >
                    {pod.rating} ★
                  </div>

                  <p className="text-gray-600">
                    ({pod.reviews} Ratings) · Excellent
                  </p>
                </div>

                {/* Amenities */}
                <div
                  className="
                    flex
                    flex-wrap
                    gap-3
                    mt-5
                  "
                >
                  {pod.amenities.map((item, index) => (
                    <div
                      key={index}
                      className="
                        bg-gray-100
                        px-4
                        py-2
                        rounded-full
                        text-[12px]
                        text-gray-700
                        font-medium
                      "
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Section */}
              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-5
                  mt-8
                "
              >
                
                {/* Pricing */}
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    
                    <h2 className="text-4xl font-bold text-gray-900">
                      ₹{pod.price}
                    </h2>

                    <p className="text-gray-400 line-through text-2xl">
                      ₹{pod.oldPrice}
                    </p>

                    <span className="text-orange-500 font-bold text-lg">
                      70% OFF
                    </span>
                  </div>

                  <p className="text-gray-500 mt-2">
                    + taxes & fees · per pod per night
                  </p>
                </div>

                {/* Buttons */}
                <div
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    gap-4
                    w-full
                    md:w-auto
                  "
                >
                 <button
            onClick={() => setSelectedPod(pod)}
      className="
        border-2
    border-gray-300
    hover:border-black
    px-6
    py-3
    rounded-xl
    font-semibold
    transition
    w-full
  "
>
  View Details
</button>

                  <button
  onClick={() => {
    setSelectedPod(pod);
    setShowPaymentModal(true);
  }}
  className="
    bg-green-500
    hover:bg-green-600
    text-white
    px-6
    py-3
    rounded-xl
    font-semibold
    transition
    w-full
  "
>
  Book Now
</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
 {/* 222  */}
 {showPaymentModal && selectedPod && (
  <div
    className="
      fixed
      inset-0
      bg-black/70
      backdrop-blur-sm
      flex
      justify-center
      items-center
      z-50
      p-4
    "
  >
    
    {/* MODAL BOX */}
    <div
      className="
        bg-white
        w-full
        max-w-2xl
        rounded-3xl
        overflow-y-auto
        max-h-[90vh]
        shadow-2xl
      "
    >
      
      {/* HEADER IMAGE */}
      <div className="relative">
        <img
          src={selectedPod.image}
          alt={selectedPod.name}
          className="w-full h-64 object-cover"
        />

        {/* CLOSE */}
        <button
          onClick={() => setShowPaymentModal(false)}
          className="
            absolute
            top-4
            right-4
            bg-black/70
            text-white
            w-10
            h-10
            rounded-full
            text-xl
          "
        >
          ✕
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-6 md:p-8">
        
        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-900">
          {selectedPod.name}
        </h1>

        <p className="text-gray-500 mt-2">
          {selectedPod.location}
        </p>

        {/* PRICING */}
        <div className="mt-8">
          
          <h2 className="text-2xl font-semibold mb-4">
            Select Duration
          </h2>

          <div className="space-y-3">
            
            {podDetails.pricing.map((item, index) => (
              <label
                key={index}
                className={`
                  flex
                  justify-between
                  items-center
                  p-4
                  rounded-xl
                  border-2
                  cursor-pointer
                  transition-all
                  ${
                    selectedPricing?.duration === item.duration
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-gray-100"
                  }
                `}
              >
                
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  
                  <input
                    type="checkbox"
                    checked={
                      selectedPricing?.duration === item.duration
                    }
                    onChange={() => setSelectedPricing(item)}
                    className="w-5 h-5 accent-green-500"
                  />

                  <span className="font-medium">
                    {item.duration}
                  </span>
                </div>

                {/* RIGHT */}
                <span className="font-bold text-green-600 text-lg">
                  {item.price}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* BILL */}
        {selectedPricing && (
          <div className="mt-8">
            
            <h2 className="text-2xl font-semibold mb-4">
              Payment Summary
            </h2>

            <div className="bg-gray-100 rounded-2xl p-5 space-y-4">
              
              {/* POD */}
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Pod Charges
                </span>

                <span className="font-semibold">
                  {selectedPricing.price}
                </span>
              </div>

              {/* TAX */}
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Service Tax
                </span>

                <span className="font-semibold">
                  ₹10
                </span>
              </div>

              {/* LINE */}
              <div className="border-t border-gray-300"></div>

              {/* TOTAL */}
              <div className="flex justify-between text-2xl font-bold">
                
                <span>Total Payable</span>

                <span className="text-green-600">
                  ₹
                  {parseInt(
                    selectedPricing.price.replace("₹", "")
                  ) + 10}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* RAZORPAY BUTTON */}
        <button
          disabled={!selectedPricing}
          onClick={() => {
            const totalAmount =
              parseInt(
                selectedPricing.price.replace("₹", "")
              ) + 10;

            alert(`
Redirecting to Razorpay

Pod: ${selectedPod.name}

Duration: ${selectedPricing.duration}

Amount To Pay: ₹${totalAmount}
            `);

            // Razorpay Integration Here
          }}
          className="
            w-full
            mt-8
            bg-blue-600
            hover:bg-blue-700
            disabled:bg-gray-400
            text-white
            py-4
            rounded-xl
            text-lg
            font-bold
            transition-all
          "
        >
          Continue To Pay ₹
          {selectedPricing
            ? parseInt(
                selectedPricing.price.replace("₹", "")
              ) + 10
            : ""}
        </button>
      </div>
    </div>
  </div>
)}




    </div>
        </div>
        {selectedPod && (
  <div
    className="
      fixed
      inset-0
      bg-black/70
      backdrop-blur-sm
      flex
      justify-center
      items-center
      z-50
      p-4
    "
  >
    
    {/* MODAL BOX */}
    <div
      className="
        bg-white
        w-full
        max-w-2xl
        rounded-3xl
        overflow-y-auto
        max-h-[90vh]
        shadow-2xl
      "
    >
      
      {/* IMAGE */}
      <div className="relative">
        <img
          src={selectedPod.image}
          alt={selectedPod.name}
          className="w-full h-64 object-cover"
        />

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setSelectedPod(null)}
          className="
            absolute
            top-4
            right-4
            bg-black/70
            text-white
            w-10
            h-10
            rounded-full
            text-xl
          "
        >
          ✕
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-6 md:p-8">
        
        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-900">
          {selectedPod.name}
        </h1>

        {/* LOCATION */}
        <p className="text-gray-500 mt-2 text-lg">
          {selectedPod.location}
        </p>

        {/* ADDRESS */}
        <div className="mt-8">
          
          <h2 className="text-2xl font-semibold mb-3">
            Address
          </h2>

          <p className="text-gray-600 leading-7">
            {podDetails.address}
          </p>
        </div>

        {/* AMENITIES */}
        <div className="mt-8">
          
          <h2 className="text-2xl font-semibold mb-4">
            Amenities
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {podDetails.amenities.map((item, index) => (
              <div
                key={index}
                className="
                  bg-gray-100
                  p-3
                  rounded-xl
                  text-gray-700
                  font-medium
                "
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>

        {/* PRICING */}
       {/* PRICING */}

<div className="mt-8">
  
  <h2 className="text-2xl font-semibold mb-4">
    Pricing
  </h2>

  <div className="space-y-3">
    
    {podDetails.pricing.map((item, index) => (
      <label
        key={index}
        className={`
          flex
          justify-between
          items-center
          p-4
          rounded-xl
          cursor-pointer
          border-2
          transition-all
          ${
            selectedPricing?.duration === item.duration
              ? "border-green-500 bg-green-50"
              : "border-gray-200 bg-gray-100"
          }
        `}
      >
        
        {/* LEFT */}
        <div className="flex items-center gap-4">
          
          <input
            type="checkbox"
            checked={selectedPricing?.duration === item.duration}
            onChange={() => setSelectedPricing(item)}
            className="w-5 h-5 accent-green-500"
          />

          <span className="font-medium text-gray-700">
            {item.duration}
          </span>
        </div>

        {/* RIGHT */}
        <span className="font-bold text-green-600 text-lg">
          {item.price}
        </span>
      </label>
    ))}
  </div>
</div>
    
    {/* BILL SECTION */}

{selectedPricing && (
  <div className="mt-8">
    
    <h2 className="text-2xl font-semibold mb-4">
      Booking Bill
    </h2>

    <div className="bg-gray-100 rounded-2xl p-5 space-y-4">
      
      {/* POD PRICE */}
      <div className="flex justify-between">
        <span className="text-gray-600">
          Pod Charges
        </span>

        <span className="font-semibold">
          {selectedPricing.price}
        </span>
      </div>

      {/* TAX */}
      <div className="flex justify-between">
        <span className="text-gray-600">
          Service Tax
        </span>

        <span className="font-semibold">
          ₹{serviceTax}
        </span>
      </div>

      {/* LINE */}
      <div className="border-t border-gray-300"></div>

      {/* TOTAL */}
      <div className="flex justify-between text-xl font-bold">
        
        <span>Total Amount</span>

        <span className="text-green-600">
          ₹
          {parseInt(
            selectedPricing.price.replace("₹", "")
          ) + serviceTax}
        </span>
      </div>
    </div>
  </div>
)}
        {/* BUTTONS */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-4
            mt-10
          "
        >
          
          <button
            onClick={() => setSelectedPod(null)}
            className="
              flex-1
              border-2
              border-gray-300
              py-4
              rounded-xl
              font-semibold
            "
          >
            Close
          </button>
<button
  disabled={!selectedPricing}
  onClick={() => {
    alert(`
Booking Confirmed!

Pod: ${selectedPod.name}

Duration: ${selectedPricing.duration}

Pod Price: ${selectedPricing.price}

Service Tax: ₹${serviceTax}

Total Amount: ₹${
      parseInt(
        selectedPricing.price.replace("₹", "")
      ) + serviceTax
    }
    `);
  }}
  className="
    flex-1
    bg-green-500
    hover:bg-green-600
    disabled:bg-gray-400
    text-white
    py-4
    rounded-xl
    font-semibold
    transition
  "
>
  Book Pod
</button>
        </div>
      </div>
    </div>
    
  </div>

)}
  


      </div>
    </>
  )
}

export default SearchPods
