import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import BookingModal from "../pages/BookingModal";
import API from "../../api/axios";
import { useSearch } from "../../context/SearchContext";


// ==================================================
// CITY NORMALIZATION
// ==================================================

const normalizeCity = (city = "") => {
    const value = city.trim().toLowerCase();

    const aliases = {
        bangalore: "Bengaluru",
        bengaluru: "Bengaluru",

        bombay: "Mumbai",
        mumbai: "Mumbai",

        calcutta: "Kolkata",
        kolkata: "Kolkata",

        madras: "Chennai",
        chennai: "Chennai",

        "new delhi": "New Delhi",
        delhi: "Delhi"
    };

    return aliases[value] || city.trim();
};


// ==================================================
// SEARCH PODS COMPONENT
// ==================================================

const SearchPods = () => {

    const { searchCriteria } = useSearch();

    const [pods, setPods] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const [stateFilter, setStateFilter] =
        useState("");

    const [cityFilter, setCityFilter] =
        useState("");

    const [maxPrice, setMaxPrice] =
        useState("");

    const [capacity, setCapacity] =
        useState("");

    const [selectedPod, setSelectedPod] =
        useState(null);

    const [showBookingModal, setShowBookingModal] =
        useState(false);


    // ==================================================
    // FETCH PODS
    // ==================================================

    const fetchPods = async (
        overrideFilters = {}
    ) => {

        try {

            setLoading(true);
            setError("");

            const currentSearchTerm =
                overrideFilters.searchTerm ??
                searchTerm;

            const currentState =
                overrideFilters.state ??
                stateFilter;

            const currentCity =
                overrideFilters.city ??
                cityFilter;

            const currentMaxPrice =
                overrideFilters.maxPrice ??
                maxPrice;

            const currentCapacity =
                overrideFilters.capacity ??
                capacity;


            // ------------------------------------------
            // Build parameters
            // ------------------------------------------

            const params = {};


            // Search term
            if (
                currentSearchTerm &&
                currentSearchTerm.trim()
            ) {
                params.podName =
                    currentSearchTerm.trim();
            }


            // State
            if (
                currentState &&
                currentState.trim()
            ) {
                params.state =
                    currentState.trim();
            }


            // City
            if (
                currentCity &&
                currentCity.trim()
            ) {

                params.city =
                    normalizeCity(
                        currentCity
                    );
            }


            // Maximum price
            if (
                currentMaxPrice !== "" &&
                currentMaxPrice !== null &&
                currentMaxPrice !== undefined
            ) {

                params.maxPrice =
                    currentMaxPrice;
            }


            // Capacity
            if (
                currentCapacity !== "" &&
                currentCapacity !== null &&
                currentCapacity !== undefined
            ) {

                params.capacity =
                    currentCapacity;
            }


            // ------------------------------------------
            // Booking search criteria
            // ------------------------------------------

            const bookingDate =
                searchCriteria?.date || "";

            const bookingTime =
                searchCriteria?.time || "";


            if (
                bookingDate &&
                bookingTime
            ) {

                const [hours, minutes] =
                    bookingTime.split(":");


                if (
                    hours !== undefined &&
                    minutes !== undefined
                ) {

                    const startHour =
                        Number(hours);

                    const startMinute =
                        Number(minutes);


                    if (
                        !Number.isNaN(startHour) &&
                        !Number.isNaN(startMinute)
                    ) {

                        const start =
                            startHour * 60 +
                            startMinute;

                        const end =
                            start + 60;


                        const endHour =
                            Math.floor(
                                end / 60
                            ) % 24;

                        const endMinute =
                            end % 60;


                        params.bookingDate =
                            bookingDate;

                        params.startTime =
                            `${String(
                                startHour
                            ).padStart(2, "0")}:${String(
                                startMinute
                            ).padStart(2, "0")}`;


                        params.endTime =
                            `${String(
                                endHour
                            ).padStart(2, "0")}:${String(
                                endMinute
                            ).padStart(2, "0")}`;
                    }
                }
            }


            // ------------------------------------------
            // DEBUG
            // ------------------------------------------

            console.log(
                "======================================"
            );

            console.log(
                "SEARCH PARAMETERS:",
                JSON.stringify(
                    params,
                    null,
                    2
                )
            );

            console.log(
                "SEARCH CRITERIA:",
                JSON.stringify(
                    searchCriteria,
                    null,
                    2
                )
            );


            // ------------------------------------------
            // API REQUEST
            // ------------------------------------------

            const response =
                await API.get(
                    "/pods/search",
                    {
                        params
                    }
                );


            console.log(
                "SEARCH RESPONSE:",
                JSON.stringify(
                    response.data,
                    null,
                    2
                )
            );


            const resultPods =
                Array.isArray(
                    response.data?.pods
                )
                    ? response.data.pods
                    : [];


            console.log(
                "SEARCH PODS:",
                JSON.stringify(
                    resultPods,
                    null,
                    2
                )
            );

            console.log(
                "SEARCH POD COUNT:",
                resultPods.length
            );


            setPods(resultPods);


        } catch (err) {

            console.error(
                "SEARCH PODS ERROR:",
                err
            );

            setPods([]);

            setError(
                err.response?.data?.message ||
                "Failed to search pods."
            );

        } finally {

            setLoading(false);
        }
    };


    // ==================================================
    // LOAD SEARCH FROM HOME PAGE
    // ==================================================

    useEffect(() => {

        const homeState =
            searchCriteria?.state || "";

        const homeCity =
            searchCriteria?.city || "";


        setStateFilter(
            homeState
        );

        setCityFilter(
            homeCity
        );


        fetchPods({
            state: homeState,
            city: homeCity,
            searchTerm: "",
            maxPrice: "",
            capacity: ""
        });

        // Search criteria is intentionally
        // the trigger for this effect.
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [searchCriteria]);


    // ==================================================
    // MANUAL SEARCH
    // ==================================================

    const handleSearch = () => {

        fetchPods({
            searchTerm,
            state: stateFilter,
            city: cityFilter,
            maxPrice,
            capacity
        });
    };


    // ==================================================
    // RESET SEARCH
    // ==================================================

    const handleReset = () => {

        setSearchTerm("");
        setStateFilter("");
        setCityFilter("");
        setMaxPrice("");
        setCapacity("");

        fetchPods({
            searchTerm: "",
            state: "",
            city: "",
            maxPrice: "",
            capacity: ""
        });
    };


    // ==================================================
    // CITY OPTIONS
    // ==================================================

    const cities = useMemo(() => {

        const uniqueCities =
            [
                ...new Set(
                    pods
                        .map(
                            (pod) =>
                                pod.city
                        )
                        .filter(Boolean)
                )
            ];

        return uniqueCities;

    }, [pods]);


    // ==================================================
    // OPEN BOOKING MODAL
    // ==================================================

    const handleBookPod = (pod) => {

        setSelectedPod(pod);

        setShowBookingModal(true);
    };


    // ==================================================
    // CLOSE BOOKING MODAL
    // ==================================================

    const handleCloseBookingModal = () => {

        setSelectedPod(null);

        setShowBookingModal(false);
    };


    // ==================================================
    // BOOKING SUCCESS
    // ==================================================

    const handleBookingSuccess = () => {

        handleCloseBookingModal();

        fetchPods({
            searchTerm,
            state: stateFilter,
            city: cityFilter,
            maxPrice,
            capacity
        });
    };


    // ==================================================
    // UI
    // ==================================================

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <div className="mx-auto max-w-7xl px-4 py-8">

                {/* =====================================
                    HEADER
                ====================================== */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold">
                        Search Pods
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Find the perfect workspace
                        for your needs.
                    </p>

                </div>


                {/* =====================================
                    SEARCH FILTERS
                ====================================== */}

                <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

                        {/* Search */}

                        <div>

                            <label className="mb-2 block text-sm text-slate-400">
                                Search Pod
                            </label>

                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(
                                        e.target.value
                                    )
                                }
                                placeholder="Pod name"
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                            />

                        </div>


                        {/* State */}

                        <div>

                            <label className="mb-2 block text-sm text-slate-400">
                                State
                            </label>

                            <input
                                type="text"
                                value={stateFilter}
                                onChange={(e) =>
                                    setStateFilter(
                                        e.target.value
                                    )
                                }
                                placeholder="e.g. Karnataka"
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                            />

                        </div>


                        {/* City */}

                        <div>

                            <label className="mb-2 block text-sm text-slate-400">
                                City
                            </label>

                            <input
                                type="text"
                                list="city-options"
                                value={cityFilter}
                                onChange={(e) =>
                                    setCityFilter(
                                        e.target.value
                                    )
                                }
                                placeholder="e.g. Bangalore"
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                            />

                            <datalist id="city-options">

                                {cities.map(
                                    (city) => (
                                        <option
                                            key={city}
                                            value={city}
                                        />
                                    )
                                )}

                            </datalist>

                        </div>


                        {/* Max Price */}

                        <div>

                            <label className="mb-2 block text-sm text-slate-400">
                                Max Hourly Price
                            </label>

                            <input
                                type="number"
                                min="0"
                                value={maxPrice}
                                onChange={(e) =>
                                    setMaxPrice(
                                        e.target.value
                                    )
                                }
                                placeholder="₹"
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                            />

                        </div>


                        {/* Capacity */}

                        <div>

                            <label className="mb-2 block text-sm text-slate-400">
                                Minimum Capacity
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={capacity}
                                onChange={(e) =>
                                    setCapacity(
                                        e.target.value
                                    )
                                }
                                placeholder="People"
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                            />

                        </div>

                    </div>


                    {/* Buttons */}

                    <div className="mt-5 flex flex-wrap gap-3">

                        <button
                            onClick={handleSearch}
                            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
                        >
                            Search Pods
                        </button>


                        <button
                            onClick={handleReset}
                            className="rounded-lg border border-slate-700 px-6 py-3 font-semibold transition hover:bg-slate-800"
                        >
                            Reset
                        </button>

                    </div>

                </div>


                {/* =====================================
                    LOADING
                ====================================== */}

                {loading && (

                    <div className="py-16 text-center">

                        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />

                        <p className="text-slate-400">
                            Searching for pods...
                        </p>

                    </div>

                )}


                {/* =====================================
                    ERROR
                ====================================== */}

                {!loading && error && (

                    <div className="rounded-xl border border-red-800 bg-red-950/30 p-6 text-center">

                        <p className="text-red-400">
                            {error}
                        </p>

                    </div>

                )}


                {/* =====================================
                    NO PODS
                ====================================== */}

                {!loading &&
                    !error &&
                    pods.length === 0 && (

                        <div className="rounded-xl border border-slate-800 bg-slate-900 p-10 text-center">

                            <h2 className="text-xl font-semibold">
                                No pods found
                            </h2>

                            <p className="mt-2 text-slate-400">
                                No pods matched the
                                current search.
                            </p>

                        </div>
                    )}


                {/* =====================================
                    POD GRID
                ====================================== */}

                {!loading &&
                    !error &&
                    pods.length > 0 && (

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {pods.map((pod) => (

                                <div
                                    key={pod._id}
                                    className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg"
                                >

                                    {/* Image */}

                                    <div className="h-48 bg-slate-800">

                                        {pod.images &&
                                        pod.images.length > 0 ? (

                                            <img
                                                src={
                                                    pod.images[0]
                                                }
                                                alt={
                                                    pod.podName
                                                }
                                                className="h-full w-full object-cover"
                                                onError={(
                                                    e
                                                ) => {
                                                    e.currentTarget.style.display =
                                                        "none";
                                                }}
                                            />

                                        ) : (

                                            <div className="flex h-full items-center justify-center text-slate-500">
                                                No Image
                                            </div>

                                        )}

                                    </div>


                                    {/* Content */}

                                    <div className="p-5">

                                        <div className="mb-3">

                                            <h2 className="text-xl font-bold">
                                                {pod.podName}
                                            </h2>

                                            <p className="mt-1 text-sm text-slate-400">
                                                {pod.location},{" "}
                                                {pod.city},{" "}
                                                {pod.state}
                                            </p>

                                        </div>


                                        <p className="mb-4 line-clamp-3 text-sm text-slate-300">
                                            {pod.description}
                                        </p>


                                        {/* Details */}

                                        <div className="mb-5 grid grid-cols-2 gap-3 text-sm">

                                            <div className="rounded-lg bg-slate-800 p-3">

                                                <p className="text-slate-500">
                                                    Hourly
                                                </p>

                                                <p className="font-semibold">
                                                    ₹
                                                    {
                                                        pod.hourlyPrice
                                                    }
                                                    /hr
                                                </p>

                                            </div>


                                            <div className="rounded-lg bg-slate-800 p-3">

                                                <p className="text-slate-500">
                                                    Daily
                                                </p>

                                                <p className="font-semibold">
                                                    ₹
                                                    {
                                                        pod.dayPrice
                                                    }
                                                    /day
                                                </p>

                                            </div>


                                            <div className="rounded-lg bg-slate-800 p-3">

                                                <p className="text-slate-500">
                                                    Capacity
                                                </p>

                                                <p className="font-semibold">
                                                    {
                                                        pod.capacity
                                                    }{" "}
                                                    people
                                                </p>

                                            </div>


                                            <div className="rounded-lg bg-slate-800 p-3">

                                                <p className="text-slate-500">
                                                    Status
                                                </p>

                                                <p className="font-semibold text-green-400">
                                                    {
                                                        pod.status
                                                    }
                                                </p>

                                            </div>

                                        </div>


                                        {/* Amenities */}

                                        {pod.amenities &&
                                            pod.amenities
                                                .length >
                                                0 && (

                                                <div className="mb-5 flex flex-wrap gap-2">

                                                    {pod.amenities.map(
                                                        (
                                                            amenity,
                                                            index
                                                        ) => (

                                                            <span
                                                                key={
                                                                    `${amenity}-${index}`
                                                                }
                                                                className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                                                            >
                                                                {
                                                                    amenity
                                                                }
                                                            </span>

                                                        )
                                                    )}

                                                </div>
                                            )}


                                        {/* Book */}

                                        <button
                                            onClick={() =>
                                                handleBookPod(
                                                    pod
                                                )
                                            }
                                            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold transition hover:bg-blue-500"
                                        >
                                            Book This Pod
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>
                    )}

            </div>


            {/* =====================================
                BOOKING MODAL
            ====================================== */}

            {showBookingModal &&
                selectedPod && (

                    <BookingModal
                        pod={selectedPod}
                        onClose={
                            handleCloseBookingModal
                        }
                        onSuccess={
                            handleBookingSuccess
                        }
                    />

                )}

        </div>
    );
};

export default SearchPods;