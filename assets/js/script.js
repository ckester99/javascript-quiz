// Importing questions
var questionsJSON;
fetch("./assets/js/questions.json")
    .then((response) => response.json())
    .then((data) => (questionsJSON = data));

// Organizational elemtents
var body = document.body;
var header = document.createElement("header");
var main = document.createElement("main");

// Header Elements
var highScoreButton = document.createElement("button");
highScoreButton.addEventListener("click", showHighScores);
var timer = document.createElement("p");

// MainScreen elements
var questionContainer = document.createElement("div");
questionContainer.setAttribute(
    "style",
    "position: absolute; left:50%; transform:translate(-50%,0); width:70%; display:flex; flex-direction:column; margin-top:8vh; justify-content:center; align-items:center;"
);
var questionTitle = document.createElement("h1");
questionTitle.setAttribute("style", "font-size:45px; font-weight:bold;");
questionTitle.classList.add("centerText");
var p1 = document.createElement("p");
var startButton = document.createElement("button");
startButton.classList.add("purpleBtn", "centerText");
startButton.addEventListener("click", startGame);
p1.setAttribute("style", "font-size:24px; text-align:center; margin-top:5vh;");
var responses = document.createElement("div");
responses.setAttribute("style", "display:flex; flex-direction:column; max-width:30vw; align-items:flex-start;");

// Game Screen Elements
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
ansButtons[0].addEventListener("click", function () {
    answer(1);
});
ansButtons[1].addEventListener("click", function () {
    answer(2);
});
ansButtons[2].addEventListener("click", function () {
    answer(3);
});
ansButtons[3].addEventListener("click", function () {
    answer(4);
});

var feedbackDisplay = document.createElement("h2");
feedbackDisplay.setAttribute(
    "style",
    "font-size:40px; font-weight:bold; color:#D3D3D3; border-top:5px solid #D3D3D3; margin-top: 5vh; width:100%; padding-top: 2vh;"
);
feedbackDisplay.classList.add("invis");

// Game over screen elements
var h2El = document.createElement("h2");
h2El.setAttribute("style", "font-size:36px; font-weight:normal;");

// Score Submit Form
var scoreSubmitFrm = document.createElement("form");

var frmLabel = document.createElement("label");
frmLabel.setAttribute("for", "initials");
frmLabel.textContent = "Initials:";

var frmInput = document.createElement("input");
frmInput.setAttribute("type", "text");
frmInput.setAttribute("id", "initials");
frmInput.classList.add("lMarg1-5vw");

var frmSubmit = document.createElement("input");
frmSubmit.setAttribute("type", "submit");
frmSubmit.classList.add("purpleBtn");
frmSubmit.classList.add("lMarg1-5vw");
frmSubmit.addEventListener("click", handleFormSubmit);

scoreSubmitFrm.appendChild(frmLabel);
scoreSubmitFrm.appendChild(frmInput);
scoreSubmitFrm.appendChild(frmSubmit);

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "1":
            answer(1);
            break;
        case "2":
            answer(2);
            break;
        case "3":
            answer(3);
            break;
        case "4":
            answer(4);
            break;
    }
});

// High Score Elements
hsUl = document.createElement("ul");

hsNavDiv = document.createElement("div");
backBtn = document.createElement("button");
backBtn.textContent = "Go Back";
backBtn.classList.add("purpleBtn");
backBtn.addEventListener("click", showMainScreen);

clrHighScoresBtn = document.createElement("button");
clrHighScoresBtn.textContent = "Clear High Scores";
clrHighScoresBtn.classList.add("purpleBtn");
clrHighScoresBtn.classList.add("lMarg1-5vw");
hsNavDiv.appendChild(backBtn);
hsNavDiv.appendChild(clrHighScoresBtn);
clrHighScoresBtn.addEventListener("click", function () {
    localStorage.clear();
    genHighScoreLis();
});

// Game Vars
var curQuestion;
var curIndex = 0;
var timerVal = 0;
var gameRunning = false;
var score = 0;
var questions;
var numQuestions;

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
    questionContainer.innerHTML = "";
    questionContainer.setAttribute("style", questionContainer.getAttribute("style") + " align-items:center;");
    questionContainer.appendChild(questionTitle);
    questionTitle.textContent = "Coding Quiz Challenge";
    questionContainer.appendChild(p1);
    p1.textContent =
        "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    questionContainer.appendChild(startButton);
    startButton.textContent = "Start Quiz";
    startButton.setAttribute("style", "margin-top:5vh;");
}

function startGame() {
    score = 0;
    curIndex = 0;
    gameRunning = true;
    questions = randomize(questionsJSON.questions);
    curQuestion = questions[0];
    //Header
    timerVal = 75;
    showTime();
    //Main
    questionContainer.innerHTML = "";
    questionContainer.setAttribute("style", questionContainer.getAttribute("style") + " align-items:start;");

    questionContainer.appendChild(questionTitle);
    questionTitle.setAttribute("style", questionTitle.getAttribute("style") + " margin-bottom: 4vh;");
    questionTitle.classList.remove("centerText");

    questionContainer.appendChild(ansButtons[0]);
    questionContainer.appendChild(ansButtons[1]);
    questionContainer.appendChild(ansButtons[2]);
    questionContainer.appendChild(ansButtons[3]);

    questionContainer.appendChild(feedbackDisplay);
    feedbackDisplay.classList.add("invis");
    feedbackDisplay.textContent = "Correct!";

    setQuestion();
}

function answer(number) {
    if (gameRunning) {
        if (number === curQuestion.sol) {
            feedbackDisplay.textContent = "Correct!";
            feedbackDisplay.classList.remove("invis");
            score += 10;
        } else {
            feedbackDisplay.textContent = "Wrong!";
            feedbackDisplay.classList.remove("invis");
            timerVal -= 10;
        }

        if (curIndex < questions.length - 1) {
            curIndex++;
            curQuestion = questions[curIndex];
            setQuestion();
        } else {
            console.log("here");
            score += timerVal;
            gameOver();
        }
        showTime();
    }
}

setInterval(countDown, 1000);
function countDown() {
    timerVal--;
    if (timerVal <= 0 && gameRunning) {
        gameOver();
    }
    showTime();
}

function showTime() {
    if (timerVal >= 0) {
        timer.textContent = "Time: " + timerVal;
    } else {
        timer.textContent = "Time: 0";
    }
}

function gameOver() {
    gameRunning = false;
    // Main
    questionContainer.innerHTML = "";
    questionContainer.appendChild(questionTitle);
    questionTitle.setAttribute("style", questionTitle.getAttribute("style") + " margin-bottom: 4vh;");
    questionTitle.textContent = "All done!";
    questionContainer.appendChild(h2El);
    h2El.textContent = "Your final score is " + score + ".";
    questionContainer.appendChild(scoreSubmitFrm);
    questionContainer.appendChild(feedbackDisplay);
}

function showHighScores() {
    //Header
    timer.textContent = "Time: 0";
    highScoreButton.textContent = "";
    //Main
    questionContainer.innerHTML = "";
    questionContainer.appendChild(questionTitle);
    questionTitle.textContent = "High Scores";
    questionContainer.appendChild(hsUl);
    questionContainer.appendChild(hsNavDiv);
    genHighScoreLis();
}

function randomize(arr) {
    var i, j, tmp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
    return arr;
}

function getMaxAnsBtnWidth() {
    var maxWdth = 0;
    for (i = 0; i < 4; i++) {
        if (ansButtons[i].clientWidth > maxWdth) {
            maxWdth = ansButtons[i].clientWidth;
        }
    }
    return maxWdth;
}

function setQuestion() {
    var maxWdth;

    questionTitle.textContent = curQuestion.text;

    ansButtons[0].setAttribute("style", "width:auto;");
    ansButtons[1].setAttribute("style", "width:auto;");
    ansButtons[2].setAttribute("style", "width:auto;");
    ansButtons[3].setAttribute("style", "width:auto;");
    ansButtons[0].textContent = "1. " + curQuestion.answers[0];
    ansButtons[1].textContent = "2. " + curQuestion.answers[1];
    ansButtons[2].textContent = "3. " + curQuestion.answers[2];
    ansButtons[3].textContent = "4. " + curQuestion.answers[3];
    maxWdth = getMaxAnsBtnWidth();
    ansButtons[0].setAttribute("style", "width:" + maxWdth + "px;");
    ansButtons[1].setAttribute("style", "width:" + maxWdth + "px;");
    ansButtons[2].setAttribute("style", "width:" + maxWdth + "px;");
    ansButtons[3].setAttribute("style", "width:" + maxWdth + "px;");
}

function handleFormSubmit(event) {
    // Prevent the default behavior
    event.preventDefault();

    var initials = document.getElementById("initials");

    var highScores = [];
    if (localStorage.length > 0) {
        highScores = JSON.parse(localStorage.getItem("highScores"));
    }
    highScores.push([score, initials.value]);
    highScores.sort(function (a, b) {
        return b[0] - a[0];
    });
    localStorage.setItem("highScores", JSON.stringify(highScores));

    console.log(localStorage.getItem("highScores"));
    initials.value = "";

    showHighScores();
}

function genHighScoreLis() {
    hsUl.innerHTML = "";
    if (localStorage.length > 0) {
        var highScores = JSON.parse(localStorage.getItem("highScores"));
        for (i = 0; i < 10 && i < highScores.length; i++) {
            var curScore = highScores[i];
            var curLi = document.createElement("li");
            curLi.textContent = i + 1 + ". " + curScore[1] + ": " + curScore[0];
            if (!(i % 2)) {
                curLi.classList.add("bg-light-purple");
            }
            hsUl.appendChild(curLi);
        }
    }
}
