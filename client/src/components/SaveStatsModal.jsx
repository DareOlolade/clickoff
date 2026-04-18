// components/SaveStatsModal.jsx
import { useNavigate } from "react-router-dom";
import { Trophy, TrendingUp } from "lucide-react";

const SaveStatsModal = ({ wpm, accuracy, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 border-2 border-neutral-700 rounded-2xl p-10 text-center max-w-md w-full mx-4">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        
        <h2 className="text-3xl font-bold text-white mb-2">
          Great Game!
        </h2>
        
        <p className="text-neutral-400 mb-6">
          Create an account to save your stats and track your progress
        </p>

        {/* Stats Preview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-neutral-800/50 p-4 rounded-lg">
            <TrendingUp className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-yellow-400">{wpm}</div>
            <div className="text-xs text-neutral-500">WPM</div>
          </div>
          <div className="bg-neutral-800/50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-400">{accuracy}%</div>
            <div className="text-xs text-neutral-500">Accuracy</div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/register")}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-lg transition"
          >
            Create Account
          </button>
          
          <button
            onClick={() => navigate("/login")}
            className="w-full border-2 border-neutral-600 hover:border-yellow-400 text-neutral-400 hover:text-yellow-400 font-bold py-3 rounded-lg transition"
          >
            I Have an Account
          </button>
          
          <button
            onClick={onClose}
            className="w-full text-neutral-500 hover:text-neutral-400 text-sm py-2 transition"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveStatsModal;