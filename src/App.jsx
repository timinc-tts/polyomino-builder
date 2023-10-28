import { useCallback, useState } from "react";
import Grid from "./components/Grid";
import useBooleanGrid from "./hooks/useBooleanGrid";
import "./style.css";
import { getTrueSubBoard } from "./util/board";

function App() {
  const { cells, toggleCell, clearGrid } = useBooleanGrid(10, 10);
  const [polyominos, setPolyominos] = useState([]);

  const handleAdd = useCallback(() => {
    setPolyominos((p) => [...p, getTrueSubBoard(cells)]);
    clearGrid();
  }, [cells, clearGrid]);

  return (
    <>
      <h1>Tabletop Simulator Polyomino Builder</h1>
      <Grid cells={cells} toggleCell={toggleCell} />
      <button onClick={handleAdd}>Add</button>
      {JSON.stringify(polyominos)}
    </>
  );
}

export default App;
