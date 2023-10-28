import PropTypes from "prop-types";
import Polyomino from "./Polyomino";

import previewStyles from "./Preview.module.css";

export default function Preview({ list, onRemove }) {
  return (
    <div className={previewStyles.container}>
      {list.map((polyomino, i) => (
        <Polyomino cells={polyomino} key={i} onClick={() => onRemove(i)} />
      ))}
    </div>
  );
}

Preview.propTypes = {
  list: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool))),
  onRemove: PropTypes.func,
};
