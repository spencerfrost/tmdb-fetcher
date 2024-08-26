import React from "react";
import { TMDBApp } from "./components/TMDBApp";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <TMDBApp />
    </div>
  );
};

export default App;
