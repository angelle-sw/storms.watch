import React, { useEffect, useMemo, useState } from "react";
import {
  FaHome as Home,
  FaRegSave as Save,
  FaUndo as Reset,
} from "react-icons/fa";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { isEqual } from "lodash";
import { useRouter } from "next/router";
import VideoSources from "../components/VideoSources";
import useVideoSources from "../hooks/useVideoSources";
import useUpdateVideoSources from "../hooks/useUpdateVideoSources";
import useAdmin from "../hooks/useAdmin";

type IVideoSource = {
  id: string;
  status: boolean;
  title: string;
  url: string;
};

const Dashboard = () => {
  const { data: videoSourceData, isLoading: videoSourceLoading } =
    useVideoSources();

  const { mutate } = useUpdateVideoSources();

  const [sources, setSources] = useState<IVideoSource[]>([]);
  const { data: adminData, isLoading: adminIsLoading } = useAdmin();

  const router = useRouter();

  useEffect(() => {
    if (videoSourceData) {
      setSources(videoSourceData);
    }
  }, [videoSourceData]);

  const isOriginalOrder = useMemo(
    () => isEqual(videoSourceData, sources),
    [sources, videoSourceData]
  );

  if (videoSourceLoading) {
    return <div>Loading...</div>;
  }

  const saveOrder = async () => {
    if (!isOriginalOrder) {
      await mutate(sources);
    }
  };

  const resetOrder = async () => {
    setSources(videoSourceData);
  };

  if (adminIsLoading) {
    return <div>Loading</div>;
  }

  if (adminData === false) {
    router.push("/");
  }

  if (adminData) {
    return (
      <div className="dashboard">
        <span
          className="home-icon"
          role="button"
          onClick={() => router.push("/")}
        >
          <Home size={32} />
        </span>
        <DndProvider backend={HTML5Backend}>
          <div className="order-controls">
            <span
              onClick={() => saveOrder()}
              className="save-button"
              role="button"
            >
              <Save size={32} />
            </span>
            <span
              onClick={() => resetOrder()}
              className="reset-button"
              role="button"
            >
              <Reset size={28} />
            </span>
          </div>
          <div className="sources">
            <VideoSources setVideoSources={setSources} videoSources={sources} />
          </div>
        </DndProvider>
      </div>
    );
  }
};

export default Dashboard;
