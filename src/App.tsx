import React, { useState } from "react";
import StreamsPage from "./pages/StreamsPage";
import SocialFeedDrawer from "./SocialFeedDrawer";
import "./App.css";

function App() {
  const [socialFeedIsOpen, setSocialFeedIsOpen] = useState(false);

  return (
    <div className="app">
      <img src="./images/logo.png" className="logo" alt="storms.watch" />

      <ul className="social-feed-links">
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setSocialFeedIsOpen((open) => !open);
            }}
          >
            Social Feeds
          </a>
        </li>
      </ul>

      <div className="content">
        <StreamsPage />

        <SocialFeedDrawer
          isOpen={socialFeedIsOpen}
          onClose={() => setSocialFeedIsOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
