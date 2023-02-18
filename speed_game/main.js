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
const option = document.querySelectorAll('.option')
const scoreSpan = document.querySelector('#scoreUpdate')

// GLOBAL variables

let lastNum = 0 //global veriable for randGenerator
let id = 0 //global veriable for game generated id
let score = 0
let miss = 0;
let scoreUpdate = true
const t = 3000
const play = true


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
}
function addActive (id) {
  document.querySelector(`#op${id}`).classList.add('active')
}
function removeActive (id) {
  document.querySelector(`#op${id}`).classList.remove('active')
}
function addCorrect (id) {
  document.querySelector(`#op${id}`).classList.remove('correct')
}
function removeCorrect (id) {
  document.querySelector(`#op${id}`).classList.remove('correct')
}
// detect click from option div
// function userInputOption(e) {
//   return e.target.id;
// }

// start and stop class adding and changing btn text

function startStop () {}
// event listeners

// detecting user input

function evaluate (circle) {
  if (`op${id}` === circle.id) {
    if (scoreUpdate) {
      score++
      scoreSpan.textContent = score
      scoreUpdate = false
    }
  } else if (circle.classList.contains('option')) {
    console.log('game Over')
  }
}

function gameReset () {
  removeActive(id)
  id = 0
  // count miss
  if (scoreUpdate) miss += 1
  console.log(miss)
  scoreUpdate = true
}

function gamePlay () {
  gameInput()
  option.forEach((item, index) =>
    item.addEventListener('click', (e) => {
      evaluate(e.target)
    })
  )
  setTimeout(gameReset, t-10)
}
setInterval(gamePlay, t)
// setInterval(gamePlay, t)
