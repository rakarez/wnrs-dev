// main.js
import './style.css';
import { regularEnglish, regularIndonesia } from './questions.js';

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let questionCount = 0;
let currentLevel = 1; // Default level is 1

function handleLanguageSelection(language) {
  document.getElementById('englishButton').style.display = 'none';
  document.getElementById('indonesianButton').style.display = 'none';
  document.getElementById('editionSelection').style.display = 'block';

  window.selectedLanguage = language;
}

function handleEditionSelection(edition) {
  document.getElementById('editionSelection').style.display = 'none';
  document.getElementById('cardContainer').style.display = 'block';

  // Initialize the current level to 1 when the edition is selected
  currentLevel = 1;

  try {
    const questions = window.selectedLanguage === 'English' ? regularEnglish : regularIndonesia;
    const currentLevelQuestions = questions[`level${currentLevel}`];

    // Check if currentLevelQuestions is an array using a more explicit check
    if (Array.isArray(currentLevelQuestions) && currentLevelQuestions.length > 0) {

      // Shuffle the questions array for the initial level
      shuffledQuestions = shuffleArray(currentLevelQuestions);
      displayQuestion();
    } else {
      // Handle the case when questions are not available
      console.error('Error: Questions are not available for the selected language and edition');

      // If questions are not available for the initial level, set the current level to 0
      currentLevel = 0;
    }
  } catch (error) {
    console.error('Error in handleEditionSelection:', error);
  }
}

function displayQuestion() {
  const questionTextElement = document.getElementById('questionText');
  if (currentQuestionIndex < shuffledQuestions.length) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionTextElement.textContent = currentQuestion;
  } else {
    questionTextElement.textContent = 'Time to move on to the next level';
  }
}

function changeLevel(newLevel) {
  currentLevel = newLevel;
  currentQuestionIndex = 0; // Reset currentQuestionIndex to zero when changing the level

  try {
    const questions = window.selectedLanguage === 'English' ? regularEnglish : regularIndonesia;
    const currentLevelQuestions = questions[`level${currentLevel}`];

    // Check if currentLevelQuestions is an array and not empty
    if (Array.isArray(currentLevelQuestions) && currentLevelQuestions.length > 0) {
      shuffledQuestions = shuffleArray(currentLevelQuestions);
      displayQuestion();
    } else {
      // Handle the case when questions are not available
      console.error('Error in changeLevel: Questions are not available for the selected language and edition');
    }
  } catch (error) {
    console.error('Error in changeLevel:', error);
  }
}


function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}


function handleNextButtonClick() {
  currentQuestionIndex++;
  displayQuestion();
}

document.getElementById('englishButton').addEventListener('click', () => {
  handleLanguageSelection('English');
});

document.getElementById('indonesianButton').addEventListener('click', () => {
  handleLanguageSelection('Indonesian');
});

document.getElementById('regularEditionButton').addEventListener('click', () => {
  handleEditionSelection('Regular');
});

// Event listeners for level buttons
for (let i = 1; i <= 3; i++) {
  document.getElementById(`level${i}Button`).addEventListener('click', () => {
    changeLevel(i);
  });
}

document.getElementById('nextButton').addEventListener('click', handleNextButtonClick);
