import PropTypes from "prop-types";
import Polyomino from "./Polyomino";

import previewStyles from "./Preview.module.css";

export default function Preview({ list, onRemove }) {
  return (
    <div className={previewStyles.container}>
      {list.map(({ cells, center }, i) => (
        <Polyomino
          cells={cells}
          center={center}
          key={i}
          onClick={() => onRemove(i)}
        />
      ))}
    </div>
  );
}

Preview.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)),
      center: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    })
  ),
  onRemove: PropTypes.func,
};
