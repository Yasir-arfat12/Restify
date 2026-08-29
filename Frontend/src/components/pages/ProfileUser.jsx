import React from 'react'

    const bookings = [
    {
      id: 1,
      podName: "Restify Premium Pod",
      address: "MG Road, Bengaluru",
      date: "18 Aug 2026",
      startTime: "10:00 AM",
      endTime: "02:00 PM",
      status: "Confirmed",
    },
    {
      id: 2,
      podName: "Restify Comfort Pod",
      address: "Indiranagar, Bengaluru",
      date: "22 Aug 2026",
      startTime: "06:00 PM",
      endTime: "10:00 PM",
      status: "Confirmed",
    },
    {
      id: 3,
      podName: "Restify Premium Pod",
      address: "Koramangala, Bengaluru",
      date: "28 Aug 2026",
      startTime: "09:00 AM",
      endTime: "01:00 PM",
      status: "Confirmed",
    },
  ];
const ProfileUser =  ()=> {

  return (
    <section className="w-full px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-blue-400 text-sm font-medium tracking-wider">
            MY BOOKINGS
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Your Restify bookings
          </h2>

          <p className="text-slate-400 mt-2">
            View and manage your confirmed Restify stays.
          </p>
        </div>

        {/* Booking Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">

          {/* Card Header */}
          <div className="px-6 md:px-8 py-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <h3 className="text-lg font-semibold text-white">
                Confirmed bookings
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Your upcoming Restify reservations
              </p>
            </div>

            {/* Booking Count */}
            <div className="w-fit px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <span className="text-blue-400 text-sm font-medium">
                {bookings.length} Bookings
              </span>
            </div>

          </div>

          {/* Booking Table */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-[800px]">

              {/* Table Header */}
              <thead>
                <tr className="border-b border-slate-800 text-left">

                  <th className="px-6 md:px-8 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Pod
                  </th>

                  <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Address
                  </th>

                  <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Date
                  </th>

                  <th className="px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Time
                  </th>

                  <th className="px-6 md:px-8 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>

                </tr>
              </thead>

              {/* Table Body */}
              <tbody>

                {bookings.map((booking) => (

                  <tr
                    key={booking.id}
                    className="border-b border-slate-800/70 hover:bg-slate-800/40 transition duration-200"
                  >

                    {/* Pod */}
                    <td className="px-6 md:px-8 py-5">

                      <div className="flex items-center gap-3">

                        {/* Pod Icon */}
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-lg">
                          🛏️
                        </div>

                        {/* Pod Name */}
                        <div>
                          <p className="text-white font-medium">
                            {booking.podName}
                          </p>

                          <p className="text-xs text-slate-500 mt-1">
                            Restify Pod
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Address */}
                    <td className="px-6 py-5">

                      <p className="text-slate-300 text-sm max-w-xs">
                        {booking.address}
                      </p>

                    </td>

                    {/* Date */}
                    <td className="px-6 py-5">

                      <p className="text-slate-300 text-sm whitespace-nowrap">
                        {booking.date}
                      </p>

                    </td>

                    {/* Time */}
                    <td className="px-6 py-5">

                      <div>
                        <p className="text-white text-sm font-medium whitespace-nowrap">
                          {booking.startTime}
                        </p>

                        <p className="text-slate-500 text-xs mt-1 whitespace-nowrap">
                          to {booking.endTime}
                        </p>
                      </div>

                    </td>

                    {/* Status */}
                    <td className="px-6 md:px-8 py-5">

                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">

                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>

                        {booking.status}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </section>
  )
}

export default ProfileUser