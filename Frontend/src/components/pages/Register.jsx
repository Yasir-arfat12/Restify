import React, { useState } from 'react';
import API from "../../api/axios";
import AuthLayout from '../Layout/AuthLayout';
import { useNavigate } from 'react-router-dom';
const Register = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
              name: '',
            email: '',
             password: '',
            confirmPassword: '',
           agreeTerms: false,

  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (formData.password !== formData.confirmPassword) {
  //     alert("Passwords don't match!");
  //     return;
  //   }
  //   console.log('Registering account with:', formData);
  //   // Connect your AuthContext registration action here later
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
    }

    try {
        const response = await API.post("/users/register", {
             name: formData.name,
            email: formData.email,
            password: formData.password,
            role: "customer",
        });

        console.log(response.data);

        alert("Registration successful!");

        navigate("/login");

    } catch (error) {

        console.error(error);

        alert(
            error.response?.data?.message ||
            "Registration failed"
        );
    }
};

  return (
    <AuthLayout
      title="Start Your Jouney With Restify"
      subtitle="Create your account"
      isLogin={false}
      illustrationText=" Step into a world of comfort, privacy, and
       luxury sleep pods designed for your perfect
       rest. Create your account and begin your
       peaceful journey with Restify."
    >
      <p className="mt-2 text-sm text-slate-500">
        Already have an account?{' '}
        <button
  type="button"
  onClick={() => navigate('/login')}
  className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors focus:outline-none focus:underline"
>
  Log in here
</button>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Full Name
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
            Confirm Password
          </label>
          <div className="mt-1">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              required
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-2 text-sm">
            <label htmlFor="agreeTerms" className="text-slate-600">
              I agree to the{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Terms of Service</a> and{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-900 transition-all active:scale-[0.98]"
          >
            Create account
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;