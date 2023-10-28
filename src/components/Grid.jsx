import PropTypes from "prop-types";
import gridStyle from "./Grid.module.css";
import { csx } from "../util/cssClasses";

/**
 * Allows the user to turn cells on/off on a 2D grid of a given width and height.
 */
export default function Grid({ cells, toggleCell }) {
  return (
    <div className={gridStyle.board}>
      {cells.map((row, y) => (
        <div key={`row-${y}`} className={gridStyle.row}>
          {row.map((cell, x) => (
            <button
              key={`cell-${x}-${y}`}
              onClick={() => toggleCell(x, y)}
              className={csx(
                gridStyle.cell,
                cell ? gridStyle.enabled : gridStyle.disabled
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
};
