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

export function getFirstColumnWhereAny(board, cellPredicate) {
  const width = getBoardWidth(board);
  const height = getBoardHeight(board);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (cellPredicate(getBoardCell(board, x, y))) {
        return x;
      }
    }
  }
}

export function getFirstRowWhereAny(board, cellPredicate) {
  const width = getBoardWidth(board);
  const height = getBoardHeight(board);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (cellPredicate(getBoardCell(board, x, y))) {
        return y;
      }
    }
  }
}

export function getLastColumnWhereAny(board, cellPredicate) {
  const width = getBoardWidth(board);
  const height = getBoardHeight(board);

  for (let x = width - 1; x >= 0; x--) {
    for (let y = 0; y < height; y++) {
      if (cellPredicate(getBoardCell(board, x, y))) {
        return x;
      }
    }
  }
}

export function getLastRowWhereAny(board, cellPredicate) {
  const width = getBoardWidth(board);
  const height = getBoardHeight(board);

  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      if (cellPredicate(getBoardCell(board, x, y))) {
        return y;
      }
    }
  }
}

export function getSubBoard(board, minX, minY, maxX, maxY) {
  return generateBoard(maxX - minX + 1, maxY - minY + 1, { cellValue: (x, y) => getBoardCell(board, x + minX, y + minY) })
}

export function getTrueSubBoard(board, center) {
  const minX = (getFirstColumnWhereAny(board, (v) => v));
  const minY = (getFirstRowWhereAny(board, (v) => v));
  const maxX = (getLastColumnWhereAny(board, (v) => v));
  const maxY = (getLastRowWhereAny(board, (v) => v));
  return {
    cells: getSubBoard(board, minX, minY, maxX, maxY),
    center: {
      x: center.x - minX,
      y: center.y - minY
    }
  }
}