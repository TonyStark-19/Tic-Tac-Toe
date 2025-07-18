let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// first turn of O
let turnO = true;

// patterns of winning a match
const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8],
];

// reset game
const resetGame = () => {
    count = 0;
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

var count = 0;

// moves
boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (turnO) {
            box.classList.remove("color");
            box.innerText = "O";
            turnO = false;
        } else {
            box.classList.add("color");
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        count++;

        if (checkWinner()) {
            return;
        }
        if (count === 9) {
            msg.innerText = `The Game is Drawn`;
            msgContainer.classList.remove("hide");
            disableBoxes();
        }

    });
});

// disable boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// enable boxes
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// show winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// check winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);