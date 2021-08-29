import { useState } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Streams from "./pages/Streams";
import "./App.css";

function App() {
  const [socialFeedIsOpen, setSocialFeedIsOpen] = useState(
    window.innerWidth >= 880
  );
  const [activeSocialFeed, setActiveSocialFeed] = useState("reddit");

  return (
    <BrowserRouter>
      <div
        className={`app ${
          socialFeedIsOpen ? "social-feed-drawer-is-open" : ""
        }`}
      >
        <header>
          <div className="logo-container">
            <img src="./images/logo.png" className="logo" alt="storms.watch" />
            <div className="storm-mode-indicator blink"></div>
          </div>
        </header>

        <Routes>
          <PrivateRoute path="/admin" element={<Dashboard />} />
          <Route
            path="/"
            element={
              <Streams
                activeSocialFeed={activeSocialFeed}
                setActiveSocialFeed={setActiveSocialFeed}
                setSocialFeedIsOpen={setSocialFeedIsOpen}
                socialFeedIsOpen={socialFeedIsOpen}
              />
            }
          />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
