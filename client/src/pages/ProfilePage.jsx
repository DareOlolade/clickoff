// pages/ProfilePage.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Trophy, TrendingUp, Target, Award } from "lucide-react";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-monkey-bg text-white">
        <div className="text-center">
          <p className="text-neutral-400 mb-4">Please login to view profile</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-300 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-monkey-bg text-white">
      {/* Top Bar */}
      <div className="border-b border-neutral-800 px-8 py-4">
        <h1 
          className="text-2xl font-bold tracking-widest text-yellow-400 cursor-pointer"
          onClick={() => navigate("/")}
        >
          CLICKOFF
        </h1>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-black">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">{user?.username}</h2>
              <p className="text-neutral-400">{user?.email}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-neutral-800 p-6 rounded-lg text-center">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">
                {user?.stats?.racesWon || 0}
              </div>
              <div className="text-xs text-neutral-500">Wins</div>
            </div>

            <div className="bg-neutral-800 p-6 rounded-lg text-center">
              <Award className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">
                {user?.stats?.racesPlayed || 0}
              </div>
              <div className="text-xs text-neutral-500">Games Played</div>
            </div>

            <div className="bg-neutral-800 p-6 rounded-lg text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">
                {user?.stats?.avgWpm || 0}
              </div>
              <div className="text-xs text-neutral-500">Avg WPM</div>
            </div>

            <div className="bg-neutral-800 p-6 rounded-lg text-center">
              <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">
                {user?.stats?.bestWpm || 0}
              </div>
              <div className="text-xs text-neutral-500">Best WPM</div>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="mt-8 w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-lg transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;