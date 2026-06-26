import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TMDBApp } from "./components/TMDBApp";
import DetailPage from "./components/DetailPage";
import EpisodeDetailView from "./components/EpisodeDetailView";
import PersonDetailView from "./components/PersonDetailView";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-900 text-white">
            <TMDBApp />
          </div>
        } />
        <Route path="/:mediaType/:id" element={<DetailPage />} />
        <Route path="/person/:id" element={<PersonDetailView />} /> 
        <Route 
          path="/tv/:seriesId/season/:seasonNumber/episode/:episodeNumber" 
          element={<EpisodeDetailView />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
