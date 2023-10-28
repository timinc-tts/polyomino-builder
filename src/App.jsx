import { useCallback } from "react";
import Grid from "./components/Grid";
import Preview from "./components/Preview";
import useBooleanGrid from "./hooks/useBooleanGrid";
import { getTrueSubBoard } from "./util/board";
import useLocalStorage from "./hooks/useLocalStorage";

import appStyle from "./App.module.css";
import "./style.css";

function App() {
  const { cells, toggleCell, clearGrid } = useBooleanGrid(5, 5);
  const [polyominos, setPolyominos] = useLocalStorage([], "polyominos");

  const handleAdd = useCallback(() => {
    const trueBoard = getTrueSubBoard(cells);
    if (trueBoard.length === 0) {
      return;
    }
    const stringifiedBoard = JSON.stringify(trueBoard);
    if (polyominos.some((p) => JSON.stringify(p) === stringifiedBoard)) {
      return;
    }
    setPolyominos((p) => [...p, trueBoard]);
    clearGrid();
  }, [cells, clearGrid, polyominos, setPolyominos]);

  const handleRemove = useCallback(
    (removeI) => {
      setPolyominos((p) => p.filter((e, i) => i !== removeI));
    },
    [setPolyominos]
  );

  return (
    <>
      <h1>Tabletop Simulator Polyomino Builder</h1>
      <Grid cells={cells} toggleCell={toggleCell} />
      <button onClick={handleAdd} className={appStyle.button}>
        Add
      </button>
      <Preview list={polyominos} onRemove={handleRemove} />
      {!!polyominos.length && (
        <button className={appStyle.button}>Download</button>
      )}
    </>
  );
}

export default App;
