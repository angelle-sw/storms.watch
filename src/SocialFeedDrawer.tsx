import React, { useState } from "react";
import SocialFeedLinks from "./SocialFeedLinks";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SocialFeedDrawer = ({ isOpen, onClose }: Props) => {
  const [activeSocialFeed, setActiveSocialFeed] = useState("twitter");

  return (
    <>
      <div
        className={`social-feed-drawer-overlay ${
          isOpen ? "is-open" : "is-closed"
        }`}
        onClick={() => onClose()}
      >
        <div
          className="social-feed-drawer"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="social-feed-navigation">
            <li>
              <a
                href="#"
                className={`${
                  activeSocialFeed === "twitter" ? "is-active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSocialFeed("twitter");
                }}
              >
                Tropical Twitter
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`${
                  activeSocialFeed === "reddit" ? "is-active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSocialFeed("reddit");
                }}
              >
                Tropical Reddit
              </a>
            </li>
          </ul>

          {activeSocialFeed === "twitter" && (
            <iframe title="Tropical Twitter" src="./tropical-twitter.html" />
          )}

          {activeSocialFeed === "reddit" && (
            <iframe title="Tropical Reddit" src="./tropical-reddit.html" />
          )}
        </div>
      </div>
    </>
  );
};

export default SocialFeedDrawer;
