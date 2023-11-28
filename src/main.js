// main.js
import './style.css';
import { regular } from './questions.js';

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let questionCount = 0;
let currentLevel = 1; // Default level is 1

function handleLanguageSelection(language) {
  document.getElementById('englishButton').style.display = 'none';
  document.getElementById('indonesianButton').style.display = 'none';
  document.getElementById('editionSelection').style.display = 'block';
}

function handleEditionSelection(edition) {
  document.getElementById('editionSelection').style.display = 'none';
  document.getElementById('cardContainer').style.display = 'block';

  // Initialize the current level to 1 when the edition is selected
  currentLevel = 1;

  try {
    // Directly access the property based on the current level
    const currentLevelQuestions = regular['levelOne'];

    // Add console logs to check the type and content of currentLevelQuestions
    // console.log('Type of currentLevelQuestions:', typeof currentLevelQuestions);
    // console.log('Content of currentLevelQuestions:', currentLevelQuestions);

    // Check if currentLevelQuestions is an array using a more explicit check
    if (Array.isArray(currentLevelQuestions) && currentLevelQuestions.length > 0) {
      // Log the content of the array
      // console.log('Content of currentLevelQuestions:', currentLevelQuestions);

      // Shuffle the questions array for the initial level
      shuffledQuestions = shuffleArray(currentLevelQuestions);
      displayQuestion();
    } else {
      // console.error('Error in handleEditionSelection: Questions are not an array or are empty');
      // console.log('Complete regular object:', JSON.stringify(regular, null, 2));
    }
  } catch (error) {
    // console.error('Error in handleEditionSelection:', error);
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
    const currentLevelQuestions = regular[`level${currentLevel}`];

    // Log additional information for debugging
    console.log('Current level:', currentLevel);
    console.log('Content of regular object:', regular);
    console.log('Type of currentLevelQuestions:', typeof currentLevelQuestions);
    console.log('Content of currentLevelQuestions:', currentLevelQuestions);

    // Check if currentLevelQuestions is an array and not empty
    if (Array.isArray(currentLevelQuestions) && currentLevelQuestions.length > 0) {
      shuffledQuestions = shuffleArray(currentLevelQuestions);
      displayQuestion();
    } else {
      console.error('Error in changeLevel: Questions are not an array or are empty');
      console.log('Complete regular object:', JSON.stringify(regular, null, 2));
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
