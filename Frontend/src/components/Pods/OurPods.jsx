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

import {
    MapPin,
    Users,
    Wifi,
    LoaderCircle,
    ArrowRight
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

                const response =
                    await API.get("/pods");

                setPods(response.data);

            } catch (error) {

                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Unable to load pods."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchPods();

    }, []);

    return (

        <section className="min-h-screen bg-gradient-to-r from-[#030912] via-[#0b1e3c] to-[#09101b] px-4 py-12 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                <div className="mx-auto mb-12 max-w-3xl text-center">

                    <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        Our Pods
                    </h1>

                    <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
                        Private, comfortable and affordable
                        sleeping pods available whenever
                        you need to rest.
                    </p>

                </div>


                {/* Loading */}

                {loading && (

                    <div className="flex min-h-[300px] items-center justify-center">

                        <div className="text-center">

                            <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-blue-400" />

                            <p className="mt-4 text-slate-400">
                                Loading pods...
                            </p>

                        </div>

                    </div>

                )}


                {/* Error */}

                {!loading && error && (

                    <div className="mx-auto max-w-xl rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400">
                        {error}
                    </div>

                )}


                {/* Empty */}

                {!loading &&
                    !error &&
                    pods.length === 0 && (

                        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">

                            <h2 className="text-xl font-semibold text-white">
                                No pods available
                            </h2>

                            <p className="mt-2 text-slate-500">
                                New pods will appear here once
                                an owner or admin creates them.
                            </p>

                        </div>

                    )}


                {/* POD GRID */}

                {!loading &&
                    !error &&
                    pods.length > 0 && (

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {pods.map((pod) => (

                                <PodCard
                                    key={pod._id}
                                    pod={pod}
                                />

                            ))}

                        </div>

                    )}

            </div>

        </section>
    );
};


const PodCard = ({ pod }) => {

    const image =
        pod.images?.[0] ||
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop";

    return (

        <article className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-blue-500/40">

            {/* IMAGE */}

            <div className="relative h-56 overflow-hidden">

                <img
                    src={image}
                    alt={pod.podName}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute left-4 top-4 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-white">
                    {pod.status || "Available"}
                </div>

                <div className="absolute bottom-4 left-4">

                    <h2 className="text-xl font-bold text-white">
                        {pod.podName}
                    </h2>

                </div>

            </div>


            {/* CONTENT */}

            <div className="p-5">

                <div className="flex items-start gap-2 text-sm text-slate-400">

                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

                    <span>
                        {pod.location}
                    </span>

                </div>

                <div className="mt-2 text-sm text-slate-500">
                    {pod.city}, {pod.state}
                </div>


                <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-400">
                    {pod.description}
                </p>


                <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-5">

                    <div>

                        <p className="text-xs text-slate-500">
                            Starting from
                        </p>

                        <p className="text-xl font-bold text-white">
                            ₹{pod.hourlyPrice}
                            <span className="text-sm font-normal text-slate-500">
                                /hour
                            </span>
                        </p>

                    </div>


                    <div className="flex items-center gap-1 text-sm text-slate-400">

                        <Users className="h-4 w-4" />

                        {pod.capacity}

                    </div>

                </div>


                {pod.amenities?.length > 0 && (

                    <div className="mt-4 flex flex-wrap gap-2">

                        {pod.amenities
                            .slice(0, 3)
                            .map((amenity) => (

                                <span
                                    key={amenity}
                                    className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                                >
                                    {amenity}
                                </span>

                            ))}

                    </div>

                )}

            </div>

        </article>
    );
};

export default OurPods;