import { Suspense, useState } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { WiHurricane as HurricaneIcon } from "react-icons/wi";

import PrivateRoute from "./PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Streams from "./pages/Streams";
import Header from "./Header";

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
        <Header />

        <Suspense
          fallback={
            <div className="video-sources-loading-indicator">
              <HurricaneIcon
                className="hurricane-icon"
                size={240}
                color="#ffffff70"
              />
            </div>
          }
        >
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
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
