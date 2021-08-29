import { useState } from "react";
import {
  FaTwitter as TwitterIcon,
  FaRedditAlien as RedditIcon,
} from "react-icons/fa";
import StreamsPage from "./pages/StreamsPage";
import SocialFeedDrawer from "./SocialFeedDrawer";
import "./App.css";

function App() {
  const [socialFeedIsOpen, setSocialFeedIsOpen] = useState(false);
  const [activeSocialFeed, setActiveSocialFeed] = useState("");

  return (
    <div
      className={`app ${socialFeedIsOpen ? "social-feed-drawer-is-open" : ""}`}
    >
      <header>
        <div className="logo-container">
          <img src="./images/logo.png" className="logo" alt="storms.watch" />
          <div className="hurricane-indicator blink"></div>
        </div>
      </header>

      <ul className="main-navigation-mobile">
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setSocialFeedIsOpen(true);
              setActiveSocialFeed("reddit");
            }}
          >
            <RedditIcon
              size={32}
              className={`social-feed-icon ${
                socialFeedIsOpen && activeSocialFeed === "reddit"
                  ? "is-active"
                  : ""
              }`}
            />
          </a>
        </li>

        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setSocialFeedIsOpen(true);
              setActiveSocialFeed("twitter");
            }}
          >
            <TwitterIcon
              size={32}
              className={`social-feed-icon ${
                socialFeedIsOpen && activeSocialFeed === "twitter"
                  ? "is-active"
                  : ""
              }`}
            />
          </a>
        </li>
      </ul>

      <div className="content">
        <SocialFeedDrawer
          isOpen={socialFeedIsOpen}
          activeFeed={activeSocialFeed}
          onClose={() => setSocialFeedIsOpen(false)}
        />

        <StreamsPage />
      </div>
    </div>
  );
}

export default App;
