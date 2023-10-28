import PropTypes from "prop-types";
import { csx } from "../util/cssClasses";
import { useCallback } from "react";

import gridStyle from "./Grid.module.css";
import { getBoardCell } from "../util/board";

/**
 * Allows the user to turn cells on/off on a 2D grid of a given width and height.
 */
export default function Grid({ cells, toggleCell, onSetCenter, center }) {
  const handleToggle = useCallback(
    (x, y, e) => {
      if (e.shiftKey) {
        if (JSON.stringify(center) === JSON.stringify({ x, y })) {
          onSetCenter(null);
        } else {
          onSetCenter(x, y);
          if (!getBoardCell(cells, x, y)) {
            toggleCell(x, y);
          }
        }
      } else {
        toggleCell(x, y);
      }
    },
    [cells, center, onSetCenter, toggleCell]
  );

  return (
    <div className={gridStyle.board}>
      {cells.map((row, y) => (
        <div key={`row-${y}`} className={gridStyle.row}>
          {row.map((cell, x) => (
            <button
              key={`cell-${x}-${y}`}
              onClick={(e) => handleToggle(x, y, e)}
              className={csx(
                gridStyle.cell,
                cell ? gridStyle.enabled : gridStyle.disabled,
                JSON.stringify(center) === JSON.stringify({ x, y }) &&
                  gridStyle.center
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

Grid.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)),
  toggleCell: PropTypes.func,
  onSetCenter: PropTypes.func,
  center: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};
