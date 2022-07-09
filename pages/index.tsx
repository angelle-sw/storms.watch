import { useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import {
  FaTwitter as TwitterIcon,
  FaRedditAlien as RedditIcon,
} from "react-icons/fa";
import SocialFeedDrawer from "../components/SocialFeedDrawer";
import SocialFeedNavMobile from "../components/SocialFeedNavMobile";
import StreamGrid from "../components/StreamGrid";
import DashboardIcon from "../components/DashboardIcon";
import OutOfStormMode from "../components/OutOfStormMode";
import useVideoSources from "../hooks/useVideoSources";
import useAdmin from "../hooks/useAdmin";

type Props = {
  activeSocialFeed: "reddit" | "twitter";
  setActiveSocialFeed: (feed: "reddit" | "twitter") => void;
  setSocialFeedIsOpen: (isOpen: boolean) => void;
  socialFeedIsOpen: boolean;
};

const Content = styled.div`
  display: flex;
  width: 100%;
`;

const Home = () => {
  const { data: videoSourcesData, isLoading } = useVideoSources();
  const { data: adminData } = useAdmin();

  const [socialFeedIsOpen, setSocialFeedIsOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 880 : true
  );
  const [activeSocialFeed, setActiveSocialFeed] = useState<
    "reddit" | "twitter"
  >("reddit");

  if (true) {
    return (
      <>
        <Head>
          <title>Storms.watch</title>
        </Head>

        <OutOfStormMode />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Storms.watch</title>
      </Head>

      {adminData && <DashboardIcon />}

      <SocialFeedNavMobile
        isOpen={socialFeedIsOpen}
        activeFeed={activeSocialFeed}
        setActiveFeed={setActiveSocialFeed}
        setIsOpen={setSocialFeedIsOpen}
      />

      <Content>
        <StreamGrid socialFeedIsOpen={socialFeedIsOpen} />

        <SocialFeedDrawer
          isOpen={socialFeedIsOpen}
          activeFeed={activeSocialFeed}
          onOpen={() => setSocialFeedIsOpen(true)}
          onSelect={(feed) => setActiveSocialFeed(feed)}
          onClose={() => setSocialFeedIsOpen(false)}
        />
      </Content>
    </>
  );
};

export default Home;
