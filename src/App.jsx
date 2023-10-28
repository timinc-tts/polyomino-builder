import "./style.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PolyominoView from "./views/Polyomino";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PolyominoView />} />
        <Route path="/polyomino-builder" element={<PolyominoView />} />
        <Route
          path="*"
          element={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
              }}
            >
              <p>Are you lost, friend?</p>
              <p>Let&apos;s get you out of here.</p>
              <Link to="/">Just click here.</Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
