'use strict';

// Buttons
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Player elements
const scores = [
  document.querySelector('#score--0'),
  document.querySelector('#score--1'),
];
const currentScores = [
  document.querySelector('#current--0'),
  document.querySelector('#current--1'),
];
const diceImage = document.querySelector('.dice');

let currentScore = 0;
let activePlayer = 0; // 0 for player1, 1 for player2
let totalScores = [0, 0]; // Stores total scores of both players

const switchPlayer = function () {
  currentScore = 0;
  currentScores[activePlayer].textContent = '0';
  activePlayer = activePlayer === 0 ? 1 : 0;
};

const checkWinner = function () {
  if (totalScores[activePlayer] >= 100) {
    scores[
      activePlayer
    ].textContent = `You Won!!! Final Score: ${totalScores[activePlayer]}`;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    scores[activePlayer].style.fontSize = '4rem';
    btnRollDice.classList.add('hidden');
    btnHold.classList.add('hidden');
    return true;
  }
  return false;
};

const rollDice = function () {
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceImage.classList.remove('hidden');
  diceImage.setAttribute('src', `dice-${dice}.png`);

  if (dice === 1) {
    switchPlayer();
  } else {
    currentScore += dice;
    currentScores[activePlayer].textContent = currentScore;
  }
};

const holdScore = function () {
  totalScores[activePlayer] += currentScore;
  scores[activePlayer].textContent = totalScores[activePlayer];

  if (!checkWinner()) {
    switchPlayer();
  }
};

const resetGame = function () {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  scores.forEach(score => {
    score.textContent = '0';
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
    scores[activePlayer].style.fontSize = '8rem';
  });

  currentScores.forEach(current => (current.textContent = '0'));

  diceImage.classList.add('hidden');
  btnRollDice.classList.remove('hidden');
  btnHold.classList.remove('hidden');
};

btnRollDice.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNewGame.addEventListener('click', resetGame);
