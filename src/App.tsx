import { useState } from "react";
import {
  FaTwitter as TwitterIcon,
  FaRedditAlien as RedditIcon,
} from "react-icons/fa";
import StreamsPage from "./pages/StreamsPage";
import SocialFeedDrawer from "./SocialFeedDrawer";
import "./App.css";

function App() {
  const [socialFeedIsOpen, setSocialFeedIsOpen] = useState(
    window.innerWidth >= 880
  );
  const [activeSocialFeed, setActiveSocialFeed] = useState("reddit");

  return (
    <div
      className={`app ${socialFeedIsOpen ? "social-feed-drawer-is-open" : ""}`}
    >
      <header>
        <div className="logo-container">
          <img src="./images/logo.png" className="logo" alt="storms.watch" />
          <div className="storm-mode-indicator blink"></div>
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
        <StreamsPage />

        <SocialFeedDrawer
          isOpen={socialFeedIsOpen}
          activeFeed={activeSocialFeed}
          onOpen={() => setSocialFeedIsOpen(true)}
          onSelect={(feed: string) => setActiveSocialFeed(feed)}
          onClose={() => setSocialFeedIsOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
