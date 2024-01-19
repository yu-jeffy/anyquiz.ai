import React, {useState, useContext} from 'react';
import styles from './LandingPage.module.css';
import axios from 'axios';
import { QuizContext } from '../Context';

const LandingPage = () => {
  const [content, setContent] = useState('');
  const { openaiKey, setOpenaiKey, setQuestions } = useContext(QuizContext);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleKeyChange = (event) => {
    setOpenaiKey(event.target.value)
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', 
      {
        prompt: promptText,
        max_tokens: 150, // Customize this as needed.
        // Add more parameters as needed, refer to the OpenAI documentation.
      }, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + openaiKey
        }
      }
    );
      
      // Assuming the API returns an array of questions in JSONL format
      // and you parse them into an array of question objects:
      const questionsData = response.data.map((item, index) => ({
        number: index + 1,
        question: item.question,
        userAnswer: "", // initially empty
        gradingResponse: "", // initially empty
        rightWrong: null, // initially null, will be true or false after grading
      }));

      setQuestions(questionsData); // Save the questions to context
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleClear = () => {
    setContent('');
  };

  return (
    <div className={styles.container}>
      <h1>welcome to anyquiz</h1>
      <input 
        className= {styles.input} 
        value={openaiKey} 
        onChange={handleKeyChange} 
        placeholder="OpenAI API Key"
      />
      <textarea
        className={styles.textarea}
        value={content}
        onChange={handleContentChange}
        placeholder="Enter content to be quizzed on here..."
      />
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleSubmit}>
          Submit
        </button>
        <button className={`${styles.button} ${styles.buttonClear}`} onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default LandingPage;