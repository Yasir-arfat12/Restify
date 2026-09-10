import React from "react";
import { useAuth } from "../../context/authContext";

function ProfileUser() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>You must be logged in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="mt-2 text-gray-500">
              Manage your Restify account details.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="mt-1 text-lg font-medium">{user.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="mt-1 text-lg font-medium">{user.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="mt-1 capitalize text-lg font-medium">
                {user.role}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-yellow-50 p-4 text-sm text-yellow-800">
            Booking history will be connected after the backend provides a
            customer-bookings endpoint.
          </div>

          <button
            type="button"
            onClick={logout}
            className="mt-6 rounded-lg bg-red-600 px-5 py-3 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;