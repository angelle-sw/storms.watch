import styled from "styled-components";
import { useState, useEffect } from "react";
import { BiRefresh as RefreshIcon } from "react-icons/bi";
import { IoIosCloseCircle } from "react-icons/io";
import SocialFeedNav from "./SocialFeedNav";
import LoadingIndicator from "./LoadingIndicator";

interface Props {
  isOpen: boolean;
  activeFeed: "reddit" | "twitter";
  onOpen: () => void;
  onSelect: (feed: "reddit" | "twitter") => void;
  onClose: () => void;
}

const Container = styled.div<{ $isOpen: boolean }>`
  position: relative;
  margin: 1em 0 3em;
  width: 100%;
  height: 70vh;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};

  @media only screen and (min-width: 1120px) {
    width: 400px;
  }

  @media only screen and (min-width: 880px) {
    margin-top: 3em;
    margin-left: 2em;
    height: auto;
  }
`;

const Drawer = styled.div`
  position: relative;
  margin-top: 0;
  width: 100%;
  height: 100%;

  @media only screen and (min-width: 1260px) {
    width: 400px;
  }

  @media only screen and (min-width: 880px) {
    margin-top: 1em;
  }
`;

const Feed = styled.div<{ $isActive: boolean }>`
  display: ${({ $isActive }) => ($isActive ? "block" : "none")};
`;

const Iframe = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 0;
`;

const RefreshButton = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: calc(50% - 52px);
  margin-top: ${({ $isVisible }) => ($isVisible ? "60px" : "40px")};
  padding: ${({ $isVisible }) => ($isVisible ? "12px 30px" : 0)};
  width: ${({ $isVisible }) => ($isVisible ? "auto" : 0)};
  background: #1a1b2f;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition-property: margin-top, background;
  transition-duration: 0.25s;
  z-index: 1;

  &:hover {
    background: #42435d;
    cursor: pointer;
  }

  span {
    margin-left: 5px;
    display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
  }
`;

const CloseIcon = styled(IoIosCloseCircle)`
  position: absolute;
  top: 0px;
  right: 15px;
  padding: 1px;
  z-index: 2;
  background: #050521;
  border-radius: 50%;
  display: block;
  transition: fill 0.25s;

  &:hover {
    fill: #fff;
    cursor: pointer;
  }

  @media only screen and (min-width: 880px) {
    display: none;
  }
`;

const SocialFeedDrawer = ({
  isOpen,
  activeFeed,
  onOpen,
  onSelect,
  onClose,
}: Props) => {
  const [isRefreshButtonVisible, setIsRefreshButtonVisible] = useState(false);

  const refreshTropicalReddit = () => {
    const redditFeed = document.getElementById(
      "tropical-reddit-iframe"
    ) as HTMLIFrameElement;
    redditFeed.src = "./tropical-reddit-feed.html";
  };

  const refreshTropicalTwitter = () => {
    const twitterFeed = document.getElementById(
      "tropical-twitter-iframe"
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
      <Container $isOpen={isOpen}>
        <SocialFeedNav
          isOpen={isOpen}
          activeFeed={activeFeed}
          onOpen={onOpen}
          onSelect={onSelect}
        />

        <RefreshButton
          $isVisible={isRefreshButtonVisible}
          onClick={() => {
            setIsRefreshButtonVisible(false);

            if (activeFeed === "reddit") {
              refreshTropicalReddit();
            }

            if (activeFeed === "twitter") {
              refreshTropicalTwitter();
            }
          }}
        >
          <RefreshIcon size={20} color="#fff" />
          <span>Refresh</span>
        </RefreshButton>

        <Drawer onClick={(e) => e.stopPropagation()}>
          <Feed $isActive={activeFeed === "reddit"}>
            <LoadingIndicator />

            <Iframe
              title="Tropical Reddit"
              src="./tropical-reddit-feed.html"
              id="tropical-reddit-iframe"
            />
          </Feed>

          <Feed $isActive={activeFeed === "twitter"}>
            <LoadingIndicator />

            <Iframe
              title="Tropical Twitter"
              src="./tropical-twitter-feed.html"
              id="tropical-twitter-iframe"
              style={{ visibility: "hidden" }}
            />
          </Feed>

          <CloseIcon size={32} color="#ffffffcc" onClick={() => onClose()} />
        </Drawer>
      </Container>
    </>
  );
};

export default SocialFeedDrawer;
