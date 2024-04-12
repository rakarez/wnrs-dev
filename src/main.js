// main.js
import './style.css';
import { regularEnglish, regularIndonesia, datingEnglish, datingIndonesia } from './questions.js';

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
  
  // Keep track of the selected edition
  window.selectedEdition = edition;

  // Automatically load and display the first question of the first level
  changeLevel(1);
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
  currentQuestionIndex = 0; // Reset currentQuestionIndex when change the level

  let questions;

  switch(window.selectedEdition) {
    case 'Regular':
      questions = window.selectedLanguage === 'English' ? regularEnglish : regularIndonesia;
      break;
    case 'Dating':
      questions = window.selectedLanguage === 'English' ? datingEnglish : datingIndonesia;
      break;
    default:
      console.error(`Invalid edition: ${window.selectedEdition}`);
      break;
  }
  
  let currentLevelQuestions = questions[`level${currentLevel}`];

  if (Array.isArray(currentLevelQuestions) && currentLevelQuestions.length > 0) {
    shuffledQuestions = shuffleArray(currentLevelQuestions);
    console.log(`Shuffled questions for level${currentLevel}: ${JSON.stringify(shuffledQuestions)}`);
    displayQuestion();
  } else {
    // Handle the case when questions are not available
    document.getElementById('questionText').textContent = "No questions available for this level.";
    console.error('Error in changeLevel: Questions are not available for the selected language and edition');
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

document.getElementById('datingEditionButton').addEventListener('click', () => {
  handleEditionSelection('Dating'); // "Dating" is just an identifier to distinguish between editions.
});

// Event listeners for level buttons
for (let i = 1; i <= 3; i++) {
  document.getElementById(`level${i}Button`).addEventListener('click', () => {
    changeLevel(i);
  });
}

document.getElementById('nextButton').addEventListener('click', handleNextButtonClick);
