import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4300/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
      } else {
        // Successful signup
        navigate("/login");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      console.error(err);
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
            Sign Up
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

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#6b1bbf] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Image 40% */}
      <div className="hidden lg:flex w-2/5 h-screen">
        <img
          src="/Login.jpg"
          alt="Signup"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
