import { useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import SocialFeedDrawer from "../components/SocialFeedDrawer";
import SocialFeedNavMobile from "../components/SocialFeedNavMobile";
import StreamGrid from "../components/StreamGrid";
import AdminDashboardIcon from "../components/AdminDashboardIcon";
import OutOfStormMode from "../components/OutOfStormMode";
import { IVideoSource } from "../types";
import cookies from "next-cookies";
import { getStormModeStatus } from "./api/getStormModeStatus";
import { getVideoSources } from "./api/getVideoSources";
import { NextPageContext } from "next";
import useStormModeStatus from "../hooks/useStormModeStatus";
import useAdmin from "../hooks/useAdmin";

type Props = {
  isAdmin: boolean;
  stormModeStatus: boolean;
  videoSources: IVideoSource[];
};

const Content = styled.div`
  display: flex;
  width: 100%;
`;

const Home = ({ isAdmin, stormModeStatus, videoSources }: Props) => {
  const { data: stormModeStatusData } = useStormModeStatus({
    initialData: { stormModeStatus },
  });

  const { data: isAdminData } = useAdmin({ initialData: { isAdmin } });

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

        {isAdminData && <AdminDashboardIcon />}

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

      {isAdminData && <AdminDashboardIcon />}

      <OutOfStormMode />
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const queries = context.query;

  const { adminPassphrase } = cookies(context);

  const isAdmin = adminPassphrase === process.env.ADMIN_PASSPHRASE;

  const videoSources = await getVideoSources();

  const stormModeStatus =
    queries.stormModeStatus !== undefined && isAdmin
      ? queries.stormModeStatus === "true"
      : await getStormModeStatus();

  if (queries.stormModeStatus && !isAdmin) {
    return {
      props: { isAdmin, stormModeStatus, videoSources },
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: { isAdmin, stormModeStatus, videoSources },
  };
}

export default Home;
