/*
The Gameboard represents the state of teh baord
Each square holds a Cell (defined later)
*/

function Gameboard() {
    const board = [];

    for (let i = 0; i < 3; i ++) {
        board[i] = [];
        for (let j = 0; j < 3;j++){
            board[i].push(Cell())
        }
    }

    const getBoard = () => board;

    const markCell = (row,col,playerMark) => {
        board[row][col].changeCell(playerMark);
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }

    return { 
        getBoard, markCell, printBoard
    };
}


/*
A Cell represents one square on the board and can be
0: square is empty
1: Player One marked the square
2: Player Two marked the square
*/
function Cell() {
    let value = 0;
    
    const changeCell = (playerMark) => {
        value = playerMark;
    }

    const getValue = () => value;

    return {
        changeCell, getValue
    };
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            mark: 1,
            score: 0
        },
        {
            name: playerTwoName,
            mark: 2,
            score: 0
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;
    let gameOver = false;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (row,col) => {
        console.log(`Marking cell ${row},${col}...`);
        board.markCell(row,col,getActivePlayer().mark);
        switchPlayerTurn();
        printNewRound();
    }

    const checkGameWinner = () => {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0].getValue() === board[i][1].getValue() && board[i][1].getValue() === board[i][2].getValue() && board[i][0].getValue() !== 0) {
                return true;
            }
        }
        // Check columns
        for (let j = 0; j < 3; j++) {
            if (board[0][j].getValue() === board[1][j].getValue() && board[1][j].getValue() === board[2][j].getValue() && board[0][j].getValue() !== 0) {
                return true;
            }
        }
        // Check diagonals
        if (board[0][0].getValue() === board[1][1].getValue() && b[1][1].getValue() === board[2][2].getValue() && board[0][0].getValue() !== 0) {
            return true;
        }
        if (board[0][2].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][0].getValue() && board[0][2].getValue() !== 0) {
            return true;
        }
        return false;
    }

    const checkGameDraw = () => {
        for (let i = 0; i < 3;i++) {
            for (let j = 0;j < 3;j++) {
                if (board[i][j].getValue === 0) {
                    return false
                }
            }
        }
        return true;
    }

    printNewRound();

    return {
        playRound, getActivePlayer, getBoard: board.getBoard
        };
}

function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        boardDiv.textContent = "";
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

        board.forEach((row,row_index) => {
            row.forEach((cell, col_index) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = row_index;
                cellButton.dataset.column = col_index;
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);    
            
            })
        })
    }

    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        if (!selectedRow || !selectedColumn) return;

        game.playRound(selectedRow,selectedColumn);
        updateScreen();
    }

    boardDiv.addEventListener("click",clickHandlerBoard);
    updateScreen();
}

ScreenController();