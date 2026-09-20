import React, {
    useEffect,
    useState
} from "react";

import {
    ArrowLeft,
    MapPin,
    Users,
    Clock,
    CalendarDays,
    Wifi,
    Snowflake,
    Lock,
    LoaderCircle,
    CheckCircle2
} from "lucide-react";

import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import API from "../../api/axios";

import BookingModal from "../pages/BookingModal";


const PodDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();


    const [pod, setPod] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [showBookingModal, setShowBookingModal] =
        useState(false);


    // ==================================================
    // FETCH POD DETAILS
    // ==================================================

    useEffect(() => {

        const fetchPod = async () => {

            try {

                setLoading(true);

                setError("");


                const response =
                    await API.get(
                        `/pods/${id}`
                    );


                if (
                    response.data?.success
                ) {

                    setPod(
                        response.data.pod
                    );

                } else {

                    setError(
                        response.data?.message ||
                        "Unable to load pod details."
                    );

                }

            } catch (error) {

                console.error(
                    "Unable to fetch pod:",
                    error
                );


                setError(
                    error.response?.data?.message ||
                    "Unable to load pod details."
                );

            } finally {

                setLoading(false);

            }

        };


        if (id) {
            fetchPod();
        }

    }, [id]);


    // ==================================================
    // LOADING
    // ==================================================

    if (loading) {

        return (

            <div className="min-h-screen bg-slate-950 text-white">

                <div className="flex min-h-[70vh] items-center justify-center">

                    <div className="flex items-center gap-3 text-slate-300">

                        <LoaderCircle
                            size={28}
                            className="animate-spin text-blue-500"
                        />

                        <span>
                            Loading pod details...
                        </span>

                    </div>

                </div>

            </div>

        );

    }


    // ==================================================
    // ERROR
    // ==================================================

    if (error || !pod) {

        return (

            <div className="min-h-screen bg-slate-950 px-4 py-16 text-white">

                <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900 p-10 text-center">

                    <h1 className="text-2xl font-bold">
                        Pod Not Found
                    </h1>

                    <p className="mt-3 text-slate-400">
                        {error ||
                            "The pod you are looking for could not be found."}
                    </p>

                    <button
                        onClick={() =>
                            navigate(-1)
                        }
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500"
                    >
                        <ArrowLeft size={18} />

                        Go Back
                    </button>

                </div>

            </div>

        );

    }


    // ==================================================
    // IMAGE
    // ==================================================

    const podImage =
        Array.isArray(pod.images) &&
        pod.images.length > 0
            ? pod.images[0]
            : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1400&auto=format&fit=crop";


    // ==================================================
    // LOCATION
    // ==================================================

    const fullLocation = [
        pod.location,
        pod.city,
        pod.state
    ]
        .filter(Boolean)
        .join(", ");


    // ==================================================
    // BOOKING SUCCESS
    // ==================================================

    const handleBookingSuccess = () => {

        setShowBookingModal(false);

    };


    // ==================================================
    // UI
    // ==================================================

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">


                {/* ======================================
                    BACK BUTTON
                ======================================= */}

                <button
                    onClick={() =>
                        navigate(-1)
                    }
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
                >

                    <ArrowLeft size={18} />

                    Back

                </button>


                {/* ======================================
                    MAIN IMAGE
                ======================================= */}

                <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900">

                    <div className="relative h-[300px] sm:h-[420px] lg:h-[500px]">

                        <img
                            src={podImage}
                            alt={pod.podName}
                            className="h-full w-full object-cover"
                            onError={(event) => {
                                event.currentTarget.src =
                                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1400&auto=format&fit=crop";
                            }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />


                        {/* Status */}

                        <div className="absolute left-5 top-5">

                            <span
                                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold backdrop-blur ${
                                    pod.status === "Available"
                                        ? "bg-green-500/20 text-green-300"
                                        : "bg-red-500/20 text-red-300"
                                }`}
                            >

                                <span
                                    className={`h-2 w-2 rounded-full ${
                                        pod.status === "Available"
                                            ? "bg-green-400"
                                            : "bg-red-400"
                                    }`}
                                />

                                {pod.status}

                            </span>

                        </div>


                        {/* Image title */}

                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">

                            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
                                Restify Pod
                            </p>

                            <h1 className="text-3xl font-bold sm:text-5xl">
                                {pod.podName}
                            </h1>

                            <div className="mt-3 flex items-center gap-2 text-slate-300">

                                <MapPin size={18} />

                                <span>
                                    {fullLocation ||
                                        "Location unavailable"}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ======================================
                    CONTENT
                ======================================= */}

                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">


                    {/* ==================================
                        LEFT
                    =================================== */}

                    <div className="space-y-8">


                        {/* Description */}

                        <section className="rounded-3xl border border-white/10 bg-slate-900 p-6 sm:p-8">

                            <h2 className="text-2xl font-bold">
                                About this pod
                            </h2>

                            <p className="mt-4 leading-8 text-slate-400">
                                {pod.description ||
                                    "A comfortable and private space designed for rest and relaxation."}
                            </p>

                        </section>


                        {/* Pod information */}

                        <section className="rounded-3xl border border-white/10 bg-slate-900 p-6 sm:p-8">

                            <h2 className="text-2xl font-bold">
                                Pod Information
                            </h2>


                            <div className="mt-6 grid gap-4 sm:grid-cols-2">


                                {/* Capacity */}

                                <div className="rounded-2xl bg-slate-800 p-5">

                                    <div className="flex items-center gap-3">

                                        <Users
                                            size={22}
                                            className="text-blue-400"
                                        />

                                        <div>

                                            <p className="text-sm text-slate-500">
                                                Capacity
                                            </p>

                                            <p className="mt-1 font-semibold">
                                                {pod.capacity}{" "}
                                                people
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Hourly */}

                                <div className="rounded-2xl bg-slate-800 p-5">

                                    <div className="flex items-center gap-3">

                                        <Clock
                                            size={22}
                                            className="text-blue-400"
                                        />

                                        <div>

                                            <p className="text-sm text-slate-500">
                                                Hourly Price
                                            </p>

                                            <p className="mt-1 font-semibold">
                                                ₹
                                                {
                                                    pod.hourlyPrice
                                                }
                                                /hour
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Daily */}

                                <div className="rounded-2xl bg-slate-800 p-5">

                                    <div className="flex items-center gap-3">

                                        <CalendarDays
                                            size={22}
                                            className="text-blue-400"
                                        />

                                        <div>

                                            <p className="text-sm text-slate-500">
                                                Daily Price
                                            </p>

                                            <p className="mt-1 font-semibold">
                                                ₹
                                                {
                                                    pod.dayPrice
                                                }
                                                /day
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Status */}

                                <div className="rounded-2xl bg-slate-800 p-5">

                                    <div className="flex items-center gap-3">

                                        <CheckCircle2
                                            size={22}
                                            className="text-green-400"
                                        />

                                        <div>

                                            <p className="text-sm text-slate-500">
                                                Availability
                                            </p>

                                            <p className="mt-1 font-semibold">
                                                {
                                                    pod.status
                                                }
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </section>


                        {/* Amenities */}

                        {Array.isArray(
                            pod.amenities
                        ) &&
                            pod.amenities.length >
                                0 && (

                                <section className="rounded-3xl border border-white/10 bg-slate-900 p-6 sm:p-8">

                                    <h2 className="text-2xl font-bold">
                                        Amenities
                                    </h2>


                                    <div className="mt-6 grid gap-4 sm:grid-cols-2">

                                        {pod.amenities.map(
                                            (
                                                amenity,
                                                index
                                            ) => (

                                                <div
                                                    key={`${amenity}-${index}`}
                                                    className="flex items-center gap-3 rounded-2xl bg-slate-800 p-4"
                                                >

                                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">

                                                        {amenity
                                                            .toLowerCase()
                                                            .includes(
                                                                "wifi"
                                                            ) ? (

                                                            <Wifi
                                                                size={
                                                                    20
                                                                }
                                                                className="text-blue-400"
                                                            />

                                                        ) : amenity
                                                              .toLowerCase()
                                                              .includes(
                                                                  "ac"
                                                              ) ? (

                                                            <Snowflake
                                                                size={
                                                                    20
                                                                }
                                                                className="text-blue-400"
                                                            />

                                                        ) : amenity
                                                              .toLowerCase()
                                                              .includes(
                                                                  "lock"
                                                              ) ? (

                                                            <Lock
                                                                size={
                                                                    20
                                                                }
                                                                className="text-blue-400"
                                                            />

                                                        ) : (

                                                            <CheckCircle2
                                                                size={
                                                                    20
                                                                }
                                                                className="text-blue-400"
                                                            />

                                                        )}

                                                    </div>

                                                    <span className="text-slate-200">
                                                        {
                                                            amenity
                                                        }
                                                    </span>

                                                </div>

                                            )
                                        )}

                                    </div>

                                </section>
                            )}

                    </div>


                    {/* ==================================
                        RIGHT BOOKING CARD
                    =================================== */}

                    <aside>

                        <div className="sticky top-24 rounded-3xl border border-blue-500/20 bg-[#071426] p-6 shadow-2xl">

                            <p className="text-sm text-slate-500">
                                Starting from
                            </p>

                            <div className="mt-1">

                                <span className="text-3xl font-bold text-blue-400">
                                    ₹
                                    {
                                        pod.hourlyPrice
                                    }
                                </span>

                                <span className="text-slate-500">
                                    /hour
                                </span>

                            </div>


                            <div className="my-6 border-t border-white/10" />


                            <div className="space-y-4 text-sm">


                                <div className="flex justify-between">

                                    <span className="text-slate-500">
                                        Daily rate
                                    </span>

                                    <span className="font-medium">
                                        ₹
                                        {
                                            pod.dayPrice
                                        }
                                    </span>

                                </div>


                                <div className="flex justify-between">

                                    <span className="text-slate-500">
                                        Capacity
                                    </span>

                                    <span className="font-medium">
                                        {
                                            pod.capacity
                                        }{" "}
                                        people
                                    </span>

                                </div>


                                <div className="flex justify-between">

                                    <span className="text-slate-500">
                                        Location
                                    </span>

                                    <span className="max-w-[180px] text-right font-medium">
                                        {pod.city},{" "}
                                        {pod.state}
                                    </span>

                                </div>

                            </div>


                            <button
                                disabled={
                                    pod.status !==
                                    "Available"
                                }
                                onClick={() =>
                                    setShowBookingModal(
                                        true
                                    )
                                }
                                className="mt-8 w-full rounded-xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {pod.status ===
                                "Available"
                                    ? "Book This Pod"
                                    : "Currently Unavailable"}
                            </button>


                            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                                Select your date and time
                                after clicking the booking
                                button.
                            </p>

                        </div>

                    </aside>

                </div>


                {/* ======================================
                    MOBILE BACK
                ======================================= */}

                <div className="mt-8">

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                    >

                        <ArrowLeft size={17} />

                        Back to Home

                    </Link>

                </div>

            </div>


            {/* ======================================
                BOOKING MODAL
            ======================================= */}

            {showBookingModal &&
                pod && (

                    <BookingModal
                        pod={pod}
                        onClose={() =>
                            setShowBookingModal(
                                false
                            )
                        }
                        onBookingSuccess={
                            handleBookingSuccess
                        }
                    />

                )}

        </div>
    );
};


export default PodDetails;