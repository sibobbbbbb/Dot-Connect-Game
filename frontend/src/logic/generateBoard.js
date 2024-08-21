const generateBoard = (difficulty) => {
    let boardSpec;

    switch (difficulty) {
        case 'beginner':
            boardSpec = { rows: 5, cols: 5};
            break;
        case 'easy':
            boardSpec = { rows: 8, cols: 6};
            break;
        case 'medium':
            boardSpec = { rows: 10, cols: 6};
            break;
        case 'hard':
            boardSpec = { rows: 12, cols: 8};
            break;
        default:
            boardSpec = { rows: 0, cols: 0};
            break;
    }

    const { rows, cols} = boardSpec;

    let board = Array.from({ length: rows }, () => Array(cols).fill(0));

    // randomize jumlah tembok
    const totalCells = rows * cols;
    const nTembok = Math.floor(totalCells * 0.1);

    // randomize posisi 
    const getRandomPosition = () => {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        return { row, col };
    };

    // start posisi
    let startPosition = getRandomPosition();
    board[startPosition.row][startPosition.col] = 2;

    // randomize posisi tembok
    let tembok = 0;
    while (tembok < nTembok) {
        let position = getRandomPosition();
        if (board[position.row][position.col] === 0) {
            board[position.row][position.col] = 1;
            tembok++;
        }
    }

    return board;
};

export default generateBoard;