import React, { useState } from "react";
import { X, CalendarDays, Clock, Loader2 } from "lucide-react";

import API from "../../api/axios";


const BookingModal = ({
    pod,
    onClose,
    onBookingSuccess
}) => {

    const [bookingDate, setBookingDate] =
        useState("");

    const [startTime, setStartTime] =
        useState("");

    const [endTime, setEndTime] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    // ------------------------------------------------
    // Calculate duration
    // ------------------------------------------------

    const calculateDuration = () => {

        if (
            !startTime ||
            !endTime
        ) {
            return 0;
        }


        const [startHour, startMinute] =
            startTime.split(":").map(Number);

        const [endHour, endMinute] =
            endTime.split(":").map(Number);


        const start =
            startHour * 60 +
            startMinute;

        const end =
            endHour * 60 +
            endMinute;


        if (end <= start) {
            return 0;
        }


        return (end - start) / 60;
    };


    const duration =
        calculateDuration();


    const subtotal =
        duration *
        Number(pod?.hourlyPrice || 0);


    // ------------------------------------------------
    // Submit booking
    // ------------------------------------------------

    const handleBooking = async (e) => {

        e.preventDefault();

        setError("");


        if (
            !bookingDate ||
            !startTime ||
            !endTime
        ) {

            setError(
                "Please select date, start time and end time."
            );

            return;
        }


        if (duration <= 0) {

            setError(
                "End time must be greater than start time."
            );

            return;
        }


        try {

            setLoading(true);


            const response =
                await API.post("/bookings",
                    {
                        podId: pod._id,
                        bookingDate,
                        startTime,
                        endTime
                    }
                );


            if (
                response.data?.success
            ) {

                if (onBookingSuccess) {

                    onBookingSuccess(
                        response.data
                    );

                }

                onClose();

            } else {

                setError(
                    response.data?.message ||
                    "Unable to create booking."
                );

            }


        } catch (error) {

            console.error(
                "Booking error:",
                error
            );


            if (
                error.response?.status === 409
            ) {

                setError(
                    "This pod is already booked for the selected time. Please choose another time."
                );

            } else {

                setError(
                    error.response?.data?.message ||
                    "Something went wrong while creating your booking."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // ------------------------------------------------
    // Minimum selectable date
    // ------------------------------------------------

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    return (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/70
                backdrop-blur-sm
                p-4
            "
        >

            <div
                className="
                    w-full
                    max-w-lg
                    rounded-3xl
                    border
                    border-blue-500/20
                    bg-[#071426]
                    shadow-2xl
                    overflow-hidden
                "
            >

                {/* -------------------------------- */}
                {/* Header */}
                {/* -------------------------------- */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-white/10
                        px-6
                        py-5
                    "
                >

                    <div>

                        <p
                            className="
                                text-sm
                                text-blue-400
                                font-medium
                            "
                        >
                            Book your pod
                        </p>

                        <h2
                            className="
                                mt-1
                                text-xl
                                font-bold
                                text-white
                            "
                        >
                            {pod?.podName}
                        </h2>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-full
                            p-2
                            text-gray-400
                            transition
                            hover:bg-white/10
                            hover:text-white
                        "
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* -------------------------------- */}
                {/* Form */}
                {/* -------------------------------- */}

                <form
                    onSubmit={handleBooking}
                    className="p-6 space-y-5"
                >

                    {/* Date */}

                    <div>

                        <label
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-gray-300
                            "
                        >
                            Booking Date
                        </label>

                        <div className="relative">

                            <CalendarDays
                                size={18}
                                className="
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-blue-400
                                "
                            />

                            <input
                                type="date"
                                min={today}
                                value={bookingDate}
                                onChange={(e) =>
                                    setBookingDate(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-[#0b1e3c]
                                    px-10
                                    py-3
                                    text-white
                                    outline-none
                                    focus:border-blue-500
                                "
                            />

                        </div>

                    </div>


                    {/* Time */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            gap-4
                        "
                    >

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-300
                                "
                            >
                                Start Time
                            </label>

                            <div className="relative">

                                <Clock
                                    size={18}
                                    className="
                                        absolute
                                        left-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-blue-400
                                    "
                                />

                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) =>
                                        setStartTime(
                                            e.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-[#0b1e3c]
                                        px-10
                                        py-3
                                        text-white
                                        outline-none
                                        focus:border-blue-500
                                    "
                                />

                            </div>

                        </div>


                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-300
                                "
                            >
                                End Time
                            </label>

                            <div className="relative">

                                <Clock
                                    size={18}
                                    className="
                                        absolute
                                        left-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-blue-400
                                    "
                                />

                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) =>
                                        setEndTime(
                                            e.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-[#0b1e3c]
                                        px-10
                                        py-3
                                        text-white
                                        outline-none
                                        focus:border-blue-500
                                    "
                                />

                            </div>

                        </div>

                    </div>


                    {/* -------------------------------- */}
                    {/* Price Summary */}
                    {/* -------------------------------- */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-blue-500/20
                            bg-[#0b1e3c]/70
                            p-4
                        "
                    >

                        <div
                            className="
                                flex
                                justify-between
                                text-sm
                                text-gray-400
                            "
                        >

                            <span>
                                Hourly price
                            </span>

                            <span>
                                ₹{pod?.hourlyPrice || 0}/hr
                            </span>

                        </div>


                        <div
                            className="
                                mt-2
                                flex
                                justify-between
                                text-sm
                                text-gray-400
                            "
                        >

                            <span>
                                Duration
                            </span>

                            <span>
                                {duration > 0
                                    ? `${duration} hr`
                                    : "--"}
                            </span>

                        </div>


                        <div
                            className="
                                mt-4
                                border-t
                                border-white/10
                                pt-4
                                flex
                                justify-between
                                text-white
                                font-semibold
                            "
                        >

                            <span>
                                Estimated subtotal
                            </span>

                            <span>
                                ₹{subtotal.toFixed(2)}
                            </span>

                        </div>

                    </div>


                    {/* -------------------------------- */}
                    {/* Error */}
                    {/* -------------------------------- */}

                    {error && (

                        <div
                            className="
                                rounded-xl
                                border
                                border-red-500/20
                                bg-red-500/10
                                px-4
                                py-3
                                text-sm
                                text-red-300
                            "
                        >
                            {error}
                        </div>

                    )}


                    {/* -------------------------------- */}
                    {/* Buttons */}
                    {/* -------------------------------- */}

                    <div
                        className="
                            flex
                            flex-col-reverse
                            sm:flex-row
                            gap-3
                        "
                    >

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                px-5
                                py-3
                                text-gray-300
                                transition
                                hover:bg-white/5
                            "
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                rounded-xl
                                bg-blue-600
                                px-5
                                py-3
                                font-semibold
                                text-white
                                transition
                                hover:bg-blue-500
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >

                            {loading ? (

                                <span
                                    className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                    "
                                >

                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />

                                    Booking...

                                </span>

                            ) : (

                                "Confirm Booking"

                            )}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};


export default BookingModal;