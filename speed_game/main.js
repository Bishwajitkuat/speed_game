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
const scoreUpdate = document.querySelector('#scoreUpdate')

// GLOBAL variables

let lastNum = 0 //global veriable for randGenerator
let id //global veriable for game generated id
let score = 0
let userId = 0
let t = 3000
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
function game () {
  id = randGenerator()
  addActive(id)
}
function addActive (id) {
  document.querySelector(`#op${id}`).classList.add('active')
}
function removeActive (id) {
  document.querySelector(`#op${id}`).classList.remove('active')
}
function addCorrect(id) {
  document.querySelector(`#op${id}`).classList.remove('correct')
}
function removeCorrect(id) {
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

option.forEach((item, index) =>
  item.addEventListener('click', () => {
    userId = index + 1
  })
)

function evaluate () {
  if (id === userId) {
    score++
    scoreUpdate.textContent = score
  }
  removeActive(id)
  id = 0
  userId = 0
  t -= 500
}
game()

function gameReset () {
  evaluate()
  game()
}

let inter = setInterval(gameReset, t)

// setInterval(gamePlay, t)
