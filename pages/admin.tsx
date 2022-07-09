import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import { FaRegSave as Save, FaUndo as Reset } from "react-icons/fa";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { isEqual } from "lodash";
import HomeIcon from "../components/HomeIcon";
import VideoSources from "../components/VideoSources";
import useVideoSources from "../hooks/useVideoSources";
import useUpdateVideoSources from "../hooks/useUpdateVideoSources";

const Container = styled.div`
  margin-top: 32px;
`;

const VideoSourcesContainer = styled.div`
  margin-top: 48px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 60px;
  row-gap: 40px;
`;

const OrderControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
`;

const ActionButton = styled.span`
  transition: fill 0.25s;
  color: #ffffff60;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

type IVideoSource = {
  id: string;
  status: boolean;
  title: string;
  url: string;
};

const Admin = () => {
  const {
    data: videoSourceData,
    isLoading: videoSourceLoading,
  } = useVideoSources();

  const { mutate } = useUpdateVideoSources();
  const [sources, setSources] = useState<IVideoSource[]>([]);

  useEffect(() => {
    if (videoSourceData) {
      setSources(videoSourceData);
    }
  }, [videoSourceData]);

  const isOriginalOrder = useMemo(() => isEqual(videoSourceData, sources), [
    sources,
    videoSourceData,
  ]);

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
    <>
      <Head>
        <title>Storms.watch | Admin</title>
      </Head>

      <Container>
        <HomeIcon />
        <DndProvider backend={HTML5Backend}>
          <OrderControls>
            <ActionButton onClick={() => saveOrder()} role="button">
              <Save size={32} />
            </ActionButton>

            <ActionButton onClick={() => resetOrder()} role="button">
              <Reset size={28} />
            </ActionButton>
          </OrderControls>
          <VideoSourcesContainer>
            <VideoSources setVideoSources={setSources} videoSources={sources} />
          </VideoSourcesContainer>
        </DndProvider>
      </Container>
    </>
  );
};

export default Admin;
