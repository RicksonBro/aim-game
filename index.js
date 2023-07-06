const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colorList = ['red', 'green', 'skyblue', 'white', 'yellow', 'purple'];
let intervalIDs; 
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        startGame();
    }
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    if (timeEl.parentNode.classList.contains('hide')) {
        timeEl.parentNode.classList.remove('hide');
    }
    intervalIDs = setInterval(decreaseTime, 1000);
    screens[1].classList.add('up');
    createRandomCircle();
    setTime(time);
}


function decreaseTime() {
    if (time === 0) {
        finishGame();
        clearInterval(intervalIDs);
        intervalIDs = null;
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Your score: <span class='primary'>${score}</span></h1><button class="btn-restart" onclick="restartGame()">Try again</button>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = colorList[getRandomNumber(0, colorList.length - 1)];

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function restartGame() {
    board.innerHTML = "";
    screens[1].classList.remove('up');
}