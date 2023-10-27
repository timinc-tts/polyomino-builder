export function generateBoard(width, height, { emptyValue = undefined, cellValue = () => emptyValue } = {}) {
  const blankBoard = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    blankBoard.push(row);
    for (let x = 0; x < width; x++) {
      const cell = cellValue(x, y);
      row.push(cell);
    }
  }
  return blankBoard;
}

export function resizeBoard(board, width, height, emptyValue) {
  return generateBoard(width, height, {
    emptyValue,
    cellValue: (x, y) => getBoardWidth(board) > x && getBoardHeight(board) > y ? getBoardCell(board, x, y) : emptyValue
  })
}

export function getBoardWidth(board) {
  return board[0].length
}

export function getBoardHeight(board) {
  return board.length
}

export function getBoardCell(board, x, y) {
  return board[y][x];
}

export function setBoardCell(board, x, y, newValue) {
  const iBoard = JSON.parse(JSON.stringify(board));
  iBoard[y][x] = newValue;
  return iBoard;
}