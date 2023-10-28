import { useCallback, useState } from "react";
import { generateBoard, getBoardCell, setBoardCell } from "../util/board";

/**
 * Keeps track of a 2D grid of cells that can either be on or off.
 */
export default function useBooleanGrid(width, height) {
  const [cells, setCells] = useState(generateBoard(width, height, { emptyValue: false }));

  const toggleCell = useCallback((x, y) => {
    setCells((p) => setBoardCell(p, x, y, !getBoardCell(p, x, y)))
  }, [])

  const clearGrid = useCallback(() => {
    setCells(generateBoard(width, height, { emptyValue: false }))
  }, [height, width])

  return {
    cells,
    toggleCell,
    clearGrid
  }
}