import { useCallback, useState } from "react";
import Grid from "./components/Grid";
import Preview from "./components/Preview";
import useBooleanGrid from "./hooks/useBooleanGrid";
import { getTrueSubBoard } from "./util/board";

import appStyle from "./App.module.css";
import "./style.css";

function App() {
  const { cells, toggleCell, clearGrid } = useBooleanGrid(10, 10);
  const [polyominos, setPolyominos] = useState([]);

  const handleAdd = useCallback(() => {
    const trueBoard = getTrueSubBoard(cells);
    if (trueBoard.length === 0) {
      return;
    }
    setPolyominos((p) => [...p, trueBoard]);
    clearGrid();
  }, [cells, clearGrid]);

  return (
    <>
      <h1>Tabletop Simulator Polyomino Builder</h1>
      <Grid cells={cells} toggleCell={toggleCell} />
      <button onClick={handleAdd} className={appStyle.button}>
        Add
      </button>
      <Preview list={polyominos} />
      <button className={appStyle.button}>Download</button>
    </>
  );
}

export default App;
