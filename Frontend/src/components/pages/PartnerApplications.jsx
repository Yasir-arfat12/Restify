import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const PartnerApplications = () => {

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [actionLoading, setActionLoading] =
        useState(null);


    // ==================================================
    // FETCH APPLICATIONS
    // ==================================================

    const fetchApplications = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await API.get(
                    "/partners/applications"
                );


            setApplications(
                response.data.applications || []
            );

        } catch (error) {

            console.error(
                "Partner applications error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load partner applications."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchApplications();

    }, []);


    // ==================================================
    // APPROVE
    // ==================================================

    const approveApplication = async (id) => {

        try {

            setActionLoading(id);

            await API.patch(
                `/partners/${id}/approve`
            );


            // Refresh list
            await fetchApplications();

        } catch (error) {

            console.error(
                "Approve application error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to approve application."
            );

        } finally {

            setActionLoading(null);

        }

    };


    // ==================================================
    // REJECT
    // ==================================================

    const rejectApplication = async (id) => {

        try {

            setActionLoading(id);

            await API.patch(
                `/partners/${id}/reject`
            );


            await fetchApplications();

        } catch (error) {

            console.error(
                "Reject application error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to reject application."
            );

        } finally {

            setActionLoading(null);

        }

    };


    // ==================================================
    // LOADING
    // ==================================================

    if (loading) {

        return (

            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

                <p className="text-lg">
                    Loading partner applications...
                </p>

            </div>

        );

    }


    // ==================================================
    // UI
    // ==================================================

    return (

        <div className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 lg:px-10 py-10">

            <div className="max-w-7xl mx-auto">


                {/* HEADER */}

                <div className="mb-8">

                    <p className="text-cyan-400 uppercase tracking-[0.25em] text-sm font-semibold">
                        Admin
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-bold mt-2">
                        Partner Applications
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Review property owners who want to join Restify.
                    </p>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">

                        {error}

                    </div>

                )}


                {/* EMPTY */}

                {!error &&
                    applications.length === 0 && (

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">

                            <h2 className="text-xl font-semibold">
                                No partner applications
                            </h2>

                            <p className="text-slate-400 mt-2">
                                New partner applications will appear here.
                            </p>

                        </div>

                    )}


                {/* APPLICATIONS */}

                <div className="grid gap-6">

                    {applications.map(
                        (application) => (

                            <div
                                key={application._id}
                                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6"
                            >


                                {/* TOP */}

                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">


                                    <div>

                                        <h2 className="text-xl sm:text-2xl font-semibold">

                                            {application.businessName}

                                        </h2>

                                        <p className="text-slate-400 mt-1">

                                            Owner:{" "}

                                            <span className="text-white">

                                                {application.ownerName}

                                            </span>

                                        </p>

                                    </div>


                                    {/* STATUS */}

                                    <span
                                        className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium ${
                                            application.status ===
                                            "Approved"

                                                ? "bg-emerald-500/15 text-emerald-400"

                                                : application.status ===
                                                  "Rejected"

                                                ? "bg-red-500/15 text-red-400"

                                                : "bg-yellow-500/15 text-yellow-400"
                                        }`}
                                    >

                                        {application.status}

                                    </span>

                                </div>


                                {/* DETAILS */}

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">


                                    <div>

                                        <p className="text-xs uppercase tracking-wider text-slate-500">
                                            Email
                                        </p>

                                        <p className="mt-1 text-slate-200 break-all">
                                            {application.email}
                                        </p>

                                    </div>


                                    <div>

                                        <p className="text-xs uppercase tracking-wider text-slate-500">
                                            Phone
                                        </p>

                                        <p className="mt-1 text-slate-200">
                                            {application.phone}
                                        </p>

                                    </div>


                                    <div>

                                        <p className="text-xs uppercase tracking-wider text-slate-500">
                                            Address
                                        </p>

                                        <p className="mt-1 text-slate-200">
                                            {application.address}
                                        </p>

                                    </div>

                                </div>


                                {/* DESCRIPTION */}

                                {application.description && (

                                    <div className="mt-6">

                                        <p className="text-xs uppercase tracking-wider text-slate-500">
                                            Property Description
                                        </p>

                                        <p className="text-slate-300 mt-2 leading-relaxed">
                                            {application.description}
                                        </p>

                                    </div>

                                )}


                                {/* USER */}

                                {application.user && (

                                    <div className="mt-6 rounded-xl bg-black/20 p-4">

                                        <p className="text-xs uppercase tracking-wider text-slate-500">
                                            Restify Account
                                        </p>

                                        <p className="mt-1 text-slate-200">

                                            {application.user.name}

                                        </p>

                                        <p className="text-sm text-slate-400">

                                            {application.user.email}

                                        </p>

                                    </div>

                                )}


                                {/* ACTIONS */}

                                {application.status ===
                                    "Pending" && (

                                    <div className="flex flex-col sm:flex-row gap-3 mt-6">


                                        <button
                                            onClick={() =>
                                                approveApplication(
                                                    application._id
                                                )
                                            }
                                            disabled={
                                                actionLoading ===
                                                application._id
                                            }
                                            className="flex-1 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
                                        >

                                            {actionLoading ===
                                            application._id
                                                ? "Processing..."
                                                : "Approve & Make Owner"}

                                        </button>


                                        <button
                                            onClick={() =>
                                                rejectApplication(
                                                    application._id
                                                )
                                            }
                                            disabled={
                                                actionLoading ===
                                                application._id
                                            }
                                            className="flex-1 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 font-semibold text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
                                        >

                                            Reject

                                        </button>

                                    </div>

                                )}

                            </div>

                        )
                    )}

                </div>

            </div>

        </div>

    );

};

export default PartnerApplications;