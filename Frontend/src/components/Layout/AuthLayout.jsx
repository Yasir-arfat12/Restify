import React from 'react';

const AuthLayout = ({ children, title, subtitle, isLogin, illustrationText }) => {
  return (
    <div className="flex min-h-screen text-slate-100 bg-black selection:text-white">
         {/* bg-slate-50 text-slate-800  antialiased selection:bg-indigo-500  */}
      {/* Left Column: Modern Gradient Visual (Hidden on Mobile) */}
      <div className="relative hidden w-1/2 items-center justify-center bg-gradient-to-r from-[#030912] via-[#0b1e3c] to-[#0d1b31] p-12 lg:flex">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
        <div className="relative z-10 max-w-md text-center text-white">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-indigo-100">
            {illustrationText}
          </p>
          <div className="mt-8 flex justify-center gap-3 opacity-80">
            <span className="h-2 w-12 rounded-full bg-white/40"></span>
            <span className={`h-2 w-4 rounded-full transition-all duration-300 ${isLogin ? 'bg-white' : 'bg-white/40'}`}></span>
            <span className={`h-2 w-4 rounded-full transition-all duration-300 ${!isLogin ? 'bg-white' : 'bg-white/40'}`}></span>
          </div>
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-16 lg:w-1/2 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-black font-bold text-xl shadow-md shadow-indigo-200">
              R
            </div>
            <span className="text-xl font-bold tracking-tight text-white"> 
                <span className='text-blue-400 font-bold '>R</span>estify</span>
          </div>

          {/* Header titles */}
          <h2 className="text-3xl font-bold tracking-tight text-white">{subtitle}</h2>
          
          {/* Main Form content wrapper */}
          {children}

          {/* Social Sign-In Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-50 px-2 text-slate-900">Or continue with</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                <svg className="h-5 w-5 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.193 20 14.436 20 10.017 20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
                GitHub
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthLayout;