/* eslint-disable spaced-comment */
'use strict'

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

const btn = document.querySelector('#btn')
const btnText = document.querySelector('#btnText')
const option = document.querySelectorAll('.option')
const scoreSpan = document.querySelector('#scoreUpdate')

// GLOBAL variables

let lastNum = 0            //global veriable for randGenerator
let id = 0                //global veriable for game generated id
let score = 0            //global, total score by user
let miss = 0           // global, total miss by user 
let scoreUpdate = true  //global, check only one click is registered for correct answer 
let speed = 3000        // initial interval, reduce in per cycle
let timeClear          // global, reference to clear setTimeout() 
let intervalClear      // global, reference to clear setInterval()
let play = false




//random number generator
function randGenerator () {
  let randNum = Math.floor(Math.random() * 4 + 1)
  while (lastNum === randNum) {
    randNum = Math.floor(Math.random() * 4 + 1)
  }
  lastNum = randNum
  return randNum
}
// game input, adding and removing active class to choose
function gameInput () {
  id = randGenerator()
  addActive(id)
  play = true
}

// adding and removing active class to game generated choose
function addActive (id) {
  document.querySelector(`#op${id}`).classList.add('active')
}
function removeActive (id) {
  const eli = document.querySelector(`#op${id}`)
  if (eli.classList.contains('active')) {
    eli.classList.remove('active')
  }
}

// adding and removing correct class to user choose
function addCorrect (id) {
  document.querySelector(`#op${id}`).classList.add('correct')
}
function removeCorrect(id) {
  const eli = document.querySelector(`#op${id}`)
  if (eli.classList.contains('correct')) {
    eli.classList.remove('correct')
  }
}

// game start, btn functionality change from start stop, stop btn click invoke gameOver()  
function btnChange() {
  if (!btn.classList.contains("stop")) {
    btn.classList.add('stop')
    btnText.textContent = 'Stop'
    intervalClear = setInterval(gamePlay, speed)
  } else {
    gameOver()
  }
}

// reset btn to star, score output, game speed, 

function totalReset() {
  // restore btn to start
  btn.classList.remove('stop')
  btnText.textContent = 'Start'
  // reset score to initial for next game
  score = 0
  // reset score outpu for next game
  scoreSpan.textContent = score
  // reset speed for next game
  speed = 3000
  play = false
}


// evaluate user input againes game choose

function evaluate (userChooseId, userChooseWrong) {
  if (`op${id}` === userChooseId) {
    if (scoreUpdate) {
      score++
      scoreSpan.textContent = score
      scoreUpdate = false
      addCorrect(id)
    }
  } else if (userChooseWrong && play) {
    gameOver()
  }
}

function gameReset () {
  id ?removeActive(id):''
  id ?removeCorrect(id):''
  id = 0
  // count miss
  if (scoreUpdate) miss += 1
  scoreUpdate = true
}

function gamePlay () {
  gameInput()
  timeClear = setTimeout(gameReset, speed - 10)
  speed *=0.75
  if (miss >= 5) {
    gameOver()
  }
}

// game over
function gameOver() {
  clearTimeout(timeClear)
  clearInterval(intervalClear)
  // callModal()
  play = false
  gameReset()
  console.log('Game over');
  totalReset()
}

// listen user click and and evaluate the inpute
option.forEach((item, index) =>
    item.addEventListener('click', (e) => {
      const userChooseId = e.target.id
      const userChooseWrong = e.target.classList.contains('option')
      evaluate(userChooseId, userChooseWrong)
    })
)
 
btn.addEventListener('click', btnChange)

// setInterval(gamePlay, t)
