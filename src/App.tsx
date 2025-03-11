import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Sales from "./pages/Sales";

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ width: "100vw", margin: 0, padding: 0 }}>
      <Navbar />
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sales" element={<Sales />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
