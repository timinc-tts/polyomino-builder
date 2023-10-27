import PropTypes from "prop-types";
import { useEffect } from "react";
import useBooleanGrid from "../hooks/useBooleanGrid";
import gridStyle from "./Grid.module.css";

/**
 * Allows the user to turn cells on/off on a 2D grid of a given width and height.
 */
export default function Grid({ height, width, onChange = () => {} }) {
  const { cells, toggleCell } = useBooleanGrid(width, height);

  useEffect(() => {
    onChange(cells);
  }, [cells, onChange]);

  return (
    <div className={gridStyle.board}>
      {cells.map((row, y) => (
        <div key={`row-${y}`} className={gridStyle.row}>
          {row.map((cell, x) => (
            <div
              key={`cell-${x}-${y}`}
              onClick={() => toggleCell(x, y)}
              className={gridStyle.cell}
            >
              {cell ? 1 : 0}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

Grid.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  onChange: PropTypes.func,
};
