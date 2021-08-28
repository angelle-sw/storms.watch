import React from "react";

const SocialFeedLinks = () => {
  return (
    <ul className="social-feed-links">
      <li>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            console.log("tropical twitter");
          }}
        >
          Tropical Twitter
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            console.log("tropical reddit");
          }}
        >
          Tropical Reddit
        </a>
      </li>
    </ul>
  );
};

export default SocialFeedLinks;
