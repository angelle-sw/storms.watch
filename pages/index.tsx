import { useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import SocialFeedDrawer from "../components/SocialFeedDrawer";
import SocialFeedNavMobile from "../components/SocialFeedNavMobile";
import StreamGrid from "../components/StreamGrid";
import AdminDashboardIcon from "../components/AdminDashboardIcon";
import OutOfStormMode from "../components/OutOfStormMode";
import useAdmin from "../hooks/useAdmin";
import useStormModeStatus from "../hooks/useStormModeStatus";
import { IVideoSource } from "../types";

type Props = {
  adminPassphrase: string;
  stormModeStatus: boolean;
  videoSources: IVideoSource[];
};

const Content = styled.div`
  display: flex;
  width: 100%;
`;

const Home = ({ adminPassphrase, stormModeStatus, videoSources }: Props) => {
  const { data: adminData } = useAdmin(adminPassphrase);
  const { data: stormModeStatusData } = useStormModeStatus(adminPassphrase, {
    initialData: { stormModeStatus },
  });

  const [socialFeedIsOpen, setSocialFeedIsOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 880 : true
  );
  const [activeSocialFeed, setActiveSocialFeed] = useState<
    "reddit" | "twitter"
  >("reddit");

  if (stormModeStatusData) {
    return (
      <>
        <Head>
          <title>Storms.watch</title>
        </Head>

        {adminData && <AdminDashboardIcon />}

        <SocialFeedNavMobile
          isOpen={socialFeedIsOpen}
          activeFeed={activeSocialFeed}
          setActiveFeed={setActiveSocialFeed}
          setIsOpen={setSocialFeedIsOpen}
        />

        <Content>
          <StreamGrid
            socialFeedIsOpen={socialFeedIsOpen}
            videoSources={videoSources}
          />

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
  }

  return (
    <>
      <Head>
        <title>Storms.watch</title>
      </Head>

      {adminData && <AdminDashboardIcon />}

      <OutOfStormMode />
    </>
  );
};

export default Home;
