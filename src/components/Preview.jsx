import PropTypes from "prop-types";
import Polyomino from "./Polyomino";

export default function Preview({ list }) {
  return (
    <div style={{ display: "flex", gap: 5 }}>
      {list.map((polyomino, i) => (
        <Polyomino cells={polyomino} key={i} />
      ))}
    </div>
  );
}

Preview.propTypes = {
  list: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool))),
};
