import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";


const RoleRoute = ({ allowedRoles }) => {

    const {
        user,
        loading,
        isAuthenticated
    } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

                    <p className="text-slate-400">
                        Checking authentication...
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default RoleRoute;