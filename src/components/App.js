import React, { useState } from 'react';
import Options from './Options';
import Question from './Question';
import Categories from './Categories';

const categoryData = [
  {
    value: 9,
    text: 'General Knowledge',
  },
  {
    value: 10,
    text: 'Entertainment: Books',
  },
  {
    value: 11,
    text: 'Entertainment: Films',
  },
  {
    value: 12,
    text: 'Entertainment: Music',
  },
  {
    value: 13,
    text: 'Entertainment: Musicals and Theatres',
  },
  {
    value: 14,
    text: 'Entertainment: Television',
  },
  {
    value: 15,
    text: 'Entertainment: Video Games',
  },
  {
    value: 16,
    text: 'Entertainment: Board Games',
  },
  {
    value: 17,
    text: 'Science and Nature',
  },
  {
    value: 18,
    text: 'Science: Computers',
  },
  {
    value: 19,
    text: 'Science: Mathematics',
  },
  {
    value: 20,
    text: 'Mythology',
  },
  {
    value: 21,
    text: 'Sports',
  },
  {
    value: 22,
    text: 'Geography',
  },
  {
    value: 23,
    text: 'History',
  },
  {
    value: 24,
    text: 'Politics',
  },
  {
    value: 25,
    text: 'Art',
  },
  {
    value: 26,
    text: 'Celebrities',
  },
  {
    value: 27,
    text: 'Animals',
  },
  {
    value: 28,
    text: 'Vehicles',
  },
  {
    value: 29,
    text: 'Entertainment: Comics',
  },
  {
    value: 30,
    text: 'Science: Gadgets',
  },
  {
    value: 31,
    text: 'Entertainment: Japanese Anime and Manga',
  },
  {
    value: 32,
    text: 'Entertainment: Cartoon and Animations',
  },
];

const difficultyData = [
  {
    value: 'easy',
    text: 'Easy',
  },
  {
    value: 'medium',
    text: 'Medium',
  },
  {
    value: 'hard',
    text: 'Hard',
  },
];

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const [category, setCategory] = useState(categoryData[0]);
  const [difficulty, setDifficulty] = useState(difficultyData[0]);

  const handleStartQuiz = () => {
    setStartQuiz(true);
    const apiURL = `https://opentdb.com/api.php?amount=10&category=${category.value}&difficulty=${difficulty.value}&type=multiple`;
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        const results = data.results.map((data) => {
          return {
            ...data,
            answers: [...data.incorrect_answers, data.correct_answer].sort(
              () => Math.random() - 0.5
            ),
          };
        });

        setQuestions(results);
      })
      .catch((err) => console.log(err));
  };

  const handleAnswer = (answer) => {
    if (!showAnswers) {
      if (questions[currentIndex].correct_answer === answer) {
        setScore(score + 1);
        console.log(score);
      }
      setShowAnswers(true);
    }
  };

  const handleNextQuestion = () => {
    setShowAnswers(false);
    setCurrentIndex(currentIndex + 1);
  };

  const handlePlayAgain = () => {
    setStartQuiz(false);
    setScore(0);
    setCurrentIndex(0);
    setShowAnswers(false);
    setQuestions([]);
  };

  return (
    <div>
      {startQuiz ? (
        <div className='flex justify-center items-center h-screen flex-col bg-gray-200'>
          <div className='w-6/12 relative'>
            {questions.length > 0 ? (
              currentIndex >= questions.length ? (
                <div className='flex flex-col items-center justify-center'>
                  <h1 className='text-center text-3xl text-gray-800'>
                    Quiz Ended. Your Score is{' '}
                    <span className='font-semibold inline-block text-5xl'>
                      {score}/10
                    </span>
                  </h1>
                  <p
                    onClick={handlePlayAgain}
                    className='mt-10 w-max cursor-pointer bg-gray-700 text-center text-gray-50 py-2 px-8 rounded-md focus:outline-none hover:bg-gray-800'
                  >
                    Play Again.
                  </p>
                </div>
              ) : (
                <>
                  <Question question={questions[currentIndex].question} />
                  <Options
                    options={questions[currentIndex].answers}
                    showAnswers={showAnswers}
                    handleAnswer={handleAnswer}
                    correctAnswer={questions[currentIndex].correct_answer}
                  />
                  {showAnswers && (
                    <button
                      onClick={handleNextQuestion}
                      className='absolute right-0 mt-5 bg-gray-700 text-gray-50 py-3 px-8 rounded-md focus:outline-none hover:bg-gray-800'
                    >
                      Next
                    </button>
                  )}
                </>
              )
            ) : (
              <h1 className='text-center text-6xl'>Loading....</h1>
            )}
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center h-screen w-screen'>
          <h1 className='text-2xl text-semibold mb-10 text-gray-800'>
            Please Select Category and Difficulty Level
          </h1>
          <div className='flex flex-row items-center justify-center w-full'>
            <Categories
              label='Categories'
              selected={category}
              setSelected={setCategory}
              dataList={categoryData}
            />
            <Categories
              label='Difficulty'
              selected={difficulty}
              setSelected={setDifficulty}
              dataList={difficultyData}
            />
          </div>

          <button
            onClick={handleStartQuiz}
            className='mt-10 bg-gray-700 text-gray-50 py-2 px-8 rounded-md focus:outline-none hover:bg-gray-800'
          >
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
