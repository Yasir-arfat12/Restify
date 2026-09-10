import React, { useState } from "react";
import API from "../../api/axios";

function BookingModal({ pod, onClose, onBookingSuccess }) {
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const calculateDuration = () => {
    if (!startTime || !endTime) return 0;

    const start = Number(startTime.split(":")[0]);
    const end = Number(endTime.split(":")[0]);

    return end > start ? end - start : 0;
  };

  const duration = calculateDuration();
  const estimatedSubtotal = duration * Number(pod.hourlyPrice || 0);
  const estimatedGST = estimatedSubtotal * 0.05;
  const estimatedTotal = estimatedSubtotal + estimatedGST + 10;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!bookingDate || !startTime || !endTime) {
      setError("Please select the date, start time, and end time.");
      return;
    }

    if (duration <= 0) {
      setError("End time must be greater than start time.");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/bookings", {
        podId: pod._id,
        bookingDate,
        startTime,
        endTime,
      });

      setSuccess("Booking created successfully.");

      if (onBookingSuccess) {
        onBookingSuccess(response.data);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to create booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Book Pod</h2>
            <p className="text-sm text-gray-500">{pod.podName}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Booking date
            </label>

            <input
              type="date"
              value={bookingDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(event) => setBookingDate(event.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Start time
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className="w-full rounded-lg border px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                End time
              </label>

              <input
                type="time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                className="w-full rounded-lg border px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <div className="flex justify-between text-sm">
              <span>Hourly price</span>
              <span>₹{pod.hourlyPrice}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Duration</span>
              <span>{duration} hour(s)</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{estimatedSubtotal}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>GST</span>
              <span>₹{estimatedGST.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Platform fee</span>
              <span>₹10</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between font-semibold">
              <span>Estimated total</span>
              <span>₹{estimatedTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || Boolean(success)}
              className="rounded-lg bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Booking..." : "Confirm booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;