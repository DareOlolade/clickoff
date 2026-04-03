import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";


const App = () => {
    return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </div>
  );
};

export default App;
