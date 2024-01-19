import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import { QuizProvider } from './Context';

const App = () => {
  // <Route path="/quiz" element={<QuizPage/>} />
  // <Route path="/results" element={<ResultsPage/>} />
  return (
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  );
};

export default App;