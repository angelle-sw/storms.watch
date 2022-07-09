import {
  FaTwitter as TwitterIcon,
  FaRedditAlien as RedditIcon,
} from "react-icons/fa";
import { FaSlidersH as DashboardIcon } from "react-icons/fa";
import { useRouter } from "next/router";
import SocialFeedDrawer from "../components/SocialFeedDrawer";
import useVideoSources from "../hooks/useVideoSources";
import useAdmin from "../hooks/useAdmin";
import Stream from "../components/Stream";

type IVideoSource = {
  id: string;
  status: boolean;
  title: string;
  url: string;
};

type Props = {
  activeSocialFeed: string;
  setActiveSocialFeed: (feed: string) => void;
  setSocialFeedIsOpen: (isOpen: boolean) => void;
  socialFeedIsOpen: boolean;
};

function Home({
  activeSocialFeed,
  setActiveSocialFeed,
  setSocialFeedIsOpen,
  socialFeedIsOpen,
}: Props) {
  const { data: videoSourcesData, isLoading } = useVideoSources();
  const { data: adminData } = useAdmin();
  const router = useRouter();

  return (
    <>
      {adminData && (
        <span
          className="dashboard-icon"
          role="button"
          onClick={() => router.push("/admin")}
        >
          <DashboardIcon size={32} />
        </span>
      )}
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
            {videoSourcesData
              .filter((source: IVideoSource) => source.status)
              .map((source: IVideoSource) => (
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
}

export default Home;
