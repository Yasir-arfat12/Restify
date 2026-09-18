import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../../context/authContext";

import OwnerDashboard from "./OwnerDashboard";

import API from "../../api/axios";


function ProfileUser() {

    const navigate =
        useNavigate();

    const {
        user,
        logout,
        loading: authLoading
    } = useAuth();


    // =====================================================
    // CUSTOMER BOOKING STATE
    // =====================================================

    const [
        bookings,
        setBookings
    ] = useState([]);


    const [
        loadingBookings,
        setLoadingBookings
    ] = useState(true);


    const [
        bookingError,
        setBookingError
    ] = useState("");


    const [
        cancellingId,
        setCancellingId
    ] = useState(null);


    // =====================================================
    // FETCH CUSTOMER BOOKINGS
    // =====================================================

    const fetchBookings = async () => {

        try {

            setLoadingBookings(true);

            setBookingError("");


            const response =
                await API.get(
                    "/bookings/my-bookings"
                );


            if (
                response.data?.success &&
                Array.isArray(
                    response.data.bookings
                )
            ) {

                setBookings(
                    response.data.bookings
                );

            } else {

                setBookings([]);

            }

        } catch (error) {

            console.error(
                "GET MY BOOKINGS ERROR:",
                error
            );


            setBookingError(
                error.response?.data?.message ||
                "Unable to load your bookings."
            );


            setBookings([]);

        } finally {

            setLoadingBookings(false);

        }

    };


    // =====================================================
    // FETCH WHEN CUSTOMER LOGS IN
    // =====================================================

    useEffect(() => {

        if (
            user &&
            user.role === "customer"
        ) {

            fetchBookings();

        } else {

            setLoadingBookings(false);

        }

    }, [user]);


    // =====================================================
    // CANCEL BOOKING
    // =====================================================

    const handleCancelBooking =
        async (bookingId) => {

            const confirmed =
                window.confirm(
                    "Are you sure you want to cancel this booking?"
                );


            if (!confirmed) {

                return;

            }


            try {

                setCancellingId(
                    bookingId
                );


                await API.patch(
                    `/bookings/${bookingId}/cancel`
                );


                await fetchBookings();


            } catch (error) {

                console.error(
                    "CANCEL BOOKING ERROR:",
                    error
                );


                window.alert(
                    error.response?.data?.message ||
                    "Unable to cancel this booking."
                );

            } finally {

                setCancellingId(null);

            }

        };


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {

        logout();

        navigate("/login");

    };


    // =====================================================
    // AUTH LOADING
    // =====================================================

    if (authLoading) {

        return (

            <section className="min-h-screen bg-slate-950 flex items-center justify-center">

                <p className="text-white text-lg">
                    Loading profile...
                </p>

            </section>

        );

    }


    // =====================================================
    // NOT LOGGED IN
    // =====================================================

    if (!user) {

        return (

            <section className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

                <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">

                    <h1 className="text-3xl font-bold text-white">
                        Login Required
                    </h1>

                    <p className="mt-3 text-slate-400">
                        Please login to view your account.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/login")
                        }
                        className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-500"
                    >
                        Login
                    </button>

                </div>

            </section>

        );

    }


    // =====================================================
    // OWNER PROFILE
    // =====================================================

    if (
        user.role === "owner"
    ) {

        return (
            <OwnerDashboard />
        );

    }


    // =====================================================
    // CUSTOMER PROFILE
    // =====================================================

    return (

        <section className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-10">

            <div className="mx-auto max-w-6xl">


                {/* HEADER */}

                <div className="mb-10">

                    <p className="text-sm font-semibold tracking-widest text-blue-400">
                        MY BOOKINGS
                    </p>


                    <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <h1 className="text-3xl font-bold text-white sm:text-4xl">

                                Welcome, {user.name}

                            </h1>


                            <p className="mt-2 text-slate-400">

                                View and manage your Restify bookings.

                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate("/searchpods")
                            }
                            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
                        >

                            Book Another Pod

                        </button>

                    </div>

                </div>


                {/* SUMMARY */}

                <div className="mb-8 grid gap-4 sm:grid-cols-3">


                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                        <p className="text-sm text-slate-400">
                            Total Bookings
                        </p>

                        <p className="mt-2 text-3xl font-bold text-white">
                            {bookings.length}
                        </p>

                    </div>


                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                        <p className="text-sm text-slate-400">
                            Active
                        </p>

                        <p className="mt-2 text-3xl font-bold text-blue-400">

                            {
                                bookings.filter(
                                    booking =>
                                        booking.bookingStatus === "Pending" ||
                                        booking.bookingStatus === "Confirmed"
                                ).length
                            }

                        </p>

                    </div>


                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                        <p className="text-sm text-slate-400">
                            Completed
                        </p>

                        <p className="mt-2 text-3xl font-bold text-green-400">

                            {
                                bookings.filter(
                                    booking =>
                                        booking.bookingStatus === "Completed"
                                ).length
                            }

                        </p>

                    </div>

                </div>


                {/* ERROR */}

                {bookingError && (

                    <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-5">

                        <p className="text-red-400">
                            {bookingError}
                        </p>

                        <button
                            onClick={fetchBookings}
                            className="mt-4 rounded-lg bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300"
                        >
                            Try Again
                        </button>

                    </div>

                )}


                {/* LOADING */}

                {loadingBookings && (

                    <div className="space-y-5">

                        {[1, 2].map(
                            item => (

                                <div
                                    key={item}
                                    className="animate-pulse rounded-3xl border border-slate-800 bg-slate-900 p-6"
                                >

                                    <div className="h-5 w-1/3 rounded bg-slate-800" />

                                    <div className="mt-4 h-4 w-1/2 rounded bg-slate-800" />

                                    <div className="mt-3 h-4 w-1/3 rounded bg-slate-800" />

                                </div>

                            )
                        )}

                    </div>

                )}


                {/* NO BOOKINGS */}

                {!loadingBookings &&
                    !bookingError &&
                    bookings.length === 0 && (

                        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-12 text-center">

                            <div className="text-5xl">
                                🏕️
                            </div>

                            <h2 className="mt-5 text-2xl font-bold text-white">
                                No bookings yet
                            </h2>

                            <p className="mt-3 text-slate-400">
                                Find a pod and make your first booking.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/searchpods")
                                }
                                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
                            >
                                Explore Pods
                            </button>

                        </div>

                    )}


                {/* BOOKINGS */}

                {!loadingBookings &&
                    bookings.length > 0 && (

                        <div className="space-y-5">

                            {bookings.map(
                                booking => (

                                    <article
                                        key={booking._id}
                                        className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900"
                                    >

                                        <div className="flex flex-col md:flex-row">

                                            {/* IMAGE */}

                                            <div className="h-52 w-full md:h-auto md:w-64">

                                                {booking.pod?.images?.[0] ? (

                                                    <img
                                                        src={
                                                            booking.pod.images[0]
                                                        }
                                                        alt={
                                                            booking.pod.podName ||
                                                            "Restify pod"
                                                        }
                                                        className="h-full w-full object-cover"
                                                    />

                                                ) : (

                                                    <div className="flex h-full min-h-52 items-center justify-center bg-slate-800 text-5xl">
                                                        🏕️
                                                    </div>

                                                )}

                                            </div>


                                            {/* DETAILS */}

                                            <div className="flex-1 p-6">

                                                <div className="flex flex-col gap-4 md:flex-row md:justify-between">

                                                    <div>

                                                        <h2 className="text-xl font-bold text-white">

                                                            {
                                                                booking.pod?.podName ||
                                                                "Restify Pod"
                                                            }

                                                        </h2>


                                                        <p className="mt-2 text-sm text-slate-400">

                                                            📍{" "}

                                                            {
                                                                booking.pod?.location ||
                                                                booking.pod?.city ||
                                                                "Location unavailable"
                                                            }

                                                        </p>

                                                    </div>


                                                    <div>

                                                        <span className="rounded-full bg-blue-400/10 px-3 py-1.5 text-xs font-semibold text-blue-300">

                                                            {
                                                                booking.bookingStatus
                                                            }

                                                        </span>

                                                    </div>

                                                </div>


                                                <div className="mt-6 grid gap-4 text-sm sm:grid-cols-3">

                                                    <div>

                                                        <p className="text-slate-500">
                                                            Date
                                                        </p>

                                                        <p className="mt-1 font-medium text-white">

                                                            {
                                                                booking.bookingDate
                                                                    ? new Date(
                                                                        booking.bookingDate
                                                                    ).toLocaleDateString()
                                                                    : "N/A"
                                                            }

                                                        </p>

                                                    </div>


                                                    <div>

                                                        <p className="text-slate-500">
                                                            Time
                                                        </p>

                                                        <p className="mt-1 font-medium text-white">

                                                            {booking.startTime}
                                                            {" → "}
                                                            {booking.endTime}

                                                        </p>

                                                    </div>


                                                    <div>

                                                        <p className="text-slate-500">
                                                            Amount
                                                        </p>

                                                        <p className="mt-1 font-bold text-blue-400">

                                                            ₹
                                                            {
                                                                Number(
                                                                    booking.subtotal || 0
                                                                ).toFixed(2)
                                                            }

                                                        </p>

                                                    </div>

                                                </div>


                                                {/* CANCEL */}

                                                {
                                                    booking.bookingStatus !==
                                                        "Cancelled" &&
                                                    booking.bookingStatus !==
                                                        "Completed" && (

                                                        <button
                                                            onClick={() =>
                                                                handleCancelBooking(
                                                                    booking._id
                                                                )
                                                            }
                                                            disabled={
                                                                cancellingId ===
                                                                booking._id
                                                            }
                                                            className="mt-6 rounded-xl border border-red-500/40 px-5 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                                                        >

                                                            {
                                                                cancellingId ===
                                                                booking._id
                                                                    ? "Cancelling..."
                                                                    : "Cancel Booking"
                                                            }

                                                        </button>

                                                    )
                                                }

                                            </div>

                                        </div>

                                    </article>

                                )
                            )}

                        </div>

                    )}


                {/* LOGOUT */}

                <div className="mt-10 border-t border-slate-800 pt-8">

                    <button
                        onClick={handleLogout}
                        className="rounded-xl border border-red-500/40 px-6 py-3 font-semibold text-red-400 hover:bg-red-500/10"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </section>

    );

}


export default ProfileUser; 