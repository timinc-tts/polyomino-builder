import PropTypes from "prop-types";
import { useMemo } from "react";
import { getBoardHeight, getBoardWidth } from "../util/board";
import polyStyle from "./Polyomino.module.css";
import { csx } from "../util/cssClasses";

export default function Polyomino({ cells, onClick = () => {} }) {
  const width = useMemo(() => getBoardWidth(cells), [cells]);
  const height = useMemo(() => getBoardHeight(cells), [cells]);
  const maxDim = useMemo(() => Math.max(width, height), [height, width]);

  return (
    <div className={polyStyle.board} onClick={onClick}>
      <div
        className={polyStyle.innerBoard}
        style={{
          width: `calc(100% / ${maxDim} * ${width})`,
          height: `calc(100% / ${maxDim} * ${height})`,
        }}
      >
        {cells.map((row, y) => (
          <>
            {row.map((cell, x) => (
              <button
                key={`cell-${x}-${y}`}
                className={csx(
                  polyStyle.cell,
                  cell ? polyStyle.enabled : polyStyle.disabled
                )}
                style={{
                  width: `${(1 / maxDim / ((1 / maxDim) * width)) * 100}%`,
                  height: `${(1 / maxDim / ((1 / maxDim) * height)) * 100}%`,
                }}
              />
            ))}
          </>
        ))}
      </div>
    </div>
  );
}

Polyomino.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)),
  onClick: PropTypes.func,
};
