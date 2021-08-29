import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { FaHome as Home } from "react-icons/fa";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import VideoSources from "../VideoSources";
import useVideoSources from "../hooks/useVideoSources";
import useUpdateVideoSources from "../hooks/useUpdateVideoSources";
import "../Dashboard.css";
import { isEqual } from "lodash";

type IVideoSource = {
  id: string;
  status: boolean;
  title: string;
  url: string;
};

const Dashboard = () => {
  const { data: videoSourceData, isLoading: videoSourceLoading } =
    useVideoSources();

  const [sources, setSources] = useState<IVideoSource[]>([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (videoSourceData) {
      setSources(videoSourceData);
    }
  }, [videoSourceData]);

  const { mutate } = useUpdateVideoSources();

  const navigate = useNavigate();

  const isOriginalOrder = useMemo(
    () => isEqual(videoSourceData, sources),
    [sources, videoSourceData]
  );

  if (videoSourceLoading) {
    return <div>Loading...</div>;
  }

  const saveOrder = async () => {
    await mutate(sources);
  };

  const resetOrder = async () => {
    setSources(videoSourceData);
  };

  return (
    <div className="dashboard">
      <ul className="main-navigation">
        <li>
          <a
            href="/admin"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            <Home size={32} />
          </a>
        </li>
      </ul>
      <DndProvider backend={HTML5Backend}>
        <button disabled={disabled} onClick={() => saveOrder()}>
          Save Order
        </button>
        <button disabled={disabled} onClick={() => resetOrder()}>
          Reset Order
        </button>
        <div className="sources">
          <VideoSources
            isOriginalOrder={isOriginalOrder}
            setDisabled={setDisabled}
            setVideoSources={setSources}
            videoSources={sources}
          />
        </div>
      </DndProvider>
    </div>
  );
};

export default Dashboard;
