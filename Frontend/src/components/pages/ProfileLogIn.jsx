import React, { useState } from "react";

const ProfileLogIn = () => {
    // Normally this data will come from your backend API
  const users = [
    {
      name: "Yasir Arfat",
      email: "yasir@example.com",
      photo: "https://i.pravatar.cc/150?img=12",
    },
  ];
  return (



    <section className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-blue-400 text-sm font-medium tracking-wide">
            MY PROFILE
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Welcome back
          </h1>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">

          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* LEFT SIDE - USER INFORMATION */}
            <div className="p-8 md:p-10">

              <div className="flex items-center gap-5">

                {/* User Photo */}
                {users.map((user, index) => (
                  <React.Fragment key={index}>

                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-slate-800 shadow-lg"
                    />

                    {/* User Details */}
                    <div>
                      <p className="text-slate-400 text-sm">
                        Account
                      </p>

                      <h2 className="text-xl md:text-2xl font-semibold text-white mt-1">
                        {user.name}
                      </h2>

                      <p className="text-slate-400 text-sm md:text-base mt-1 break-all">
                        {user.email}
                      </p>
                    </div>

                  </React.Fragment>
                ))}

              </div>

              {/* Divider */}
              <div className="h-px bg-slate-800 my-8"></div>

              {/* Account Info */}
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider">
                  Restify Member
                </p>

                <p className="text-white mt-2">
                  Your comfort, your space, your time.
                </p>
              </div>

            </div>


            {/* RIGHT SIDE - RESTIFY MESSAGE */}
            <div className="relative p-8 md:p-10 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 flex items-center">

              {/* Decorative Circle */}
              <div className="absolute -top-20 -right-20 w-52 h-52 bg-blue-500/10 rounded-full blur-2xl"></div>

              <div className="relative">

                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-medium mb-5">
                  THE FUTURE OF REST
                </span>

                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  Rest better.
                  <br />
                  Live better.
                  <br />
                  <span className="text-blue-400">
                    Anywhere, anytime.
                  </span>
                </h2>

                <p className="text-slate-400 mt-5 leading-relaxed max-w-md">
                  Restify is building a smarter way to rest by giving you
                  comfortable spaces exactly when you need them. Your next
                  moment of relaxation is just a booking away.
                </p>

                <button className="mt-7 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition duration-200">
                  Explore Restify
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ProfileLogIn
