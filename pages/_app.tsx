import React, { Suspense, useState } from "react";
import type { AppProps } from "next/app";
import Image from "next/image";
import { QueryClient, QueryClientProvider } from "react-query";
import { WiHurricane as HurricaneIcon } from "react-icons/wi";
import "../styles/globals.css";
import Header from "../components/Header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const [socialFeedIsOpen, setSocialFeedIsOpen] = useState(true);

  const [activeSocialFeed, setActiveSocialFeed] = useState("reddit");

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <div
          className={`app ${
            socialFeedIsOpen ? "social-feed-drawer-is-open" : ""
          }`}
        >
          <Header />
          <Suspense
            fallback={
              <div className="video-sources-loading-indicator">
                <HurricaneIcon
                  className="hurricane-icon"
                  size={240}
                  color="#ffffff70"
                />
              </div>
            }
          >
            <Component
              activeSocialFeed={activeSocialFeed}
              setActiveSocialFeed={setActiveSocialFeed}
              setSocialFeedIsOpen={setSocialFeedIsOpen}
              socialFeedIsOpen={socialFeedIsOpen}
              {...pageProps}
            />
          </Suspense>
        </div>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default MyApp;
