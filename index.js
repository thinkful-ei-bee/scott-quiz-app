'use strict';
/* global $ */

const questionSet = [
  { 
    number: 1,
    text: 'Which player who spent eight years with the Red Sox is the only pitcher in history to win 500 games?',
    ans1: 'Lefty Gomez',
    ans2: '"Smokey" Joe Wood', 
    ans3: 'Cy Young', 
    ans4: 'Roger Clemens',
  }, 

  {
    number: 2,
    text: 'Where did Fenway Park get its name?',
    ans1: 'It was named for the first Red Sox batting champion.', 
    ans2: 'It sits on land belonging to the Fenway family estate.', 
    ans3: 'It was named for a former Boston mayor.', 
    ans4: 'It is named for a district in the city.',
  }, 

  {
    number: 3,
    text: 'The 2004 book, “The Teammates: Portrait of a Friendship,” about Red Sox Hall of Famers Ted Williams, Bobby Doerr, Johnny Pesky, and Dom DiMaggio, was written by what prominent American author?',
    ans1: 'Stephen King', 
    ans2: 'David Halberstam', 
    ans3: 'John Updike', 
    ans4: 'Bill Bryson',
  }, 
  {
    number: 4, 
    text: 'Which former Red Sox teammate did Ted Williams once describe as the second greatest hitter he ever saw after Joe DiMaggio?',
    ans1: 'Jimmie Foxx', 
    ans2: 'Frank Malzone', 
    ans3: 'Bobby Doerr', 
    ans4: 'Joe Cronin',
  }, 
  {
    number: 5,
    text: 'What song played during the eighth inning has become a Fenway Park tradition?',
    ans1: '"YMCA" by The Village People', 
    ans2: '"God Bless America" by Kate Smith', 
    ans3: '"Talkin\' Baseball" by Terry Cashman', 
    ans4: '"Sweet Caroline" by Neil Diamond',
  }, 
  {
    number: 6,
    text: 'Wade Boggs, who won five American League batting championships with the Red Sox in the 1980s, reportedly ate what before every game?',
    ans1: 'Scrambled eggs', 
    ans2: 'Chicken', 
    ans3: 'Tacos', 
    ans4: 'Liver and onions',
  }, 
  {
    number: 7,
    text: 'How did Boston pitcher “Gentleman Jim” Lonborg, who became a dentist after retiring from baseball in 1979, ensure his place in Red Sox history?',
    ans1: 'He was the winning pitcher when the Red Sox won the 1967 pennant.', 
    ans2: 'He tossed the first no-hitter in Red Sox history.', 
    ans3: 'He struck out seven Yankees in a row.', 
    ans4: 'He was the last major-league pitcher to win 30 games.',
  }, 
  {
    number: 8,
    text: 'What name was given to Boston’s 1967 pennant-winning season?',
    ans1: '"The Boston Miracle"', 
    ans2: '"The Impossible Dream"', 
    ans3: '"The Revenge of the Red Sox"', 
    ans4: '"Comeback of the Century"',
  }, 
  {
    number: 9,
    text: 'Despite the challenge any left-handed pitcher faces in Fenway Park, which southpaw owns the most wins in a Red Sox uniform?',
    ans1: 'John Lester', 
    ans2: 'Bill Lee', 
    ans3: 'Babe Ruth', 
    ans4: 'Mel Parnell',
  }, 
  {
    number: 10,
    text: 'According to Babe Ruth\'s wife, what achievement, recorded during his six years with the Red Sox, was his biggest baseball thrill?',
    ans1: 'Winning 89 games as a pitcher', 
    ans2: 'Leading the majors with 29 home runs in 1919', 
    ans3: 'Pitching 29.1 consecutive scoreless innings in the World Series', 
    ans4: 'Stealing seven bases in 1919',
  }
];

const ANSWERS = [ 
  'Cy Young', 
  'It is named for a district in the city.', 
  'David Halberstam', 
  'Jimmie Foxx', 
  '"Sweet Caroline" by Neil Diamond', 
  'Chicken', 
  'He was the winning pitcher when the Red Sox won the 1967 pennant.', 
  '"The Impossible Dream"', 
  'Mel Parnell', 
  'Pitching 29.1 consecutive scoreless innings in the World Series'
];

let questionNum = 1;

let correctAnswers = 0;

const correctFeedback = `
  <main class="feedback-page" role="main">
    <h2>Correct!</h2>
    <img src="https://media.giphy.com/media/BJJH3HK2cPWpy/giphy.gif" alt="Homerun">
    <button id="js-next-button">Next</button>
  </main>
`;

function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
    <main id="question-page" role="main">
    <h2 id="question">${question.text}</h2>
    
    <form>
      <fieldset>
        <label>
          <input class="answer" type="radio" name="option" checked></input>
          <span>${question.ans1}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans2}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans3}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans4}</span>
        </label>
      </fieldset>  
      <button id="js-submit-button">Submit</button>

    </form>

    <div id="status-bar">
      <span id="question-count">Question: ${question.number}/10</span>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
  </main>
  `;
}

function handleStartButton() {
  $('#js-start-button').click(function() {
    nextQuestion();
  });
}

function handleSubmitButton() {
  $('#container').on('click', '#js-submit-button', function(event) {
    event.preventDefault();

    const answer = $('input:checked').siblings('span');

    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      generateCorrectFeedback();
    } else {
      generateIncorrectFeedback();
    }
  });
}

function handleNextButton() {
  $('#container').on('click', '#js-next-button', function() {

    if(questionNum === 10) {
      createResultsPage(correctAnswers);
    } else {
      incrementQuestion();
      nextQuestion();
    }
  });
}

function handleRestartButton() {
  $('#container').on('click', '#js-restart-button', function() {

    questionNum = 1;

    correctAnswers = 0;

    nextQuestion();
  });
}

function nextQuestion() {

  const question = questionSet[questionNum - 1];

  const questionsAnswered = questionNum - 1;

  $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

function checkUserAnswer(answer) {
  if(answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}

function generateCorrectFeedback() {
  $('#container').html(correctFeedback);
  incrementCorrectAnswers();
}

function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedback(questionNum));
}

function incorrectFeedback(questionNum) {
  return `
    <main class="feedback-page" role="main">
      <h2>Nope! It was ${ANSWERS[questionNum - 1]}!</h2>
      <img src="https://media.giphy.com/media/iEQWZ7LxibbwI/giphy.gif" alt="Strikeout">
      <button id="js-next-button">Next</button>
    </main>
`;
}

function incrementQuestion() {
  questionNum++;
}

function incrementCorrectAnswers() {
  correctAnswers++;
}

function createResultsPage(correctAnswers) {
  $('#container').html(`
    <main id="final-page" role="main">
      <h2>Final Score: ${correctAnswers} out of 10</h2>
      <button id="js-restart-button">Play Again?</button>
    </main>
  `);
}

function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

$(handleButtons);