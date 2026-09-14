export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Welcome Back
        </h1>
        
        <form className="flex flex-col gap-5">
          {/* Email / Username Field */}
          <div>
            <label 
              className="mb-1 block text-sm font-semibold text-gray-700" 
              htmlFor="username"
            >
              Email or Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your email or username"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label 
              className="mb-1 block text-sm font-semibold text-gray-700" 
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="button"
            className="mt-2 w-full rounded-lg bg-blue-600 p-3 font-bold text-white transition hover:bg-blue-700 active:bg-blue-800"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}