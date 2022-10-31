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
var responses = document.createElement("div");
responses.setAttribute("id", "responses");
////These will be the buttons that the user can click on to answer
var ansButtons = [
    document.createElement("button"),
    document.createElement("button"),
    document.createElement("button"),
    document.createElement("button"),
];

// Organizing DOM
body.appendChild(header);
body.appendChild(main);
header.appendChild(highScoreButton);
header.appendChild(timer);
main.appendChild(questionContainer);
questionContainer.appendChild(questionTitle);
questionContainer.appendChild(responses);
responses.appendChild(ansButtons[0]);
responses.appendChild(ansButtons[1]);
responses.appendChild(ansButtons[2]);
responses.appendChild(ansButtons[3]);

init();

function init() {
    //Header
    highScoreButton.textContent = "View High Scores";
    timer.textContent = "Time:";
    //Main
    questionTitle.textContent = "Question Content";
    ansButtons[0].textContent = "Question 1";
    ansButtons[1].textContent = "Question 2";
    ansButtons[2].textContent = "Question 3";
    ansButtons[3].textContent = "Question 4";
}
