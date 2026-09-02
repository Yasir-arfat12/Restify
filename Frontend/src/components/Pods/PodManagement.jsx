import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Plus,
    X,
    ImagePlus,
    MapPin,
    IndianRupee,
    Users,
    Building2
} from "lucide-react";

import API from "../../api/axios";
import { useAuth } from "../../context/authContext";

const initialForm = {
    podName: "",
    description: "",
    location: "",
    city: "",
    state: "",
    hourlyPrice: "",
    dayPrice: "",
    capacity: "1",
    amenities: [],
    images: []
};

const PodManagement = () => {

    const navigate = useNavigate();

    const { user } = useAuth();

    const [formData, setFormData] = useState(initialForm);

    const [amenityInput, setAmenityInput] = useState("");

    const [imageInput, setImageInput] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const addAmenity = () => {

        const value = amenityInput.trim();

        if (!value) return;

        if (formData.amenities.includes(value)) {
            return;
        }

        setFormData((prev) => ({
            ...prev,
            amenities: [
                ...prev.amenities,
                value
            ]
        }));

        setAmenityInput("");
    };

    const removeAmenity = (amenity) => {

        setFormData((prev) => ({
            ...prev,
            amenities: prev.amenities.filter(
                (item) => item !== amenity
            )
        }));
    };

    const addImage = () => {

        const value = imageInput.trim();

        if (!value) return;

        setFormData((prev) => ({
            ...prev,
            images: [
                ...prev.images,
                value
            ]
        }));

        setImageInput("");
    };

    const removeImage = (image) => {

        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter(
                (item) => item !== image
            )
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (
            !formData.podName ||
            !formData.description ||
            !formData.location ||
            !formData.city ||
            !formData.state ||
            !formData.hourlyPrice ||
            !formData.dayPrice
        ) {

            setError(
                "Please fill all required fields."
            );

            return;
        }

        try {

            setLoading(true);

            const payload = {

                podName: formData.podName.trim(),

                description:
                    formData.description.trim(),

                location:
                    formData.location.trim(),

                city:
                    formData.city.trim(),

                state:
                    formData.state.trim(),

                hourlyPrice:
                    Number(formData.hourlyPrice),

                dayPrice:
                    Number(formData.dayPrice),

                capacity:
                    Number(formData.capacity),

                amenities:
                    formData.amenities,

                images:
                    formData.images

            };

            const response = await API.post(
                "/pods/create-pod",
                payload
            );

            console.log(
                "Created pod:",
                response.data
            );

            setSuccess(
                "Pod created successfully!"
            );

            setFormData(initialForm);

            setTimeout(() => {

                navigate("/pods");

            }, 1000);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to create pod."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <section className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-5xl">

                {/* Header */}

                <div className="mb-8">

                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                        {user?.role} dashboard
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                        Create a New Pod
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                        Add a new Restify pod. Once created,
                        it will immediately become available
                        in the customer pod listings.
                    </p>

                </div>

                {/* Messages */}

                {error && (
                    <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">
                        {success}
                    </div>
                )}

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* BASIC DETAILS */}

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-8">

                        <div className="mb-6 flex items-center gap-3">

                            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                                <Building2 className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-white">
                                    Pod Information
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Basic information about the pod
                                </p>
                            </div>

                        </div>

                        <div className="grid gap-5 md:grid-cols-2">

                            <InputField
                                label="Pod Name"
                                name="podName"
                                value={formData.podName}
                                onChange={handleChange}
                                placeholder="Luxury Sleep Pod Bengaluru"
                            />

                            <InputField
                                label="Capacity"
                                name="capacity"
                                type="number"
                                min="1"
                                value={formData.capacity}
                                onChange={handleChange}
                                placeholder="1"
                            />

                            <div className="md:col-span-2">

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Describe the pod, facilities and comfort..."
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />

                            </div>

                        </div>

                    </div>

                    {/* LOCATION */}

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-8">

                        <div className="mb-6 flex items-center gap-3">

                            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                                <MapPin className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-white">
                                    Location
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Where is this pod located?
                                </p>
                            </div>

                        </div>

                        <div className="grid gap-5 md:grid-cols-2">

                            <div className="md:col-span-2">

                                <InputField
                                    label="Full Location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Whitefield, Near Metro Station"
                                />

                            </div>

                            <InputField
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Bangalore"
                            />

                            <InputField
                                label="State"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="Karnataka"
                            />

                        </div>

                    </div>

                    {/* PRICING */}

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-8">

                        <div className="mb-6 flex items-center gap-3">

                            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                                <IndianRupee className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-white">
                                    Pricing
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Set hourly and daily pricing
                                </p>
                            </div>

                        </div>

                        <div className="grid gap-5 md:grid-cols-2">

                            <InputField
                                label="Hourly Price"
                                name="hourlyPrice"
                                type="number"
                                min="0"
                                value={formData.hourlyPrice}
                                onChange={handleChange}
                                placeholder="149"
                            />

                            <InputField
                                label="Day Price"
                                name="dayPrice"
                                type="number"
                                min="0"
                                value={formData.dayPrice}
                                onChange={handleChange}
                                placeholder="799"
                            />

                        </div>

                    </div>

                    {/* AMENITIES */}

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-8">

                        <h2 className="mb-2 font-semibold text-white">
                            Amenities
                        </h2>

                        <p className="mb-5 text-sm text-slate-500">
                            Add facilities available inside the pod.
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row">

                            <input
                                value={amenityInput}
                                onChange={(e) =>
                                    setAmenityInput(e.target.value)
                                }
                                onKeyDown={(e) => {

                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addAmenity();
                                    }

                                }}
                                placeholder="Free WiFi"
                                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                            />

                            <button
                                type="button"
                                onClick={addAmenity}
                                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
                            >
                                <Plus className="h-4 w-4" />
                                Add
                            </button>

                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">

                            {formData.amenities.map(
                                (amenity) => (

                                    <span
                                        key={amenity}
                                        className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-sm text-blue-300"
                                    >
                                        {amenity}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeAmenity(
                                                    amenity
                                                )
                                            }
                                            className="text-blue-400 hover:text-white"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>

                                    </span>

                                )
                            )}

                        </div>

                    </div>

                    {/* IMAGES */}

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-8">

                        <div className="mb-6 flex items-center gap-3">

                            <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                                <ImagePlus className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-white">
                                    Pod Images
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Add image URLs for the pod.
                                </p>
                            </div>

                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">

                            <input
                                value={imageInput}
                                onChange={(e) =>
                                    setImageInput(e.target.value)
                                }
                                placeholder="https://example.com/pod.jpg"
                                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                            />

                            <button
                                type="button"
                                onClick={addImage}
                                className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-500"
                            >
                                <Plus className="h-4 w-4" />
                                Add Image
                            </button>

                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">

                            {formData.images.map(
                                (image) => (

                                    <div
                                        key={image}
                                        className="group relative overflow-hidden rounded-2xl border border-slate-700"
                                    >

                                        <img
                                            src={image}
                                            alt="Pod"
                                            className="h-32 w-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display =
                                                    "none";
                                            }}
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeImage(image)
                                            }
                                            className="absolute right-2 top-2 rounded-full bg-black/70 p-2 text-white opacity-0 transition group-hover:opacity-100"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                    {/* SUBMIT */}

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                        <button
                            type="button"
                            onClick={() => navigate("/pods")}
                            className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-300 hover:bg-slate-900"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus className="h-5 w-5" />
                                    Create Pod
                                </>
                            )}
                        </button>

                    </div>

                </form>

            </div>

        </section>
    );
};

const InputField = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    min
}) => {

    return (
        <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
                {label}
            </label>

            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                min={min}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

        </div>
    );
};

export default PodManagement;