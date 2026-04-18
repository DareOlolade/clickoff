import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../config";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      // With axios, use response.data instead of response.json()
      const data = response.data;

      // Save user + token to context
      login(data.user, data.token);

      // Redirect to home
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Login error:", err.response?.data);
      
      // Handle axios error structure
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-monkey-bg text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 w-full max-w-md flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-yellow-400 text-center">
          Login
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded bg-neutral-800 border border-neutral-700 outline-none focus:border-yellow-400 transition"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded bg-neutral-800 border border-neutral-700 outline-none focus:border-yellow-400 transition"
          required
          minLength={6}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-neutral-400">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-yellow-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;