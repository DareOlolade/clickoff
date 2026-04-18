import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
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

    // Client-side validation
    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/register`, {
        username,
        email,
        password,
      });

      const data = res.data;

      // Auto-login after register
      login(data.user, data.token);

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Registration error:", err.response?.data);
      
      // Handle different error types
      if (err.response?.data?.errors) {
        // Validation errors array
        setError(err.response.data.errors.join(", "));
      } else if (err.response?.data?.message) {
        // Single error message
        setError(err.response.data.message);
      } else {
        setError(err.message || "Registration failed");
      }
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
          Register
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Username (min 3 characters)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 rounded bg-neutral-800 border border-neutral-700 outline-none focus:border-yellow-400 transition"
          required
          minLength={3}
          maxLength={30}
        />

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
          placeholder="Password (min 6 characters)"
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
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-sm text-center text-neutral-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-yellow-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;