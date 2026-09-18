// import React, { useState } from "react";
// import AuthLayout from "../Layout/AuthLayout";
// import { useNavigate } from "react-router-dom";
// import API from "../../api/axios";
// import { useAuth } from "../../context/authContext";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//    const { user } = useAuth();
//     const navigate = useNavigate();

//     // IMPORTANT:
//     // Get login function from AuthContext
//     const { login } = useAuth();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             /*
//               Use AuthContext login instead of manually
//               storing the user in localStorage.

//               AuthContext will:
//               1. Call /users/login
//               2. Save token
//               3. Save user
//               4. Update React user state
//             */

//             const user = await login(email, password);

//             console.log("LOGIN SUCCESS:", user);
//             console.log("LOGGED IN ROLE:", user.role);

//             /*
//               After AuthContext is updated, go to home.
//               The profile route will now recognize the user.
//             */

//             navigate("/");

//         } catch (error) {

//             console.error(
//                 "LOGIN ERROR:",
//                 error
//             );

//             alert(
//                 error.response?.data?.message ||
//                 error.message ||
//                 "Login failed"
//             );
//         }
//     };

//     return (
//         <AuthLayout
//             title="Welcome Back!"
//             subtitle="Sign in to account"
//             isLogin={true}
//             illustrationText="Discover powerful tools to manage your daily tasks and scale your ideas effortlessly."
//         >

//             <p className="mt-2 text-sm text-slate-500">

//                 Don't have an account?{" "}

//                 <button
//                     type="button"
//                     onClick={() =>
//                         navigate("/register")
//                     }
//                     className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors focus:outline-none focus:underline"
//                 >
//                     Register here
//                 </button>

//             </p>


//             <form
//                 onSubmit={handleSubmit}
//                 className="mt-8 space-y-5"
//             >

//                 {/* EMAIL */}

//                 <div>

//                     <label
//                         htmlFor="email"
//                         className="block text-sm font-medium text-slate-700"
//                     >
//                         Email address
//                     </label>

//                     <div className="mt-1">

//                         <input
//                             id="email"
//                             type="email"
//                             autoComplete="email"
//                             required
//                             value={email}
//                             onChange={(e) =>
//                                 setEmail(e.target.value)
//                             }
//                             placeholder="you@example.com"
//                             className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
//                         />

//                     </div>

//                 </div>


//                 {/* PASSWORD */}

//                 <div>

//                     <div className="flex items-center justify-between">

//                         <label
//                             htmlFor="password"
//                             className="block text-sm font-medium text-slate-700"
//                         >
//                             Password
//                         </label>

//                         <a
//                             href="#"
//                             className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
//                         >
//                             Forgot password?
//                         </a>

//                     </div>


//                     <div className="mt-1">

//                         <input
//                             id="password"
//                             type="password"
//                             autoComplete="current-password"
//                             required
//                             value={password}
//                             onChange={(e) =>
//                                 setPassword(e.target.value)
//                             }
//                             placeholder="••••••••"
//                             className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
//                         />

//                     </div>

//                 </div>


//                 {/* REMEMBER ME */}

//                 <div className="flex items-center">

//                     <input
//                         id="remember-me"
//                         type="checkbox"
//                         className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
//                     />

//                     <label
//                         htmlFor="remember-me"
//                         className="ml-2 block text-sm text-slate-600"
//                     >
//                         Remember me
//                     </label>

//                 </div>


//                 {/* LOGIN BUTTON */}

//                 <div>

//                     <button
//                         type="submit"
//                         className="flex w-full justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-900 transition-all active:scale-[0.98]"
//                     >
//                         Sign in
//                     </button>

//                 </div>

//             </form>

//         </AuthLayout>
//     );
// };

// export default Login;

import React, { useState } from "react";
import AuthLayout from "../Layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // Get login function from AuthContext
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // AuthContext handles:
            // 1. API login request
            // 2. Saving token
            // 3. Saving user
            // 4. Updating AuthContext user state
            const user = await login(email, password);

            console.log("LOGIN SUCCESS:", user);
            console.log("LOGGED IN ROLE:", user.role);

            // After successful login, go to home
            navigate("/");
        } catch (error) {
            console.error("LOGIN ERROR:", error);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Login failed"
            );
        }
    };

    return (
        <AuthLayout
            title="Welcome Back!"
            subtitle="Sign in to account"
            isLogin={true}
            illustrationText="Discover powerful tools to manage your daily tasks and scale your ideas effortlessly."
        >
            {/* Register link */}
            <p className="mt-2 text-sm text-slate-500">
                Don't have an account?{" "}
                <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors focus:outline-none focus:underline"
                >
                    Register here
                </button>
            </p>

            {/* Login Form */}
            <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
            >
                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 mb-2"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                </div>

                {/* Password */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-slate-700 mb-2"
                    >
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Sign In
                </button>
            </form>
        </AuthLayout>
    );
};

export default Login;