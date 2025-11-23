"use strict";
/*
================================================
HEAD
================================================
*/
const head = document.querySelector("head");
if (head) {
    const style = document.createElement("style");
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            overflow: hidden;
        }

        body {
            text-align: center;
            background-color: #333;
        }
    `;
    head.appendChild(style);
}
/*
================================================
BODY
================================================
*/
const body = document.querySelector("body");
const fancyWords = async (dom, string, colors) => {
    randomPosition(dom);
    dom.innerHTML = "";
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    for (let i = 0; i < string.length; i++) {
        await sleep(150);
        dom.innerHTML += `<span style="color: ${colors[Math.floor(Math.random() * colors.length)]}">${string[i]}</span>`;
        dom.style.transition = `1.5s ease-out`;
    }
};
const delay = (fn, ms) => {
    setInterval(fn, Math.floor(Math.random() * 200) + ms * 350);
};
const randomPosition = (dom) => {
    const domWidth = dom.getBoundingClientRect().width;
    const domHeight = dom.getBoundingClientRect().height;
    dom.style.transform = `translate(${Math.floor(Math.random() * (window.innerWidth - domWidth))}px, ${Math.floor(Math.random() * (window.innerHeight - domHeight))}px)`;
};
if (body) {
    body.style.height = "calc(100vh - 80px)";
    body.style.width = "100vw";
    const titleContent = `Created By: Audy Sain`.split("");
    const title = document.createElement("h1");
    const colors = ["#7048e8", "#4263eb", "#1c7ed6", "#1098ad", "#0ca678", "#37b24d", "#74b816"];
    body.appendChild(title);
    title.style.position = "absolute";
    title.style.userSelect = "none";
    title.addEventListener('mouseover', () => {
        randomPosition(title);
    });
    fancyWords(title, titleContent, colors);
    delay(() => fancyWords(title, titleContent, colors), titleContent.length);
    /*
    ================================================
    BODY > HEADER
    ================================================
    */
    const header = document.createElement("header");
    header.style.position = "fixed";
    header.style.height = `80px`;
    header.style.width = "100vw";
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.gap = '20px';
    header.style.padding = "20px";
    header.style.marginBottom = "20px";
    header.style.backgroundColor = "#333";
    header.style.zIndex = "1000";
    header.style.borderBottom = `2px solid ${colors[Math.floor(Math.random() * colors.length)]}`;
    body.prepend(header);
    const menuItems = ["Home", "Projects", "Contact"];
    const unorderList = document.createElement("ul");
    unorderList.style.display = "flex";
    unorderList.style.gap = '20px';
    header.appendChild(unorderList);
    menuItems.forEach(li => {
        const list = document.createElement("li");
        list.style.display = "inline-block";
        list.textContent = li;
        list.style.cursor = "pointer";
        list.style.color = `${colors[Math.floor(Math.random() * colors.length)]}`;
        unorderList.appendChild(list);
    });
    /*
    ================================================
    BODY > Ball
    ================================================
    */
    const ball = document.createElement("div");
    ball.style.height = "50px";
    ball.style.width = "50px";
    ball.style.borderRadius = "50%";
    ball.style.backgroundColor = "#fff";
    ball.style.position = "absolute";
    ball.className = "ball";
    body.appendChild(ball);
    let ballMove = true;
    if (ball.getBoundingClientRect().right === 0) {
        ballMove = false;
    }
    else if (ball.getBoundingClientRect().left === 0) {
        ballMove = false;
    }
    /*
    ================================================
    BODY > PADDLES
    ================================================
    */
    const leftPaddle = document.createElement("div");
    leftPaddle.style.position = "absolute";
    leftPaddle.style.height = "200px";
    leftPaddle.style.width = "50px";
    leftPaddle.style.left = "20px";
    leftPaddle.style.borderRadius = "8px";
    leftPaddle.style.backgroundColor = "#fff";
    body.appendChild(leftPaddle);
    const rightPaddle = document.createElement("div");
    rightPaddle.style.position = "absolute";
    rightPaddle.style.height = "200px";
    rightPaddle.style.width = "50px";
    rightPaddle.style.right = "20px";
    rightPaddle.style.borderRadius = "8px";
    rightPaddle.style.backgroundColor = "#fff";
    body.appendChild(rightPaddle);
    body.addEventListener('mousemove', (e) => {
        const height = window.innerHeight;
        const positionY = e.clientY;
        leftPaddle.style.transform = `translateY(${height - positionY - 200}px)`;
        rightPaddle.style.transform = `translateY(${positionY - 200}px)`;
    });
    /*
    ================================================
    BODY > SCORE BOARD
    ================================================
    */
    let score = 0;
    let highScore = 0;
    const scoreBoard = document.createElement("div");
    scoreBoard.style.color = `${colors[Math.floor(Math.random() * colors.length)]}`;
    scoreBoard.textContent = "Score";
    header.appendChild(scoreBoard);
    const points = document.createElement("p");
    points.textContent = String(score);
    scoreBoard.appendChild(points);
    /*
    ================================================
    BODY > GAME
    ================================================
    */
    let gameRunning = true;
    const gameWidth = window.innerWidth;
    const gameHeight = window.innerHeight;
    let position = { "x": gameWidth / 2, "y": 500 };
    let directionX = "right";
    let directionY = "up";
    const ballColor = (dom) => {
        dom.style.backgroundColor = `${colors[Math.floor(Math.random() * colors.length)]}`;
    };
    const stopGame = () => {
        gameRunning = false;
        if (score > highScore) {
            highScore = score;
        }
    };
    const updateScore = () => {
        score++;
        points.textContent = String(score);
    };
    const startGame = () => {
        if (!gameRunning)
            return;
        // X Direction
        if (directionX === "left") {
            position.x -= 2;
        }
        else if (directionX === "right") {
            position.x += 2;
        }
        // Y Direction
        if (directionY === "up") {
            position.y -= 2;
        }
        else if (directionY === "down") {
            position.y += 2;
        }
        if (ball.getBoundingClientRect().top <= 80) {
            directionY = "down";
        }
        else if (ball.getBoundingClientRect().bottom >= gameHeight - 10) {
            directionY = "up";
        }
        if (leftPaddle.getBoundingClientRect().top < ball.getBoundingClientRect().top && leftPaddle.getBoundingClientRect().bottom > ball.getBoundingClientRect().bottom && ball.getBoundingClientRect().left < leftPaddle.getBoundingClientRect().right) {
            updateScore();
            directionX = "right";
            ballColor(ball);
        }
        else if (rightPaddle.getBoundingClientRect().top < ball.getBoundingClientRect().top && rightPaddle.getBoundingClientRect().bottom > ball.getBoundingClientRect().bottom && ball.getBoundingClientRect().right > rightPaddle.getBoundingClientRect().left) {
            updateScore();
            directionX = "left";
            ballColor(ball);
        }
        ball.style.transform = `translate(${position.x}px, ${position.y}px)`;
        if (ball.getBoundingClientRect().left <= 50 || ball.getBoundingClientRect().right >= gameWidth - 50) {
            stopGame();
        }
        requestAnimationFrame(startGame);
    };
    startGame();
}
