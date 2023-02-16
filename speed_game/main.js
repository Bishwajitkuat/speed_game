"use strict";

//functions
// randdomNumber
// startGame
// clickCercle
// pickNew
// enableCircles
// resetGames

// veriable
// score
// Timer
// active
// pace
// rounds

const btn = document.querySelector("#btn");
const option = document.querySelectorAll(".option");
const scoreUpdate = document.querySelector("#scoreUpdate");

// GLOBAL variables
let lastNum = 0; //global veriable for randGenerator
let id; //global veriable for game generated id
let score = 0;

//random number generator
function randGenerator() {
  let randNum = Math.floor(Math.random() * 4 + 1);
  while (lastNum === randNum) {
    randNum = Math.floor(Math.random() * 4 + 1);
  }
  lastNum = randNum;
  return randNum;
}
// game input, adding and removing active class to choose
function gameInput() {
  id = "#op" + String(randGenerator());
  document.querySelector(id).classList.add("active");
  setTimeout(() => {
    document.querySelector(id).classList.remove("active");
  }, 1000);
}

// detect click from option div
// function userInputOption(e) {
//   return e.target.id;
// }

// start and stop class adding and changing btn text

function startStop() {}
// event listeners

function gamePlay() {
  gameInput();
  let userInput;
  option.forEach((item) =>
    item.addEventListener("click", (e) => {
      userInput = e.target.id;
    })
  );
  if (true) {
    score++;
    scoreUpdate.textContent = score;
  }
}
setInterval(gamePlay, 3000);
