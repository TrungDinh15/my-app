export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-100 p-4">
      {/* Hiệu ứng ánh sáng nền mờ - tông xanh sáng */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-sky-300/40 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />

      {/* Card đăng nhập (nền trắng kính mờ) */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl sm:p-10">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to access your dashboard and projects
          </p>
        </div>

        <form className="space-y-5">
          {/* Email / Username */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
              Email or Username
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-200 bg-white/50 py-3 pr-4 pl-11 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Password
              </label>
              <a href="#" className="text-xs font-semibold text-sky-600 transition hover:text-sky-700">
                Forgot?
              </a>
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-white/50 py-3 pr-4 pl-11 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center pt-1">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 bg-white text-sky-500 focus:ring-sky-500"
            />
            <label htmlFor="remember" className="ml-2 text-xs font-medium text-slate-600">
              Remember this device
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="mt-2 w-full rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/30 transition-all duration-200 hover:shadow-sky-500/40 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-slate-500">
          Don&apos;t have an account?{" "}
          <a href="#" className="font-bold text-sky-600 hover:underline">
            Create account
          </a>
        </p>
      </div>
    </div>
  );
}