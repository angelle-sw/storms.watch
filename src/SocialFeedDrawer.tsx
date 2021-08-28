import React, { useState } from "react";
// import SocialFeedLinks from "./SocialFeedLinks";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SocialFeedDrawer = ({ isOpen, onClose }: Props) => {
  const [activeSocialFeed, setActiveSocialFeed] = useState("reddit");

  return (
    <>
      <div
        className={`social-feed-drawer-container ${
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
          </ul>

          {activeSocialFeed === "reddit" && (
            <iframe title="Tropical Reddit" src="./tropical-reddit.html" />
          )}

          {activeSocialFeed === "twitter" && (
            <iframe title="Tropical Twitter" src="./tropical-twitter.html" />
          )}
        </div>
      </div>
    </>
  );
};

export default SocialFeedDrawer;
