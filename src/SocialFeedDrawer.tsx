import { useState, useEffect } from "react";
import {
  FaTwitter as TwitterIcon,
  FaRedditAlien as RedditIcon,
} from "react-icons/fa";
import { IoIosCloseCircle as CloseIcon } from "react-icons/io";

interface Props {
  isOpen: boolean;
  activeFeed: string;
  onOpen: () => void;
  onSelect: (feed: string) => void;
  onClose: () => void;
}

const SocialFeedDrawer = ({
  isOpen,
  activeFeed,
  onOpen,
  onSelect,
  onClose,
}: Props) => {
  const [isRefreshButtonVisible, setIsRefreshButtonVisible] = useState(false);

  const refreshTropicalReddit = () => {
    const redditFeed = document.querySelector(
      ".tropical-reddit-iframe"
    ) as HTMLIFrameElement;
    redditFeed.src = "./tropical-reddit-feed.html";
  };

  const refreshTropicalTwitter = () => {
    const twitterFeed = document.querySelector(
      ".tropical-twitter-iframe"
    ) as HTMLIFrameElement;
    twitterFeed.src = "./tropical-twitter-feed.html";
    twitterFeed.style.visibility = "hidden";
  };

  useEffect(() => {
    setIsRefreshButtonVisible(false);
  }, [activeFeed]);

  useEffect(() => {
    if (isOpen) {
      const id = setTimeout(() => {
        setIsRefreshButtonVisible(true);
      }, 60000);

      return () => {
        clearTimeout(id);
      };
    }
  });

  return (
    <>
      <div
        className={`social-feed-drawer-container ${
          isOpen ? "is-open" : "is-closed"
        }`}
      >
        <ul className="main-navigation">
          <li>
            <a
              href="#"
              className={`${
                isOpen && activeFeed === "reddit" ? "is-active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                onSelect("reddit");
              }}
            >
              <RedditIcon size={20} className="social-feed-icon" />
              <span>Reddit</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className={`${
                isOpen && activeFeed === "twitter" ? "is-active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                onOpen();
                onSelect("twitter");
              }}
            >
              <TwitterIcon size={20} className="social-feed-icon" />
              <span>Twitter</span>
            </a>
          </li>
        </ul>
        <button
          className={`social-feed-refresh-button ${
            isRefreshButtonVisible ? "is-visible" : ""
          }`}
          onClick={() => {
            if (!isRefreshButtonVisible) {
              return;
            }

            setIsRefreshButtonVisible(false);

            if (activeFeed === "reddit") {
              refreshTropicalReddit();
            }

            if (activeFeed === "twitter") {
              refreshTropicalTwitter();
            }
          }}
        >
          Refresh
        </button>

        <div
          className="social-feed-drawer"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`social-feed ${
              activeFeed === "reddit" ? "is-active" : ""
            }`}
          >
            <div className="social-feed-loading-indicator">Loading...</div>
            <iframe
              title="Tropical Reddit"
              src="./tropical-reddit-feed.html"
              className="tropical-reddit-iframe"
            />
          </div>

          <div
            className={`social-feed ${
              activeFeed === "twitter" ? "is-active" : ""
            }`}
          >
            <div className="social-feed-loading-indicator">Loading...</div>
            <iframe
              title="Tropical Twitter"
              src="./tropical-twitter-feed.html"
              className="tropical-twitter-iframe"
              style={{ visibility: "hidden" }}
            />
          </div>

          <CloseIcon
            size={32}
            color="#ffffffcc"
            className="close-icon"
            onClick={() => onClose()}
          />
        </div>
      </div>
    </>
  );
};

export default SocialFeedDrawer;
