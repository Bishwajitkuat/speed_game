'use strict'

const btn = document.querySelector('#btn')
const btnText = document.querySelector('#btnText')
const option = document.querySelectorAll('.option')
const scoreSpan = document.querySelector('#scoreUpdate')
const btn_close_module = document.querySelector('#btn_close_module')
const gameEndModal = document.querySelector('.game_end')
const endScoreId = document.querySelector('#end_score_id')
const singleOrNot = document.querySelector('#singleOrNot')
const endTextRecomendation = document.querySelector('.end_text_recomendation')
const instractionDiv = document.querySelector('.instraction')
const difficultyDiv = document.querySelector('.difficulty')
const diffForm = document.querySelector('form')
const nav = document.querySelector('nav')
const btnCloseIns = document.querySelector('#btnCloseIns')
const btnClosedif = document.querySelector('#btnClosedif')

// GLOBAL variables

let lastNum = 0            //global veriable for randGenerator
let id = 0                //global veriable for game generated id
let score = 0            //global, total score by user
let miss = 0           // global, total miss by user 
let scoreUpdate = true  //global, check only one click is registered for correct answer 
let speed = 1000        // initial interval, reduce in per cycle
let timeClear          // global, reference to clear setTimeout() 
let intervalClear      // global, reference to clear setInterval()
let play = false
let msDeductBy = 5

//setting the difficulty lebel
diffForm.addEventListener('change', setDifficulty)

// difficulty setter
function setDifficulty(e) {
  if (e.target.id === 'easy') {
    msDeductBy = 5
  } else if (e.target.id === 'normal') {
    msDeductBy = 10
  }   if (e.target.id === 'hard') {
    msDeductBy = 15
  }
}

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
    // if instraction and setting are displaied but start btn pressed, then disply class will be removed will be removed
    instractionDiv.classList.remove('display')
    difficultyDiv.classList.remove('display')
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
  speed = 1000
  play = false
  gameEndModal.style.visibility = 'hidden'
}


// evaluate user input againes game choose

function evaluate (userChooseId, userChooseWrong) {
  if (`op${id}` === userChooseId) {
    if (scoreUpdate) {
      score +=10
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

function gamePlay() {
  gameReset()
  gameInput()
  timeClear = setTimeout(gamePlay, speed)
  speed -=msDeductBy
  if (miss >= 5) {
    gameOver()
  }
}

function callModal() {
  endScoreId.textContent = `${score}`
  const singleOrNotText = score >1 ? 'carrots' : 'carrot'
  singleOrNot.textContent = `${singleOrNotText}`
  let text = ''
  if (score < 50) {
    text = 'You are good! Better next time! I have food for only 2 days.'
  } else if (score < 100) {
    text = 'You are greet! More carrot, next time! I have food for 4 days.'
  } else if (score < 150) {
    text = 'Excellent! You are awsome! I have food for one week.'
  } else {
    text = 'Excellent! You are awsome! I have food for more than one week.'
  }
  endTextRecomendation.textContent = text
  gameEndModal.style.visibility = 'visible'
}

// game over
function gameOver() {
  clearTimeout(timeClear)
  clearInterval(intervalClear)
  callModal()
  play = false
  gameReset()
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
btn_close_module.addEventListener('click', totalReset)

// info and setting btn and info and settings div display

nav.addEventListener('click', (e) => {
    if (!play) {
    const btnNav = e.target.closest('.btn_nav')
      if (btnNav.id === 'info') {
        instractionDiv.classList.toggle('display')
   
      } else if (btnNav.id === 'settings') {
        difficultyDiv.classList.toggle('display')
    }
  }
  })
 // removing display class from instraction div by btnClose
btnCloseIns.addEventListener('click', () => {
  instractionDiv.classList.remove('display')
 })

 // removing display class from difficulty div by btnClose

btnClosedif.addEventListener('click', () => {
  difficultyDiv.classList.remove('display')
 })
