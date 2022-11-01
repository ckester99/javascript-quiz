// Organizational elemtents
var body = document.body;
var header = document.createElement("header");
var main = document.createElement("main");

// Header Elements
var highScoreButton = document.createElement("button");
var timer = document.createElement("p");

//Main elements
var questionContainer = document.createElement("div");
questionContainer.setAttribute(
    "style",
    "position: absolute; left:50%; transform:translate(-50%,0); width:70%; display:flex; flex-direction:column; margin-top:8vh; justify-content:center; align-items:center;"
);
var questionTitle = document.createElement("h1");
questionTitle.setAttribute("style", "font-size:45px; font-weight:bold; text-align: center;");
var p1 = document.createElement("p");
var startButton = document.createElement("button");
startButton.classList.add("purpleBtn");
p1.setAttribute("style", "font-size:24px; text-align:center; margin-top:5vh;");
var responses = document.createElement("div");
responses.setAttribute("style", "display:flex; flex-direction:column; max-width:30vw; align-items:flex-start;");
////These will be the buttons that the user can click on to answer
var ansButtons = [
    document.createElement("button"),
    document.createElement("button"),
    document.createElement("button"),
    document.createElement("button"),
];
ansButtons[0].classList.add("purpleBtn");
ansButtons[1].classList.add("purpleBtn");
ansButtons[2].classList.add("purpleBtn");
ansButtons[3].classList.add("purpleBtn");

var currentAnswer = 0;

// Organizing DOM
body.appendChild(header);
body.appendChild(main);

showMainScreen();

// Function Definitions

function showMainScreen() {
    //Header
    header.innerHTML = "";
    header.appendChild(highScoreButton);
    header.appendChild(timer);
    highScoreButton.textContent = "View High Scores";
    timer.textContent = "Time: 0";
    //Main
    main.innerHTML = "";
    main.appendChild(questionContainer);
    questionContainer.appendChild(questionTitle);
    questionTitle.textContent = "Coding Quiz Challenge";
    questionContainer.appendChild(p1);
    p1.textContent =
        "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    questionContainer.appendChild(startButton);
    startButton.textContent = "Start Quiz";
    startButton.setAttribute("style", "margin-top:5vh;");
}

function startGame() {}

function answer(number) {
    if (number === currentAnswer) {
    }
}

function gameOver(score) {}

function showHighScores() {}
