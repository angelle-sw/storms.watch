import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  FaHome as Home,
  FaRegSave as Save,
  FaUndo as Reset,
} from "react-icons/fa";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { isEqual } from "lodash";
import VideoSources from "../VideoSources";
import useVideoSources from "../hooks/useVideoSources";
import useUpdateVideoSources from "../hooks/useUpdateVideoSources";
import "../Dashboard.css";

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

  useEffect(() => {
    if (videoSourceData) {
      setSources(videoSourceData);
    }
  }, [videoSourceData]);

  const navigate = useNavigate();

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

  return (
    <div className="dashboard">
      <span className="home-icon" role="button" onClick={() => navigate("/")}>
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
};

export default Dashboard;
