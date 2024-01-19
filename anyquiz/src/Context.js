import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  const [openaiKey, setOpenaiKey] = useState("");

  // Your context provider will expose `questions` and `setQuestions` 
  // so they can be used throughout your component tree.
  const value = {
    questions,
    setQuestions,
    openaiKey,
    setOpenaiKey
  };


  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};