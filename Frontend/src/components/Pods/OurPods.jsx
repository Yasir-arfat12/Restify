// import React from 'react'
// import Hero from '../Layout/Hero'
// import HeroImg from '../Images/HeroImg.png'
// import { FaClock} from "react-icons/fa";
// import { Snowflake} from "lucide-react";
// import { IoWifiOutline } from "react-icons/io5";
// import { LuLock } from "react-icons/lu";
// import { FiNavigation } from "react-icons/fi";
// import API from "../../api/axios";
// import { useState, useEffect } from 'react';

// const OurPods = () => {
//     const [pods, setPods] = useState([]);

// useEffect(() => {

//     const fetchPods = async () => {

//         try {

//             const response = await API.get("/pods");

//             setPods(response.data);

//         } catch (error) {

//             console.error(error);

//         }
//     };

//     fetchPods();

// }, []);

//   return (
//     <>
//     <div className='bg-gradient-to-r from-[#030912] via-[#0b1e3c] to-[#09101b] mt-0'>
//      <div className='bg-[#010409]/80 p-6'>
       
//           <h3 className='text-3xl sm:text-4xl text-center text-white font-Bungee
//           font-bold p-6'>Recharge Anytime. Rest in Comfort.</h3>
//           <div className='flex justify-center items-center tracking-tighter  font-serif text-white 
//           '>
//             <h3 className='sm:text-md text-md px-2 py-4 text-center'> Step into a new way of relaxing with Restify — your personal space to unwind, refresh, and recharge whenever you need it.
//             <br/>
//              Designed for modern lifestyles, our smart sleeping pods offer privacy, comfort, and flexibility — all at your fingertips. Whether it’s a quick nap or a full day’s rest, Restify adapts to you.
//             </h3>
//           </div>
//         </div>
//             <h1 className='text-center text-4xl font-bold font-bungee font-serif text-white py-4 mt-4 
//         ' >Our Pods</h1>
//         <div className='flex flex-row md:flex-row-2 flex-wrap flex-grow justify-center gap-10 p-4'>
//             <div className='h-80 w-120 '>
    
//              <img src="https://static.vecteezy.com/system/resources/thumbnails/059/516/384/small/cozy-sleeping-area-inside-futuristic-pod-with-large-window-showcasing-serene-mountain-view-free-photo.jpeg"
//              className='p-4 bg-cover' alt="" />
//                  </div>
       
//         <div className='h-80 w-120'>
//              <img src="https://static.vecteezy.com/system/resources/thumbnails/059/516/384/small/cozy-sleeping-area-inside-futuristic-pod-with-large-window-showcasing-serene-mountain-view-free-photo.jpeg"
//              className='p-4 bg-cover' alt="" />
//                  </div>
        
//                     <div className='h-80 w-120 '>
//                        <img src="https://static.vecteezy.com/system/resources/thumbnails/059/516/384/small/cozy-sleeping-area-inside-futuristic-pod-with-large-window-showcasing-serene-mountain-view-free-photo.jpeg"
//              className='p-4 bg-cover' alt="" />
//                     </div>
       
//         <div className='h-80 w-120 '>
//            <img src="https://static.vecteezy.com/system/resources/thumbnails/059/516/384/small/cozy-sleeping-area-inside-futuristic-pod-with-large-window-showcasing-serene-mountain-view-free-photo.jpeg"
//              className='p-4 bg-cover ' alt="" />
//         </div>
//          </div>

//          <div className='flex justify-center items-center px-3 py-4 flex-grow'>
//           <div>
//               <h1 className='text-3xl md:text-4xl font-bungee font-bold text-white p-4 text-center'>
//                 What we Offer
//               </h1>
//               <div className='flex flex-wrap flex=grow p-4 gap-20 justify-center'>
//                 <div className='border-2 border-blue-400 h-46 w-80 '>
//                    <FaClock className="text-4xl border-4 border-blue-400 shadow-[0_0_40px_rgba(59,80,246,0.7)] rounded-full mt-4 ml-4  text-blue-400" />
//                    <h1 className='text-2xl font-bold text-white font-bungee p-2'>Hourly Stays</h1>
//                    <h3 className='text-md font-serif text-white p-2 tracking-tighter'> Book For Just A Few Hours When You need a break</h3>
//                 </div>
//                   <div className='border-2 border-blue-400 h-46 w-80 '>
//                   <div className="h-9 w-9 rounded-full border border-blue-400 mt-4 ml-4 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
//                     <Snowflake size={30} className="text-blue-400" />
//                   </div>
//                    <h1 className='text-2xl font-bold text-white font-bungee p-2'>AC Pods</h1>
//                    <h3 className='text-md font-serif text-white p-2 tracking-tighter'>Climate Controlled-comfort Year Round</h3>
//                 </div>
//                 <div className='border-2 border-blue-400 h-46 w-80 '>
//                    <div className="h-9 w-9 rounded-full border border-blue-400 mt-4 ml-4 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
//                      <IoWifiOutline className="text-3xl text-blue-400" />
//                   </div>
//                    <h1 className='text-2xl font-bold text-white font-bungee p-2'>Free Wifi</h1>
//                    <h3 className='text-md font-serif text-white p-2 tracking-tighter'> Stay Connected During Your Rest</h3>
//                 </div>
//               </div>
//                  <div className='flex flex-wrap flex=grow p-6 mt-5 gap-20 justify-center'>
//                 <div className='border-2 border-blue-400 h-40 w-80 md:w-130 '>
//                    <div className="h-10 w-10 rounded-full border border-blue-400 mt-4 ml-4 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
//                       <LuLock className="text-2xl text-blue-400" />
//                   </div>
//                    <h1 className='text-2xl font-bold text-white font-bungee p-2'>Secure Lockers</h1>
//                    <h3 className='text-md font-serif text-white p-2 tracking-tighter'> Safe Storage For Your Belongings</h3>
//                 </div>
//                    <div className='border-2 border-blue-400 h-40 w-80 md:w-130 '>
//                       <div className="h-10 w-10 rounded-full border border-blue-400 mt-4 ml-4 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
//                     <FiNavigation className="text-2xl text-blue-400" />
//                       </div>
              
                 
//                    <h1 className='text-2xl font-bold text-white font-bungee p-2'>24X7 ACCESS</h1>
//                    <h3 className='text-md font-serif text-white p-2 tracking-tighter'> Rest anytime, day or night</h3>
//                    </div>
//                                   </div> 
//               </div>
//                 <h3 className='text-xl md:text-2xl font-serif text-gray-700'></h3>
            
//          </div>

//          <div className='p-4 '>
//           <h1 className='text-sm md:text-md  font-serif text-white tracking-tighter text-center md:px-50 py-10 bg-black/50'>
//                 “Escape the chaos of metro life with Restify — modern hourly rest pods designed for travelers,
//                  students, and professionals who need comfort without paying expensive hotel prices.
//                   Relax, recharge, and continue your journey with premium comfort starting at just hourly rates.”
//           </h1>
//          </div>
//           <div className='p-4 '>
//           <h1 className='text-sm md:text-md  font-serif text-white tracking-tighter text-center md:px-50 py-10 bg-black/50'>
//                “In a city that never slows down, Restify creates a peaceful space where fatigue turns into relaxation.
//                 Whether you're stuck in traffic, waiting between travels, or simply needing a quick break,
//                  our smart rest pods offer comfort, privacy, and convenience anytime you need it.”
//           </h1>
//          </div>
//          </div>
//     </>
//   )
// }

// export default OurPods

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Star,
  Wifi,
  Snowflake,
  Lock,
  Clock,
  LoaderCircle
} from "lucide-react";

import API from "../../api/axios";

const OurPods = () => {
  const [pods, setPods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPods = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get("/pods");

        const receivedPods = Array.isArray(response.data)
          ? response.data
          : response.data?.pods || [];

        setPods(receivedPods);
      } catch (error) {
        console.error("Unable to fetch pods:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load pods. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPods();
  }, []);

  const getPodId = (pod) => {
    return pod._id || pod.id;
  };

  const getPodName = (pod) => {
    return pod.podName || pod.name || "Restify Pod";
  };

  const getPodLocation = (pod) => {
    return (
      pod.location ||
      [pod.city, pod.state].filter(Boolean).join(", ") ||
      "Location unavailable"
    );
  };

  const getPodPrice = (pod) => {
    return (
      pod.hourlyPrice ||
      pod.price ||
      pod.pricing?.hourly ||
      "Contact for price"
    );
  };

  const getPodImage = (pod) => {
    if (Array.isArray(pod.images) && pod.images.length > 0) {
      return pod.images[0];
    }

    return (
      pod.image ||
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop"
    );
  };

  return (
    <section className="min-h-screen bg-surface-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-400">
            Restify Pods
          </p>

          <h1 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
            Recharge Anytime. Rest in Comfort.
          </h1>

          <p className="mt-5 text-base leading-8 text-slate-400">
            Discover comfortable and private sleeping pods designed
            for travellers who need a peaceful place to relax,
            refresh, and recharge.
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="flex items-center gap-3 text-slate-300">
              <LoaderCircle className="animate-spin" size={24} />
              <span>Loading pods...</span>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-red-400/20 bg-red-400/10 p-6 text-center text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && pods.length === 0 && (
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-white/10 bg-surface-800 p-8 text-center">
            <h2 className="text-xl font-semibold text-white">
              No pods available
            </h2>

            <p className="mt-2 text-slate-400">
              New pods will appear here once they are added.
            </p>
          </div>
        )}

        {!loading && !error && pods.length > 0 && (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pods.map((pod) => {
              const podId = getPodId(pod);

              return (
                <article
                  key={podId}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-surface-800 shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={getPodImage(pod)}
                      alt={getPodName(pod)}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-sm text-white backdrop-blur">
                      <MapPin size={15} />
                      {getPodLocation(pod)}
                    </div>
                  </div>

                  <div className="space-y-5 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-xl font-semibold text-white">
                        {getPodName(pod)}
                      </h2>

                      {pod.rating && (
                        <div className="flex shrink-0 items-center gap-1 text-sm text-yellow-400">
                          <Star size={15} fill="currentColor" />
                          {pod.rating}
                        </div>
                      )}
                    </div>

                    <p className="line-clamp-3 text-sm leading-6 text-slate-400">
                      {pod.description ||
                        "A comfortable and private space for your short stay."}
                    </p>

                    {Array.isArray(pod.amenities) &&
                      pod.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {pod.amenities.slice(0, 5).map((amenity) => (
                            <span
                              key={amenity}
                              className="rounded-full bg-surface-700 px-3 py-1 text-xs text-slate-300"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      )}

                    <div className="flex items-center justify-between border-t border-white/10 pt-5">
                      <div>
                        <p className="text-xs text-slate-500">
                          Starting from
                        </p>

                        <p className="mt-1 text-lg font-bold text-brand-400">
                          ₹{getPodPrice(pod)}
                          <span className="text-xs font-normal text-slate-500">
                            /hour
                          </span>
                        </p>
                      </div>

                      <Link
                    to={`/pods/${podId}`}
                    className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-400"
                >
                    View Pod
                </Link>
                                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurPods;