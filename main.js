"use strict";
// Global DOM elements
const btn = document.querySelector("#btn");
const btnText = document.querySelector("#btnText");
const option = document.querySelectorAll(".option");
const scoreSpan = document.querySelector("#scoreUpdate");
const btnCloseModule = document.querySelector("#btn_close_module");
const gameEndModal = document.querySelector(".game_end");
const endScoreId = document.querySelector("#end_score_id");
const singleOrNot = document.querySelector("#singleOrNot");
const endTextRecomendation = document.querySelector(".end_text_recomendation");
const instractionDiv = document.querySelector(".instraction");
const difficultyDiv = document.querySelector(".difficulty");
const diffForm = document.querySelector("form");
const nav = document.querySelector("nav");
const btnCloseIns = document.querySelector("#btnCloseIns");
const btnClosedif = document.querySelector("#btnClosedif");
const hideDiv = document.querySelectorAll(".hide");
const speedLevel = document.querySelector("#speed_level");
const clickSound = new Audio("audio//click.mp3");
const correctSound = new Audio("audio//correct.mp3");
const optionSound = new Audio("audio//option.mp3");
const gameEndSound = new Audio("audio//gameEnd.wav");

// GLOBAL variables
let lastNum = 0; //global veriable for randGenerator
let id = 0; //global veriable for game generated id
let score = 0; //global, total score by user
let miss = 0; // global, total miss by user
let scoreUpdate = true; //global, check only one click is registered for correct answer
let speed = 1000; // initial interval, reduce in per cycle
let timeClear; // global, reference to clear setTimeout
let play = false; // global, to check, nothing happens when game is off
let msDeductBy = 10; // global and defalut value for ms deduct by each cycle

// difficulty setter
function setDifficulty(e) {
  if (e.target.id === "slow") {
    msDeductBy = 10;
    speedLevel.textContent = "Slow";
  } else if (e.target.id === "medium") {
    msDeductBy = 15;
    speedLevel.textContent = "Medium";
  }
  if (e.target.id === "fast") {
    msDeductBy = 20;
    speedLevel.textContent = "Fast";
  }
}

//random number generator
function randGenerator() {
  let randNum = Math.floor(Math.random() * 4 + 1);
  while (lastNum === randNum) {
    randNum = Math.floor(Math.random() * 4 + 1);
  }
  lastNum = randNum;
  return randNum;
}

// adding active class to game generated choose
function addActive(id) {
  document.querySelector(`#op${id}`).classList.add("active");
}

// adding  correct class to user choose
function addCorrect(id) {
  document.querySelector(`#op${id}`).classList.add("correct");
}

// game start, btn functionality change from start stop, stop btn click invoke gameOver()
function btnChange() {
  if (!btn.classList.contains("stop")) {
    btn.classList.add("stop");
    btnText.textContent = "Stop";
    gamePlay();
    // if instraction and setting are displaied but start btn pressed, then disply class will be removed
    instractionDiv.classList.remove("display");
    difficultyDiv.classList.remove("display");
  } else {
    gameOver();
  }
}

// main logic
function gamePlay() {
  roundReset();
  play = true;
  id = randGenerator();
  // optionSound.play()
  addActive(id);
  timeClear = setTimeout(gamePlay, speed);
  speed -= msDeductBy;
  if (miss >= 3) {
    gameOver();
  }
}

// reset choose for next round and count for miss
function roundReset() {
  option.forEach((item) => {
    item.classList.remove("active");
    item.classList.remove("correct");
  });
  id = 0;
  // count miss
  if (play && scoreUpdate) miss += 1;
  scoreUpdate = true;
}

////  USER INPUT AND EVALUATION  ///

// listen user click and and evaluate the inpute
option.forEach((item) =>
  item.addEventListener("click", (e) => {
    const userInputId = e.target.id;
    evaluate(userInputId);
  })
);

// evaluate user input againest game choose
function evaluate(userInputId) {
  if (`op${id}` === userInputId) {
    correctSound.play();
    if (scoreUpdate) {
      score += 10;
      scoreSpan.textContent = score;
      scoreUpdate = false; // second or more click on correct choose will not register
      addCorrect(id);
    }
  } else if (play) gameOver();
}

// game over
function gameOver() {
  clearTimeout(timeClear);
  gameEndSound.play();
  callModal();
  play = false;
  roundReset();
}

function callModal() {
  endScoreId.textContent = `${score}`;
  const singleOrNotText = score > 1 ? "carrots" : "carrot";
  singleOrNot.textContent = `${singleOrNotText}`;
  let text = "";
  if (score < 11) {
    text = "You can do better than this! Please try again!";
  } else if (score < 50) {
    text = "You are good! Better next time! I have food for only 2 days.";
  } else if (score < 100) {
    text = "You are greet! More carrot, next time! I have food for 4 days.";
  } else if (score < 150) {
    text = "Excellent! You are awsome! I have food for one week.";
  } else {
    text = "Excellent! You are awsome! I have food for more than one week.";
  }
  endTextRecomendation.textContent = text;
  gameEndModal.style.visibility = "visible";
}

// reset btn to star, score output, game speed,
function totalReset() {
  btn.classList.remove("stop");
  btnText.textContent = "Start";
  score = 0;
  scoreSpan.textContent = score;
  speed = 1000;
  play = false;
  miss = 0;
  gameEndModal.style.visibility = "hidden";
}

//setting the difficulty lebel
diffForm.addEventListener("change", setDifficulty);
btn.addEventListener("click", btnChange);
btnCloseModule.addEventListener("click", totalReset);

// info and setting btn and info and settings div display

nav.addEventListener("click", (e) => {
  if (!play) {
    hideDiv.forEach((item) => item.classList.remove("display"));
    const btnNav = e.target.closest(".btn_nav").dataset.target;
    document.querySelector(`.${btnNav}`).classList.add("display");
  }
});

// removing display class from instraction div by btnClose
btnCloseIns.addEventListener("click", () => {
  instractionDiv.classList.remove("display");
});

// removing display class from difficulty div by btnClose
btnClosedif.addEventListener("click", () => {
  difficultyDiv.classList.remove("display");
});
// all button click will play sounds
document.querySelectorAll("button").forEach((item) => {
  item.addEventListener("click", () => clickSound.play());
});
