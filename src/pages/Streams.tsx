import React from "react";
import {
  FaTwitter as TwitterIcon,
  FaRedditAlien as RedditIcon,
} from "react-icons/fa";
import useVideoSources from "../hooks/useVideoSources";
import SocialFeedDrawer from "../SocialFeedDrawer";
import Stream from "../Stream";

type IVideoSource = {
  id: string;
  title: string;
  url: string;
};

type Props = {
  activeSocialFeed: string;
  setActiveSocialFeed: (feed: string) => void;
  setSocialFeedIsOpen: (isOpen: boolean) => void;
  socialFeedIsOpen: boolean;
};

const Streams = ({
  activeSocialFeed,
  setActiveSocialFeed,
  setSocialFeedIsOpen,
  socialFeedIsOpen,
}: Props) => {
  const { data: videoSourcesData, isLoading } = useVideoSources();

  return (
    <>
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
        {!isLoading && (
          <ul className="streams">
            {videoSourcesData.map((source: IVideoSource) => (
              <Stream title={source.title} url={source.url} />
            ))}
          </ul>
        )}
        <SocialFeedDrawer
          isOpen={socialFeedIsOpen}
          activeFeed={activeSocialFeed}
          onOpen={() => setSocialFeedIsOpen(true)}
          onSelect={(feed: string) => setActiveSocialFeed(feed)}
          onClose={() => setSocialFeedIsOpen(false)}
        />
      </div>
    </>
  );
};

export default Streams;