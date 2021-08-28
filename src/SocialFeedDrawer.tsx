import React, { useState } from "react";
import { IoIosCloseCircle as CloseIcon } from "react-icons/io";

interface Props {
  isOpen: boolean;
  activeFeed: string;
  onClose: () => void;
}

const SocialFeedDrawer = ({ isOpen, activeFeed, onClose }: Props) => {
  return (
    <>
      <div
        className={`social-feed-drawer-container ${
          isOpen ? "is-open" : "is-closed"
        }`}
      >
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
            <iframe title="Tropical Reddit" src="./tropical-reddit.html" />
          </div>

          <div
            className={`social-feed ${
              activeFeed === "twitter" ? "is-active" : ""
            }`}
          >
            <div className="social-feed-loading-indicator">Loading...</div>
            <iframe
              title="Tropical Twitter"
              src="./tropical-twitter.html"
              className="tropical-twitter-iframe"
              style={{ display: "none" }}
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
