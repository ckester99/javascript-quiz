// Organizational elemtents
var body = document.body;
var header = document.createElement("header");
var main = document.createElement("main");

// Header Elements
var highScoreButton = document.createElement("button");
var timer = document.createElement("p");

//Main elements
var questionContainer = document.createElement("div");
questionContainer.setAttribute("id", "questionContainer");
var questionTitle = document.createElement("h1");
var p1 = document.createElement("p");
var startButton = document.createElement("button");
startButton.classList.add("purpleBtn");
p1.setAttribute("style", "font-size: 24px;text-align: center; margin-top: 5vh");
var responses = document.createElement("div");
responses.setAttribute("id", "responses");
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

init();

// Function Definitions

function init() {
    //Header
    header.innerHTML = "";
    header.appendChild(highScoreButton);
    header.appendChild(timer);
    highScoreButton.textContent = "View High Scores";
    timer.textContent = "Time: 0";
    //Main
    main.innerHTML = "";
    main.appendChild(questionContainer);
    questionContainer.setAttribute("style", "justify-content: center");
    questionContainer.appendChild(questionTitle);
    questionTitle.textContent = "Coding Quiz Challenge";
    questionTitle.setAttribute("style", "text-align:center");
    questionContainer.appendChild(p1);
    p1.textContent =
        "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    questionContainer.appendChild(startButton);
    startButton.textContent = "Start Quiz";
    startButton.setAttribute("style", "margin-top:5vh;");
}

function answer(number) {
    if (number === currentAnswer) {
    }
}
