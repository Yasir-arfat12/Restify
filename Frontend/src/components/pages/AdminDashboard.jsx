import React from "react";
import PodManagement from "../Pods/PodManagement";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 lg:px-10 py-8">

            <div className="max-w-7xl mx-auto">

                {/* ========================================= */}
                {/* HEADER */}
                {/* ========================================= */}

                <div className="mb-8">

                    <p className="text-cyan-400 uppercase tracking-[0.25em] text-sm font-semibold">
                        Admin Panel
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-bold mt-2">
                        Admin Dashboard
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Manage Restify pods and partner applications.
                    </p>

                </div>


                {/* ========================================= */}
                {/* ADMIN ACTIONS */}
                {/* ========================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

                    {/* POD MANAGEMENT */}

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                        <p className="text-sm text-slate-400">
                            Pod Management
                        </p>

                        <h2 className="text-xl font-semibold mt-1">
                            Manage Pods
                        </h2>

                        <p className="text-sm text-slate-400 mt-3">
                            Create and manage Restify pods.
                        </p>

                        <div className="mt-5">
                            <button
                                onClick={() => navigate("/pod-management")}
                                className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
                            >
                                Manage Pods
                            </button>
                        </div>

                    </div>


                    {/* PARTNER APPLICATIONS */}

                    <button
                        onClick={() =>
                            navigate("/admin/partner-applications")
                        }
                        className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-slate-400">
                                    Partner Management
                                </p>

                                <h2 className="text-xl font-semibold text-white mt-1">
                                    Partner Applications
                                </h2>

                            </div>

                            <span className="text-2xl group-hover:translate-x-1 transition">
                                →
                            </span>

                        </div>

                        <p className="text-sm text-slate-400 mt-4">
                            Review property owners and approve them
                            to become Restify owners.
                        </p>

                    </button>

                </div>


                {/* ========================================= */}
                {/* POD MANAGEMENT SECTION */}
                {/* ========================================= */}

                <div>

                    <h2 className="text-2xl font-bold mb-5">
                        Pod Management
                    </h2>

                    <PodManagement />

                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;