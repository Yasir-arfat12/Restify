import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const PartnerApply = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        businessName: "",
        ownerName: "",
        email: "",
        phone: "",
        address: "",
        description: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            setMessage("");

            // This endpoint must exist in your backend.
            await axios.post("/partners/apply", formData);

            setMessage(
                "Your partner application has been submitted successfully."
            );

            setFormData({
                businessName: "",
                ownerName: "",
                email: "",
                phone: "",
                address: "",
                description: ""
            });
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Unable to submit the application. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-slate-950 px-4 py-12 text-white">
            <div className="mx-auto max-w-3xl">

                <button
                    onClick={() => navigate("/")}
                    className="mb-8 text-blue-400 hover:text-blue-300"
                >
                    ← Back to Home
                </button>

                <div className="mb-8">
                    <p className="text-sm font-medium tracking-wide text-blue-400">
                        PARTNER WITH RESTIFY
                    </p>

                    <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                        Become a Partner
                    </h1>

                    <p className="mt-3 text-slate-400">
                        Tell us about your business and we will contact you
                        about listing your rest pods on Restify.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900 p-6 md:p-10"
                >
                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Business Name
                        </label>

                        <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                            placeholder="Enter your business name"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Owner Name
                        </label>

                        <input
                            type="text"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm text-slate-300">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-slate-300">
                                Phone
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                                placeholder="Enter phone number"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Business Address
                        </label>

                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                            placeholder="Enter business address"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            About Your Business
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={5}
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                            placeholder="Describe your business and available pods"
                        />
                    </div>

                    {message && (
                        <p className="rounded-xl bg-slate-950 p-4 text-sm text-blue-300">
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Submitting..." : "Submit Application"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default PartnerApply;