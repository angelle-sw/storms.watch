import styled from "styled-components";
import StreamGrid from "../StreamGrid";
import DashboardIcon from "../DashboardIcon";
import SocialFeedNavMobile from "../SocialFeedNavMobile";
import SocialFeedDrawer from "../SocialFeedDrawer";
import OutOfStormMode from "../OutOfStormMode";
import useAdmin from "../hooks/useAdmin";

const Content = styled.div`
  display: flex;
  width: 100%;
`;

type Props = {
  activeSocialFeed: "reddit" | "twitter";
  setActiveSocialFeed: (feed: "reddit" | "twitter") => void;
  setSocialFeedIsOpen: (isOpen: boolean) => void;
  socialFeedIsOpen: boolean;
};

const Streams = ({
  activeSocialFeed,
  setActiveSocialFeed,
  setSocialFeedIsOpen,
  socialFeedIsOpen,
}: Props) => {
  const { data: adminData } = useAdmin();

  if (true) {
    return <OutOfStormMode />;
  }

  return (
    <>
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

export default Streams;
