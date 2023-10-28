import { useCallback, useState } from "react";
import downloadFile from "downloadfile-js";

import appStyle from "../App.module.css";
import useBooleanGrid from "../hooks/useBooleanGrid";
import useLocalStorage from "../hooks/useLocalStorage";
import { getTrueSubBoard } from "../util/board";
import { generatePolyominos } from "../util/polyomino";
import Preview from "../components/Preview";
import Grid from "../components/Grid";

export default function PolyominoView() {
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
    downloadFile(
      JSON.stringify(generatePolyominos(polyominos)),
      "polyominos.json"
    );
  }, [polyominos]);

  return (
    <>
      <h1>Tim&apos;s TTS Polyomino Builder</h1>
      <div>
        <h2>INSTRUCTIONS</h2>
        <ul>
          <li>
            Click on the cells on the board below to turn on cells for your
            polyomino.
          </li>
          <li>
            Shift+Click on a cell to mark it as the center cell for your
            polyomino.
          </li>
          <li>
            Click the <code>Add</code> button to lock in your polyomino design
            and add it to the list.
          </li>
          <li>Click on a polyomino in the list to delete it.</li>
          <li>
            Click the download button to download a TTS save file with your
            polyominos in it!
          </li>
          <li>
            Click the <code>Clear</code> button if you&apos;d like to start
            fresh!
          </li>
          <li>
            If this tool helped you, please consider{" "}
            <a
              href="https://ko-fi.com/programmingwithtim"
              target="_blank"
              rel="noreferrer"
            >
              helping me with a tip over on Ko-Fi
            </a>
            !
          </li>
        </ul>
      </div>
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
        <div style={{ display: "flex", gap: 5 }}>
          <button className={appStyle.button} onClick={handleDownload}>
            Download
          </button>
          <button className={appStyle.button} onClick={() => setPolyominos([])}>
            Clear
          </button>
        </div>
      )}
    </>
  );
}
