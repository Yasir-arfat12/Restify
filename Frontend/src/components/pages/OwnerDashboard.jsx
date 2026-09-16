import React, {
    useEffect,
    useState
} from "react";

import { useNavigate } from "react-router-dom";

import API from "../../api/axios";

import { useAuth } from "../../context/authContext";


const OwnerDashboard = () => {

    const navigate = useNavigate();

    const { user } = useAuth();

    const [pods, setPods] = useState([]);

    const [bookings, setBookings] = useState([]);

    const [earnings, setEarnings] = useState({
        totalEarnings: 0,
        totalBookings: 0,
        completedBookings: 0,
        confirmedBookings: 0,
        pendingBookings: 0
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // LOAD OWNER DASHBOARD
    // =====================================================

    const loadOwnerDashboard = async () => {

        try {

            setLoading(true);

            setError("");


            const [
                podsResponse,
                bookingsResponse,
                earningsResponse
            ] = await Promise.all([

                API.get("/pods/myPods"),

                API.get("/bookings/owner-bookings"),

                API.get("/bookings/owner-earnings")

            ]);


            // ------------------------------------------------
            // OWNER PODS
            // ------------------------------------------------

            if (
                podsResponse.data?.success &&
                Array.isArray(
                    podsResponse.data.pods
                )
            ) {

                setPods(
                    podsResponse.data.pods
                );

            }


            // ------------------------------------------------
            // OWNER BOOKINGS
            // ------------------------------------------------

            if (
                bookingsResponse.data?.success &&
                Array.isArray(
                    bookingsResponse.data.bookings
                )
            ) {

                setBookings(
                    bookingsResponse.data.bookings
                );

            }


            // ------------------------------------------------
            // OWNER EARNINGS
            // ------------------------------------------------

            if (
                earningsResponse.data?.success
            ) {

                setEarnings(
                    earningsResponse.data.earnings
                );

            }

        } catch (error) {

            console.error(
                "OWNER DASHBOARD ERROR:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load owner dashboard."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        if (
            user &&
            user.role === "owner"
        ) {

            loadOwnerDashboard();

        }

    }, [user]);


    // =====================================================
    // ACCESS CHECK
    // =====================================================

    if (
        user &&
        user.role !== "owner"
    ) {

        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

                <div className="text-center">

                    <h1 className="text-3xl font-bold text-white">
                        Access Denied
                    </h1>

                    <p className="mt-3 text-slate-400">
                        This dashboard is available only to pod owners.
                    </p>

                </div>

            </div>
        );

    }


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <section className="min-h-screen bg-slate-950 px-6 py-12">

                <div className="mx-auto max-w-7xl">

                    <div className="animate-pulse">

                        <div className="h-10 w-72 rounded bg-slate-800" />

                        <div className="mt-4 h-5 w-96 rounded bg-slate-800" />

                        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">

                            {[1, 2, 3].map(
                                item => (
                                    <div
                                        key={item}
                                        className="h-32 rounded-3xl bg-slate-900"
                                    />
                                )
                            )}

                        </div>

                    </div>

                </div>

            </section>
        );

    }


    return (

        <section className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-10">

            <div className="mx-auto max-w-7xl">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

                    <div>

                        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                            OWNER DASHBOARD
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                            Welcome, {user?.name}
                        </h1>

                        <p className="mt-2 text-slate-400">
                            Manage your pods, bookings and earnings.
                        </p>

                    </div>


                    <button
                        onClick={() =>
                            navigate("/pod-management")
                        }
                        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
                    >
                        Manage My Pods
                    </button>

                </div>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-5">

                        <p className="text-red-400">
                            {error}
                        </p>

                        <button
                            onClick={loadOwnerDashboard}
                            className="mt-4 rounded-lg bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300"
                        >
                            Try Again
                        </button>

                    </div>

                )}


                {/* =================================================
                    STATISTICS
                ================================================= */}

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">


                    {/* EARNINGS */}

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

                        <p className="text-sm text-slate-400">
                            Total Earnings
                        </p>

                        <p className="mt-3 text-3xl font-bold text-blue-400">
                            ₹{Number(
                                earnings.totalEarnings || 0
                            ).toFixed(2)}
                        </p>

                    </div>


                    {/* PODS */}

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

                        <p className="text-sm text-slate-400">
                            My Pods
                        </p>

                        <p className="mt-3 text-3xl font-bold text-white">
                            {pods.length}
                        </p>

                    </div>


                    {/* BOOKINGS */}

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

                        <p className="text-sm text-slate-400">
                            Total Bookings
                        </p>

                        <p className="mt-3 text-3xl font-bold text-white">
                            {earnings.totalBookings}
                        </p>

                    </div>


                    {/* COMPLETED */}

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

                        <p className="text-sm text-slate-400">
                            Completed
                        </p>

                        <p className="mt-3 text-3xl font-bold text-green-400">
                            {earnings.completedBookings}
                        </p>

                    </div>

                </div>


                {/* =================================================
                    MY PODS
                ================================================= */}

                <div className="mt-12">

                    <div className="flex items-center justify-between">

                        <div>

                            <h2 className="text-2xl font-bold text-white">
                                My Pods
                            </h2>

                            <p className="mt-1 text-sm text-slate-400">
                                Pods owned by you.
                            </p>

                        </div>

                    </div>


                    {pods.length === 0 ? (

                        <div className="mt-5 rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 p-10 text-center">

                            <p className="text-4xl">
                                🏕️
                            </p>

                            <h3 className="mt-4 text-xl font-bold text-white">
                                No pods yet
                            </h3>

                            <p className="mt-2 text-slate-400">
                                Add your first pod to start receiving bookings.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/pod-management")
                                }
                                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
                            >
                                Create Pod
                            </button>

                        </div>

                    ) : (

                        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

                            {pods.map(
                                pod => (

                                    <div
                                        key={pod._id}
                                        className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900"
                                    >

                                        {pod.images?.[0] ? (

                                            <img
                                                src={pod.images[0]}
                                                alt={pod.podName}
                                                className="h-48 w-full object-cover"
                                            />

                                        ) : (

                                            <div className="flex h-48 items-center justify-center bg-slate-800 text-5xl">
                                                🏕️
                                            </div>

                                        )}


                                        <div className="p-5">

                                            <h3 className="text-xl font-bold text-white">
                                                {pod.podName}
                                            </h3>

                                            <p className="mt-2 text-sm text-slate-400">
                                                📍 {pod.location}
                                            </p>

                                            <p className="mt-3 font-semibold text-blue-400">
                                                ₹{pod.hourlyPrice}/hour
                                            </p>

                                            <span className="mt-4 inline-block rounded-full bg-green-400/10 px-3 py-1 text-xs font-semibold text-green-400">
                                                {pod.status}
                                            </span>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>


                {/* =================================================
                    BOOKINGS
                ================================================= */}

                <div className="mt-12">

                    <h2 className="text-2xl font-bold text-white">
                        Recent Bookings
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                        Customers who booked your pods.
                    </p>


                    {bookings.length === 0 ? (

                        <div className="mt-5 rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">

                            <p className="text-slate-400">
                                No bookings yet.
                            </p>

                        </div>

                    ) : (

                        <div className="mt-5 space-y-4">

                            {bookings.map(
                                booking => (

                                    <div
                                        key={booking._id}
                                        className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                                    >

                                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                                            <div>

                                                <h3 className="font-bold text-white">
                                                    {booking.pod?.podName || "Pod"}
                                                </h3>

                                                <p className="mt-1 text-sm text-slate-400">
                                                    Customer: {booking.customer?.name || "Customer"}
                                                </p>

                                                <p className="mt-1 text-sm text-slate-400">
                                                    {booking.bookingDate
                                                        ? new Date(
                                                            booking.bookingDate
                                                        ).toLocaleDateString()
                                                        : "Date unavailable"
                                                    }

                                                    {" • "}

                                                    {booking.startTime}
                                                    {" → "}
                                                    {booking.endTime}

                                                </p>

                                            </div>


                                            <div className="text-left md:text-right">

                                                <p className="text-lg font-bold text-blue-400">
                                                    ₹{Number(
                                                        booking.subtotal || 0
                                                    ).toFixed(2)}
                                                </p>

                                                <span className="mt-2 inline-block rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-400">
                                                    {booking.bookingStatus}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </div>

        </section>
    );
};


export default OwnerDashboard;