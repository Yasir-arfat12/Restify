import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const ProfileLogIn = () => {

    const navigate = useNavigate();

    const {
        user,
        logout,
        loading
    } = useAuth();


    // -----------------------------
    // LOADING
    // -----------------------------

    if (loading) {

        return (
            <section className="
                min-h-screen
                bg-slate-950
                flex
                items-center
                justify-center
                px-4
            ">

                <p className="text-white text-lg">
                    Loading profile...
                </p>

            </section>
        );
    }


    // -----------------------------
    // NOT LOGGED IN
    // -----------------------------

    if (!user) {

        return (
            <section className="
                min-h-screen
                bg-slate-950
                flex
                items-center
                justify-center
                px-4
            ">

                <div className="
                    w-full
                    max-w-md
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    p-8
                    text-center
                ">

                    <h1 className="
                        text-3xl
                        font-bold
                        text-white
                    ">
                        Login Required
                    </h1>

                    <p className="
                        text-slate-400
                        mt-3
                    ">
                        Please login to view your profile.
                    </p>


                    <button
                        onClick={() => navigate("/login")}
                        className="
                            mt-6
                            w-full
                            bg-blue-600
                            hover:bg-blue-500
                            text-white
                            py-3
                            rounded-xl
                            font-semibold
                            transition
                        "
                    >
                        Login
                    </button>

                </div>

            </section>
        );
    }


    // -----------------------------
    // LOGGED-IN USER
    // -----------------------------

    return (

        <section className="
            min-h-screen
            bg-slate-950
            flex
            items-center
            justify-center
            px-4
            py-10
        ">

            <div className="
                w-full
                max-w-5xl
            ">


                {/* HEADING */}

                <div className="mb-8">

                    <p className="
                        text-blue-400
                        text-sm
                        font-medium
                        tracking-wide
                    ">
                        MY PROFILE
                    </p>


                    <h1 className="
                        text-3xl
                        md:text-4xl
                        font-bold
                        text-white
                        mt-2
                    ">
                        Welcome back, {user.name}
                    </h1>

                </div>


                {/* PROFILE CARD */}

                <div className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    overflow-hidden
                    shadow-2xl
                ">


                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                    ">


                        {/* ================================= */}
                        {/* LEFT SIDE */}
                        {/* ================================= */}

                        <div className="
                            p-8
                            md:p-10
                        ">


                            {/* USER INFORMATION */}

                            <div className="
                                flex
                                items-center
                                gap-5
                            ">


                                {/* PROFILE IMAGE */}

                                <div className="
                                    w-20
                                    h-20
                                    md:w-24
                                    md:h-24
                                    rounded-full
                                    bg-blue-600
                                    flex
                                    items-center
                                    justify-center
                                    border-4
                                    border-slate-800
                                    shadow-lg
                                    shrink-0
                                ">

                                    <span className="
                                        text-3xl
                                        md:text-4xl
                                        font-bold
                                        text-white
                                    ">

                                        {user.name
                                            ?.charAt(0)
                                            ?.toUpperCase()
                                        }

                                    </span>

                                </div>


                                {/* USER DETAILS */}

                                <div className="min-w-0">

                                    <p className="
                                        text-slate-400
                                        text-sm
                                    ">
                                        Account
                                    </p>


                                    <h2 className="
                                        text-xl
                                        md:text-2xl
                                        font-semibold
                                        text-white
                                        mt-1
                                        break-words
                                    ">

                                        {user.name}

                                    </h2>


                                    <p className="
                                        text-slate-400
                                        text-sm
                                        md:text-base
                                        mt-1
                                        break-all
                                    ">

                                        {user.email}

                                    </p>

                                </div>

                            </div>


                            {/* DIVIDER */}

                            <div className="
                                h-px
                                bg-slate-800
                                my-8
                            "></div>


                            {/* ACCOUNT INFORMATION */}

                            <div className="space-y-5">


                                {/* ROLE */}

                                <div>

                                    <p className="
                                        text-slate-500
                                        text-xs
                                        uppercase
                                        tracking-wider
                                    ">
                                        Account Type
                                    </p>


                                    <p className="
                                        text-white
                                        mt-2
                                        capitalize
                                        font-medium
                                    ">

                                        {user.role}

                                    </p>

                                </div>


                                {/* EMAIL */}

                                <div>

                                    <p className="
                                        text-slate-500
                                        text-xs
                                        uppercase
                                        tracking-wider
                                    ">
                                        Email Address
                                    </p>


                                    <p className="
                                        text-white
                                        mt-2
                                        break-all
                                    ">

                                        {user.email}

                                    </p>

                                </div>


                                {/* USER ID */}

                                <div>

                                    <p className="
                                        text-slate-500
                                        text-xs
                                        uppercase
                                        tracking-wider
                                    ">
                                        User ID
                                    </p>


                                    <p className="
                                        text-slate-400
                                        mt-2
                                        text-sm
                                        break-all
                                    ">

                                        {user._id}

                                    </p>

                                </div>

                            </div>


                            {/* LOGOUT */}

                            <button
                                onClick={() => {

                                    logout();

                                    navigate("/login");

                                }}
                                className="
                                    mt-8
                                    w-full
                                    border
                                    border-red-500/40
                                    text-red-400
                                    hover:bg-red-500/10
                                    py-3
                                    rounded-xl
                                    font-semibold
                                    transition
                                "
                            >

                                Logout

                            </button>

                        </div>


                        {/* ================================= */}
                        {/* RIGHT SIDE */}
                        {/* ================================= */}

                        <div className="
                            relative
                            p-8
                            md:p-10
                            bg-gradient-to-br
                            from-blue-950
                            via-slate-900
                            to-slate-950
                            flex
                            items-center
                        ">


                            {/* DECORATIVE CIRCLE */}

                            <div className="
                                absolute
                                -top-20
                                -right-20
                                w-52
                                h-52
                                bg-blue-500/10
                                rounded-full
                                blur-2xl
                            "></div>


                            <div className="relative">

                                <span className="
                                    inline-block
                                    px-3
                                    py-1
                                    rounded-full
                                    bg-blue-500/10
                                    border
                                    border-blue-400/20
                                    text-blue-400
                                    text-xs
                                    font-medium
                                    mb-5
                                ">

                                    THE FUTURE OF REST

                                </span>


                                <h2 className="
                                    text-2xl
                                    md:text-3xl
                                    font-bold
                                    text-white
                                    leading-tight
                                ">

                                    Rest better.
                                    <br />

                                    Live better.
                                    <br />

                                    <span className="
                                        text-blue-400
                                    ">

                                        Anywhere, anytime.

                                    </span>

                                </h2>


                                <p className="
                                    text-slate-400
                                    mt-5
                                    leading-relaxed
                                    max-w-md
                                ">

                                    Restify is building a smarter
                                    way to rest by giving you
                                    comfortable spaces exactly
                                    when you need them.

                                </p>


                                {/* CUSTOMER BUTTON */}

                                {user.role === "customer" && (

                                    <button
                                        onClick={() =>
                                            navigate("/pods")
                                        }
                                        className="
                                            mt-7
                                            px-5
                                            py-3
                                            bg-blue-600
                                            hover:bg-blue-500
                                            text-white
                                            rounded-xl
                                            font-medium
                                            transition
                                        "
                                    >

                                        Explore Pods

                                    </button>

                                )}


                                {/* OWNER BUTTON */}

                                {user.role === "owner" && (

                                    <button
                                        onClick={() =>
                                            navigate("/owner/dashboard")
                                        }
                                        className="
                                            mt-7
                                            px-5
                                            py-3
                                            bg-blue-600
                                            hover:bg-blue-500
                                            text-white
                                            rounded-xl
                                            font-medium
                                            transition
                                        "
                                    >

                                        Owner Dashboard

                                    </button>

                                )}


                                {/* ADMIN BUTTON */}

                                {user.role === "admin" && (

                                    <button
                                        onClick={() =>
                                            navigate("/admin/dashboard")
                                        }
                                        className="
                                            mt-7
                                            px-5
                                            py-3
                                            bg-blue-600
                                            hover:bg-blue-500
                                            text-white
                                            rounded-xl
                                            font-medium
                                            transition
                                        "
                                    >

                                        Admin Dashboard

                                    </button>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

};


export default ProfileLogIn;