// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ email, password });
//     // TODO: call login API
//     navigate("/signup");
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Left Form 60% */}
//       <div className="flex w-full lg:w-3/5 items-center justify-center bg-[#e0b6f5] min-h-screen p-4">
//         <div className="w-11/12 max-w-lg p-10 bg-white rounded-3xl shadow-2xl">
//           <h2 className="text-3xl font-bold mb-8 text-center text-[#6b1bbf]">
//             Login
//           </h2>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e0b6f5]"
//               required
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e0b6f5]"
//               required
//             />

//             <button
//               type="submit"
//               className="bg-[#e0b6f5] text-white py-3 rounded-lg hover:bg-[#c79fe0] transition font-semibold"
//             >
//               Login
//             </button>
//           </form>

//           <p className="text-sm text-center mt-6">
//             Don't have an account?{" "}
//             <Link to="/signup" className="text-[#6b1bbf] hover:underline">
//               Sign Up
//             </Link>
//           </p>

//           <p className="text-xs text-center mt-2">
//             <Link
//               to="/forgot-password"
//               className="text-gray-700 hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* Right Image 40% */}
//       <div className="hidden lg:flex w-2/5 h-screen">
//         <img
//           src="/Login.jpg"
//           alt="Login"
//           className="w-full h-full object-cover"
//         />
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4300/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      localStorage.setItem(data.token);
      if (!response.ok) {
        setError(data.message || "Invalid email or password");
      } else {
        // TODO: save token or user info if needed
        console.log("Login successful:", data);
        navigate("/dashboard"); // Redirect after login
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Form 60% */}
      <div className="flex w-full lg:w-3/5 items-center justify-center bg-[#e0b6f5] min-h-screen p-4">
        <div className="w-11/12 max-w-lg p-10 bg-white rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#6b1bbf]">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e0b6f5]"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e0b6f5]"
              required
            />

            {/* Error message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-[#e0b6f5] text-white py-3 rounded-lg hover:bg-[#c79fe0] transition font-semibold disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#6b1bbf] hover:underline">
              Sign Up
            </Link>
          </p>

          <p className="text-xs text-center mt-2">
            <Link
              to="/forgot-password"
              className="text-gray-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>

      {/* Right Image 40% */}
      <div className="hidden lg:flex w-2/5 h-screen">
        <img
          src="/Login.jpg"
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
