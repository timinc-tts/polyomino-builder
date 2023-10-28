import { useCallback, useState } from "react";
import Grid from "./components/Grid";
import Preview from "./components/Preview";
import useBooleanGrid from "./hooks/useBooleanGrid";
import { getTrueSubBoard } from "./util/board";
import useLocalStorage from "./hooks/useLocalStorage";
import { generatePolyominos } from "./util/polyomino";
import downloadFile from "downloadfile-js";

import appStyle from "./App.module.css";
import "./style.css";

function App() {
  const { cells, toggleCell, clearGrid } = useBooleanGrid(5, 5);
  const [center, setCenter] = useState(null);
  const [polyominos, setPolyominos] = useLocalStorage([], "polyominos");

  const handleAdd = useCallback(() => {
    if (!center) {
      return;
    }
    const { cells: trueBoard, center: trueCenter } = getTrueSubBoard(
      cells,
      center
    );
    if (trueBoard.length === 0) {
      return;
    }
    const stringifiedBoard = JSON.stringify(trueBoard);
    if (
      polyominos.some(({ cells }) => JSON.stringify(cells) === stringifiedBoard)
    ) {
      return;
    }
    setPolyominos((p) => [
      ...p,
      {
        cells: trueBoard,
        center: trueCenter,
      },
    ]);
    clearGrid();
    setCenter(null);
  }, [cells, center, clearGrid, polyominos, setPolyominos]);

  const handleRemove = useCallback(
    (removeI) => {
      setPolyominos((p) => p.filter((e, i) => i !== removeI));
    },
    [setPolyominos]
  );

  const handleSetCenter = useCallback((x, y) => {
    setCenter({ x, y });
  }, []);

  const handleDownload = useCallback(() => {
    downloadFile(JSON.stringify(generatePolyominos(polyominos)), "save.json");
  }, [polyominos]);

  return (
    <>
      <h1>Tabletop Simulator Polyomino Builder</h1>
      <Grid
        cells={cells}
        toggleCell={toggleCell}
        onSetCenter={handleSetCenter}
        center={center}
      />
      <button onClick={handleAdd} className={appStyle.button}>
        Add
      </button>
      <Preview list={polyominos} onRemove={handleRemove} />
      {!!polyominos.length && (
        <button className={appStyle.button} onClick={handleDownload}>
          Download
        </button>
      )}
    </>
  );
}

export default App;
