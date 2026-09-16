import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import OwnerDashboard from "./OwnerDashboard";
import API from "../../api/axios";

function ProfileUser() {

    const navigate = useNavigate();

    const {
        user,
        logout,
        loading: authLoading
    } = useAuth();

    if (user?.role === "owner") {
    return <OwnerDashboard />;
}
    // =====================================================
    // BOOKING STATE
    // =====================================================

    const [bookings, setBookings] = useState([]);

    const [loadingBookings, setLoadingBookings] = useState(true);

    const [bookingError, setBookingError] = useState("");

    const [cancellingId, setCancellingId] = useState(null);


    // =====================================================
    // FETCH CUSTOMER BOOKINGS
    // =====================================================

    const fetchBookings = async () => {

        try {

            setLoadingBookings(true);

            setBookingError("");


            const response = await API.get(
                "/bookings/my-bookings"
            );


            if (
                response.data?.success &&
                Array.isArray(response.data.bookings)
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
    // LOAD BOOKINGS WHEN USER IS AVAILABLE
    // =====================================================

    useEffect(() => {

        if (
            user &&
            user.role === "customer"
        ) {

            fetchBookings();

        }

    }, [user]);


    // =====================================================
    // CANCEL BOOKING
    // =====================================================

    const handleCancelBooking = async (bookingId) => {

        const confirmed = window.confirm(
            "Are you sure you want to cancel this booking?"
        );


        if (!confirmed) {

            return;

        }


        try {

            setCancellingId(bookingId);


            await API.patch(
                `/bookings/${bookingId}/cancel`
            );


            // Refresh booking list

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

            <section className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

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

                <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center">

                    <h1 className="text-3xl font-bold text-white">

                        Login Required

                    </h1>


                    <p className="text-slate-400 mt-3">

                        Please login to view your bookings.

                    </p>


                    <button
                        onClick={() =>
                            navigate("/login")
                        }
                        className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold transition"
                    >

                        Login

                    </button>

                </div>

            </section>

        );

    }


    // =====================================================
    // PROFILE USER PAGE
    // =====================================================

    return (

        <section className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-10">

            <div className="mx-auto max-w-6xl">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="mb-10">

                    <p className="text-blue-400 text-sm font-semibold tracking-widest">

                        MY BOOKINGS

                    </p>


                    <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <h1 className="text-3xl sm:text-4xl font-bold text-white">

                                Welcome, {user.name}

                            </h1>


                            <p className="mt-2 text-slate-400">

                                View and manage all your Restify bookings.

                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate("/searchpods")
                            }
                            className="w-full sm:w-auto rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                        >

                            Book Another Pod

                        </button>

                    </div>

                </div>


                {/* =================================================
                    SUMMARY
                ================================================= */}

                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">


                    {/* TOTAL BOOKINGS */}

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                        <p className="text-sm text-slate-400">

                            Total Bookings

                        </p>


                        <p className="mt-2 text-3xl font-bold text-white">

                            {bookings.length}

                        </p>

                    </div>


                    {/* ACTIVE BOOKINGS */}

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                        <p className="text-sm text-slate-400">

                            Active Bookings

                        </p>


                        <p className="mt-2 text-3xl font-bold text-blue-400">

                            {
                                bookings.filter(
                                    (booking) =>
                                        booking.bookingStatus ===
                                            "Pending" ||
                                        booking.bookingStatus ===
                                            "Confirmed"
                                ).length
                            }

                        </p>

                    </div>


                    {/* COMPLETED */}

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                        <p className="text-sm text-slate-400">

                            Completed

                        </p>


                        <p className="mt-2 text-3xl font-bold text-green-400">

                            {
                                bookings.filter(
                                    (booking) =>
                                        booking.bookingStatus ===
                                        "Completed"
                                ).length
                            }

                        </p>

                    </div>

                </div>


                {/* =================================================
                    ERROR
                ================================================= */}

                {bookingError && (

                    <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-5">

                        <p className="text-red-400">

                            {bookingError}

                        </p>


                        <button
                            onClick={fetchBookings}
                            className="mt-4 rounded-lg bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/30"
                        >

                            Try Again

                        </button>

                    </div>

                )}


                {/* =================================================
                    LOADING BOOKINGS
                ================================================= */}

                {loadingBookings && (

                    <div className="space-y-6">

                        {[1, 2].map((item) => (

                            <div
                                key={item}
                                className="animate-pulse rounded-3xl border border-slate-800 bg-slate-900 p-6"
                            >

                                <div className="h-6 w-1/3 rounded bg-slate-800" />

                                <div className="mt-5 h-4 w-1/2 rounded bg-slate-800" />

                                <div className="mt-3 h-4 w-1/3 rounded bg-slate-800" />

                                <div className="mt-6 h-12 w-full rounded bg-slate-800" />

                            </div>

                        ))}

                    </div>

                )}


                {/* =================================================
                    NO BOOKINGS
                ================================================= */}

                {!loadingBookings &&
                    !bookingError &&
                    bookings.length === 0 && (

                        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/70 px-6 py-16 text-center">

                            <div className="text-5xl">

                                🏕️

                            </div>


                            <h2 className="mt-5 text-2xl font-bold text-white">

                                No bookings yet

                            </h2>


                            <p className="mx-auto mt-3 max-w-md text-slate-400">

                                You haven't booked a pod yet. Find a pod and make your first booking.

                            </p>


                            <button
                                onClick={() =>
                                    navigate("/searchpods")
                                }
                                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
                            >

                                Explore Pods

                            </button>

                        </div>

                    )}


                {/* =================================================
                    BOOKINGS
                ================================================= */}

                {!loadingBookings &&
                    bookings.length > 0 && (

                        <div className="space-y-6">

                            {bookings.map((booking) => {

                                const pod = booking.pod;


                                const bookingDate = booking.bookingDate
                                    ? new Date(
                                          booking.bookingDate
                                      ).toLocaleDateString(
                                          "en-IN",
                                          {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric"
                                          }
                                      )
                                    : "Date unavailable";


                                const createdDate = booking.createdAt
                                    ? new Date(
                                          booking.createdAt
                                      ).toLocaleDateString(
                                          "en-IN",
                                          {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric"
                                          }
                                      )
                                    : "";


                                const isActive =
                                    booking.bookingStatus ===
                                        "Pending" ||
                                    booking.bookingStatus ===
                                        "Confirmed";


                                return (

                                    <article
                                        key={booking._id}
                                        className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl"
                                    >

                                        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">


                                            {/* =================================================
                                                POD IMAGE
                                            ================================================= */}

                                            <div className="h-56 lg:h-full min-h-[240px] bg-slate-800">

                                                {pod?.images?.[0] ? (

                                                    <img
                                                        src={
                                                            pod.images[0]
                                                        }
                                                        alt={
                                                            pod.podName ||
                                                            "Restify pod"
                                                        }
                                                        className="h-full w-full object-cover"
                                                        onError={(
                                                            event
                                                        ) => {

                                                            event.currentTarget.style.display =
                                                                "none";

                                                        }}
                                                    />

                                                ) : (

                                                    <div className="flex h-full items-center justify-center text-6xl">

                                                        🏕️

                                                    </div>

                                                )}

                                            </div>


                                            {/* =================================================
                                                BOOKING DETAILS
                                            ================================================= */}

                                            <div className="p-6 sm:p-7">

                                                {/* TOP ROW */}

                                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                                    <div>

                                                        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">

                                                            Booking

                                                        </p>


                                                        <h2 className="mt-1 text-2xl font-bold text-white">

                                                            {pod?.podName ||
                                                                "Pod unavailable"}

                                                        </h2>


                                                        <p className="mt-2 text-sm text-slate-400">

                                                            📍{" "}

                                                            {pod?.location ||
                                                                pod?.city ||
                                                                "Location unavailable"}

                                                        </p>

                                                    </div>


                                                    {/* STATUS */}

                                                    <span
                                                        className={`w-fit rounded-full px-4 py-2 text-xs font-bold ${
                                                            booking.bookingStatus ===
                                                            "Confirmed"

                                                                ? "bg-green-400/10 text-green-400 border border-green-400/20"

                                                                : booking.bookingStatus ===
                                                                  "Pending"

                                                                ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"

                                                                : booking.bookingStatus ===
                                                                  "Cancelled"

                                                                ? "bg-red-400/10 text-red-400 border border-red-400/20"

                                                                : "bg-blue-400/10 text-blue-400 border border-blue-400/20"
                                                        }`}
                                                    >

                                                        {
                                                            booking.bookingStatus
                                                        }

                                                    </span>

                                                </div>


                                                {/* DIVIDER */}

                                                <div className="my-6 h-px bg-slate-800" />


                                                {/* BOOKING INFO */}

                                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">


                                                    {/* DATE */}

                                                    <div>

                                                        <p className="text-xs uppercase tracking-wider text-slate-500">

                                                            Date

                                                        </p>


                                                        <p className="mt-2 font-semibold text-white">

                                                            {bookingDate}

                                                        </p>

                                                    </div>


                                                    {/* TIME */}

                                                    <div>

                                                        <p className="text-xs uppercase tracking-wider text-slate-500">

                                                            Time

                                                        </p>


                                                        <p className="mt-2 font-semibold text-white">

                                                            {booking.startTime}

                                                            {" → "}

                                                            {booking.endTime}

                                                        </p>

                                                    </div>


                                                    {/* DURATION */}

                                                    <div>

                                                        <p className="text-xs uppercase tracking-wider text-slate-500">

                                                            Duration

                                                        </p>


                                                        <p className="mt-2 font-semibold text-white">

                                                            {booking.duration}

                                                            {" "}

                                                            {Number(
                                                                booking.duration
                                                            ) === 1
                                                                ? "hour"
                                                                : "hours"}

                                                        </p>

                                                    </div>


                                                    {/* TOTAL */}

                                                    <div>

                                                        <p className="text-xs uppercase tracking-wider text-slate-500">

                                                            Amount

                                                        </p>


                                                        <p className="mt-2 text-lg font-bold text-blue-400">

                                                            ₹
                                                            {Number(
                                                                booking.subtotal ||
                                                                0
                                                            ).toFixed(2)}

                                                        </p>

                                                    </div>

                                                </div>


                                                {/* PAYMENT */}

                                                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">

                                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                                        <div>

                                                            <p className="text-sm font-semibold text-white">

                                                                Payment Status

                                                            </p>


                                                            <p className="mt-1 text-xs text-slate-400">

                                                                Invoice and payment details will be available after payment integration.

                                                            </p>

                                                        </div>


                                                        <span
                                                            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                                                                booking.paymentStatus ===
                                                                "Paid"

                                                                    ? "bg-green-400/10 text-green-400"

                                                                    : booking.paymentStatus ===
                                                                      "Refunded"

                                                                    ? "bg-purple-400/10 text-purple-400"

                                                                    : "bg-yellow-400/10 text-yellow-400"
                                                            }`}
                                                        >

                                                            {
                                                                booking.paymentStatus
                                                            }

                                                        </span>

                                                    </div>

                                                </div>


                                                {/* BOTTOM */}

                                                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                                    <div className="text-xs text-slate-500">

                                                        {createdDate
                                                            ? `Booked on ${createdDate}`
                                                            : `Booking ID: ${booking._id}`}

                                                    </div>


                                                    {isActive && (

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
                                                            className="rounded-xl border border-red-500/40 px-5 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >

                                                            {cancellingId ===
                                                            booking._id

                                                                ? "Cancelling..."

                                                                : "Cancel Booking"}

                                                        </button>

                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    </article>

                                );

                            })}

                        </div>

                    )}


                {/* =================================================
                    LOGOUT
                ================================================= */}

                <div className="mt-10 border-t border-slate-800 pt-8">

                    <button
                        onClick={handleLogout}
                        className="rounded-xl border border-red-500/40 px-6 py-3 font-semibold text-red-400 transition hover:bg-red-500/10"
                    >

                        Logout

                    </button>

                </div>

            </div>

        </section>

    );

}


export default ProfileUser;