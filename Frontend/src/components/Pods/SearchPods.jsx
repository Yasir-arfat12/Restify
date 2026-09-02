import React, { useEffect, useState } from "react";
import { useSearch } from "../../context/SearchContext";

import {
    MapPin,
    Calendar,
    Clock,
    Users,
    LoaderCircle,
    X
} from "lucide-react";

import API from "../../api/axios";


const SearchPods = () => {

    // --------------------------------
    // SEARCH CONTEXT
    // --------------------------------

    const { searchCriteria } = useSearch();

    const {
        state,
        city,
        date,
        time
    } = searchCriteria;


    // --------------------------------
    // STATES
    // --------------------------------

    const [pods, setPods] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [selectedPod, setSelectedPod] = useState(null);


    // --------------------------------
    // SEARCH PODS
    // --------------------------------

    useEffect(() => {

        const searchPods = async () => {

            try {

                setLoading(true);

                setError("");

                console.log(
                    "Searching pods with:",
                    {
                        state,
                        city,
                        date,
                        time
                    }
                );


                // --------------------------------
                // CALL BACKEND
                // --------------------------------

                const response = await API.get(
                    "/pods/search",
                    {
                        params: {

                            city: city,

                            date: date,

                            time: time,

                            bookingDate: date

                        }
                    }
                );


                console.log(
                    "Backend response:",
                    response.data
                );


                // --------------------------------
                // STORE PODS
                // --------------------------------

                setPods(
                    response.data.pods || []
                );


            } catch (err) {

                console.error(
                    "Search pods error:",
                    err
                );


                setError(
                    err.response?.data?.message ||
                    "Unable to search pods."
                );


                setPods([]);

            } finally {

                setLoading(false);

            }

        };


        // Only search if city exists

        if (city) {

            searchPods();

        } else {

            setPods([]);

            setLoading(false);

        }

    }, [
        city,
        state,
        date,
        time
    ]);


    // --------------------------------
    // LOADING
    // --------------------------------

    if (loading) {

        return (

            <div className="min-h-screen bg-gradient-to-r from-[#030912] via-[#0b1e3c] to-[#09101b] flex items-center justify-center">

                <div className="text-center text-white">

                    <LoaderCircle
                        className="
                            w-10
                            h-10
                            mx-auto
                            animate-spin
                            text-green-400
                        "
                    />

                    <p className="mt-4 text-lg">
                        Searching available pods...
                    </p>

                </div>

            </div>

        );

    }


    // --------------------------------
    // MAIN UI
    // --------------------------------

    return (

        <div className="min-h-screen bg-gradient-to-r from-[#030912] via-[#0b1e3c] to-[#09101b]">

            {/* ================================= */}
            {/* SEARCH SUMMARY */}
            {/* ================================= */}

            <div className="
                sticky
                top-0
                z-40
                bg-black/90
                backdrop-blur-md
                border-b
                border-white/10
            ">

                <div className="
                    max-w-7xl
                    mx-auto
                    px-4
                    py-4
                    sm:px-6
                    lg:px-8
                ">

                    <div className="
                        flex
                        flex-col
                        gap-3
                        md:flex-row
                        md:items-center
                        md:justify-between
                    ">

                        {/* LOCATION */}

                        <div className="flex items-center gap-2">

                            <MapPin
                                className="text-emerald-400"
                            />

                            <div>

                                <p className="text-xs text-slate-400">
                                    Location
                                </p>

                                <p className="font-semibold text-white capitalize">

                                    {city}

                                    {state && (
                                        <>
                                            , {state}
                                        </>
                                    )}

                                </p>

                            </div>

                        </div>


                        {/* DATE */}

                        <div className="flex items-center gap-2">

                            <Calendar
                                className="text-blue-400"
                            />

                            <div>

                                <p className="text-xs text-slate-400">
                                    Date
                                </p>

                                <p className="font-semibold text-white">
                                    {date}
                                </p>

                            </div>

                        </div>


                        {/* TIME */}

                        <div className="flex items-center gap-2">

                            <Clock
                                className="text-purple-400"
                            />

                            <div>

                                <p className="text-xs text-slate-400">
                                    Time
                                </p>

                                <p className="font-semibold text-white">
                                    {time}
                                </p>

                            </div>

                        </div>


                        {/* RESULT COUNT */}

                        <div className="
                            rounded-xl
                            bg-white/10
                            px-4
                            py-2
                            text-sm
                            text-white
                        ">

                            <span className="font-bold">
                                {pods.length}
                            </span>

                            {" "}

                            pods found

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================= */}
            {/* CONTENT */}
            {/* ================================= */}

            <div className="
                max-w-7xl
                mx-auto
                px-4
                py-8
                sm:px-6
                lg:px-8
            ">


                {/* ERROR */}

                {error && (

                    <div className="
                        mb-6
                        rounded-2xl
                        border
                        border-red-500/30
                        bg-red-500/10
                        p-5
                        text-red-400
                    ">

                        <p className="font-semibold">
                            Search failed
                        </p>

                        <p className="mt-1 text-sm">
                            {error}
                        </p>

                    </div>

                )}


                {/* NO PODS */}

                {!error && pods.length === 0 && (

                    <div className="
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/5
                        p-10
                        text-center
                    ">

                        <h2 className="
                            text-2xl
                            font-bold
                            text-white
                        ">
                            No pods found
                        </h2>

                        <p className="
                            mt-3
                            text-slate-400
                        ">

                            We couldn't find any pods
                            in {city} for your search.

                        </p>

                    </div>

                )}


                {/* ================================= */}
                {/* POD LIST */}
                {/* ================================= */}

                <div className="space-y-6">

                    {pods.map((pod) => (

                        <div
                            key={pod._id}
                            className="
                                overflow-hidden
                                rounded-3xl
                                border
                                border-white/10
                                bg-gray-100
                                shadow-xl
                                transition
                                hover:-translate-y-1
                            "
                        >

                            <div className="
                                flex
                                flex-col
                                lg:flex-row
                            ">


                                {/* ================================= */}
                                {/* IMAGE */}
                                {/* ================================= */}

                                <div className="
                                    relative
                                    w-full
                                    lg:w-[40%]
                                ">

                                    <img
                                        src={
                                            pod.images?.[0] ||
                                            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
                                        }
                                        alt={pod.podName}
                                        className="
                                            h-64
                                            w-full
                                            object-cover
                                            sm:h-80
                                            lg:h-full
                                        "
                                    />


                                    {/* STATUS */}

                                    <div className="
                                        absolute
                                        left-4
                                        top-4
                                        rounded-full
                                        bg-emerald-500
                                        px-4
                                        py-2
                                        text-sm
                                        font-bold
                                        text-white
                                    ">

                                        {pod.status || "Available"}

                                    </div>

                                </div>


                                {/* ================================= */}
                                {/* DETAILS */}
                                {/* ================================= */}

                                <div className="
                                    flex-1
                                    p-6
                                    lg:p-8
                                ">


                                    {/* TITLE */}

                                    <h2 className="
                                        text-2xl
                                        font-bold
                                        text-gray-900
                                        md:text-3xl
                                    ">

                                        {pod.podName}

                                    </h2>


                                    {/* LOCATION */}

                                    <div className="
                                        mt-3
                                        flex
                                        items-start
                                        gap-2
                                        text-gray-600
                                    ">

                                        <MapPin
                                            className="
                                                mt-1
                                                h-5
                                                w-5
                                                shrink-0
                                                text-emerald-600
                                            "
                                        />

                                        <div>

                                            <p>
                                                {pod.location}
                                            </p>

                                            <p className="
                                                text-sm
                                                text-gray-500
                                            ">

                                                {pod.city},{" "}
                                                {pod.state}

                                            </p>

                                        </div>

                                    </div>


                                    {/* DESCRIPTION */}

                                    <p className="
                                        mt-5
                                        leading-7
                                        text-gray-600
                                    ">

                                        {pod.description}

                                    </p>


                                    {/* CAPACITY */}

                                    <div className="
                                        mt-5
                                        flex
                                        items-center
                                        gap-2
                                        text-gray-600
                                    ">

                                        <Users
                                            className="
                                                h-5
                                                w-5
                                            "
                                        />

                                        Capacity:

                                        <strong>
                                            {pod.capacity}
                                        </strong>

                                    </div>


                                    {/* AMENITIES */}

                                    {pod.amenities?.length > 0 && (

                                        <div className="
                                            mt-5
                                            flex
                                            flex-wrap
                                            gap-2
                                        ">

                                            {pod.amenities.map(
                                                (amenity, index) => (

                                                    <span
                                                        key={index}
                                                        className="
                                                            rounded-full
                                                            bg-gray-200
                                                            px-4
                                                            py-2
                                                            text-xs
                                                            font-medium
                                                            text-gray-700
                                                        "
                                                    >

                                                        {amenity}

                                                    </span>

                                                )
                                            )}

                                        </div>

                                    )}


                                    {/* ================================= */}
                                    {/* BOTTOM */}
                                    {/* ================================= */}

                                    <div className="
                                        mt-7
                                        flex
                                        flex-col
                                        gap-5
                                        border-t
                                        border-gray-200
                                        pt-6
                                        sm:flex-row
                                        sm:items-center
                                        sm:justify-between
                                    ">


                                        {/* PRICE */}

                                        <div>

                                            <p className="
                                                text-sm
                                                text-gray-500
                                            ">
                                                Starting from
                                            </p>

                                            <p className="
                                                text-3xl
                                                font-bold
                                                text-gray-900
                                            ">

                                                ₹{pod.hourlyPrice}

                                                <span className="
                                                    ml-1
                                                    text-sm
                                                    font-normal
                                                    text-gray-500
                                                ">
                                                    /hour
                                                </span>

                                            </p>

                                            <p className="
                                                mt-1
                                                text-sm
                                                text-gray-500
                                            ">

                                                ₹{pod.dayPrice} / day

                                            </p>

                                        </div>


                                        {/* BUTTONS */}

                                        <div className="
                                            flex
                                            w-full
                                            flex-col
                                            gap-3
                                            sm:w-auto
                                            sm:flex-row
                                        ">

                                            <button
                                                onClick={() =>
                                                    setSelectedPod(
                                                        pod
                                                    )
                                                }
                                                className="
                                                    rounded-xl
                                                    border-2
                                                    border-gray-300
                                                    px-6
                                                    py-3
                                                    font-semibold
                                                    text-gray-800
                                                    transition
                                                    hover:border-black
                                                "
                                            >

                                                View Details

                                            </button>


                                            <button
                                                onClick={() =>
                                                    alert(
                                                        `Booking ${pod.podName}`
                                                    )
                                                }
                                                className="
                                                    rounded-xl
                                                    bg-green-500
                                                    px-6
                                                    py-3
                                                    font-semibold
                                                    text-white
                                                    transition
                                                    hover:bg-green-600
                                                "
                                            >

                                                Book Now

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>


            {/* ================================= */}
            {/* DETAILS MODAL */}
            {/* ================================= */}

            {selectedPod && (

                <div className="
                    fixed
                    inset-0
                    z-50
                    flex
                    items-center
                    justify-center
                    bg-black/70
                    p-4
                    backdrop-blur-sm
                ">

                    <div className="
                        relative
                        max-h-[90vh]
                        w-full
                        max-w-3xl
                        overflow-y-auto
                        rounded-3xl
                        bg-white
                        shadow-2xl
                    ">


                        {/* CLOSE */}

                        <button
                            onClick={() =>
                                setSelectedPod(null)
                            }
                            className="
                                absolute
                                right-4
                                top-4
                                z-10
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                bg-black/70
                                text-white
                            "
                        >

                            <X />

                        </button>


                        {/* IMAGE */}

                        <img
                            src={
                                selectedPod.images?.[0] ||
                                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
                            }
                            alt={selectedPod.podName}
                            className="
                                h-64
                                w-full
                                object-cover
                            "
                        />


                        {/* MODAL CONTENT */}

                        <div className="p-6 sm:p-8">

                            <h2 className="
                                text-3xl
                                font-bold
                                text-gray-900
                            ">

                                {selectedPod.podName}

                            </h2>


                            <p className="
                                mt-2
                                text-gray-500
                            ">

                                {selectedPod.location}

                            </p>


                            <p className="
                                mt-6
                                leading-7
                                text-gray-600
                            ">

                                {selectedPod.description}

                            </p>


                            {/* AMENITIES */}

                            <h3 className="
                                mt-7
                                text-xl
                                font-bold
                                text-gray-900
                            ">

                                Amenities

                            </h3>


                            <div className="
                                mt-4
                                flex
                                flex-wrap
                                gap-2
                            ">

                                {selectedPod.amenities?.map(
                                    (amenity, index) => (

                                        <span
                                            key={index}
                                            className="
                                                rounded-full
                                                bg-gray-100
                                                px-4
                                                py-2
                                                text-sm
                                                text-gray-700
                                            "
                                        >

                                            {amenity}

                                        </span>

                                    )
                                )}

                            </div>


                            {/* PRICING */}

                            <div className="
                                mt-8
                                grid
                                gap-4
                                sm:grid-cols-2
                            ">

                                <div className="
                                    rounded-2xl
                                    bg-gray-100
                                    p-5
                                ">

                                    <p className="
                                        text-sm
                                        text-gray-500
                                    ">
                                        Hourly
                                    </p>

                                    <p className="
                                        mt-1
                                        text-2xl
                                        font-bold
                                    ">

                                        ₹{selectedPod.hourlyPrice}

                                    </p>

                                </div>


                                <div className="
                                    rounded-2xl
                                    bg-gray-100
                                    p-5
                                ">

                                    <p className="
                                        text-sm
                                        text-gray-500
                                    ">
                                        Daily
                                    </p>

                                    <p className="
                                        mt-1
                                        text-2xl
                                        font-bold
                                    ">

                                        ₹{selectedPod.dayPrice}

                                    </p>

                                </div>

                            </div>


                            <button
                                onClick={() => {

                                    setSelectedPod(null);

                                    alert(
                                        `Booking ${selectedPod.podName}`
                                    );

                                }}
                                className="
                                    mt-8
                                    w-full
                                    rounded-xl
                                    bg-green-500
                                    py-4
                                    font-bold
                                    text-white
                                    transition
                                    hover:bg-green-600
                                "
                            >

                                Book This Pod

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

};


export default SearchPods;