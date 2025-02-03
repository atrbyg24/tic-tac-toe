/*
The Gameboard represents the state of teh baord
Each square holds a Cell (defined later)
*/

function Gameboard() {
    const board = [];

    for (let i = 0; i < 3; i ++) {
        board[i] = [];
        for (let j = 0; j < 0;j++){
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

    return { getBoard, markCell, printBoard};
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
        changeCell,getValue
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
            mark: 1
        },
        {
            name: playerTwoName,
            mark: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printNewRound;
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (row,col) => {
        console.log(`Marking cell ${row},${col}...`);
        board.markCell(row,col,getActivePlayer.mark);
    }

    switchPlayerTurn();
    printNewRound();
}