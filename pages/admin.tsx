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
import { IVideoSource } from "../types";
import cookies from "next-cookies";
import { getVideoSources } from "./api/getVideoSources";
import { NextPageContext } from "next";
import useAdmin from "../hooks/useAdmin";
import router from "next/router";

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

type Props = {
  isAdmin: boolean;
  videoSources: IVideoSource[];
};

const AdminDashboard = ({ isAdmin, videoSources }: Props) => {
  const { data: videoSourceData, isFetching: videoSourceisFetching } =
    useVideoSources({ initialData: { videoSources } });

  const { data: isAdminData } = useAdmin({ initialData: { isAdmin } });

  const { mutate } = useUpdateVideoSources();
  const [sources, setSources] = useState<IVideoSource[]>(videoSources);

  const isOriginalOrder = useMemo(
    () => isEqual(videoSourceData, sources),
    [sources, videoSourceData]
  );

  const saveOrder = async () => {
    if (!isOriginalOrder) {
      await mutate(sources);
    }
  };

  const resetOrder = async () => {
    setSources(videoSources);
  };

  useEffect(() => {
    if (!isAdminData) {
      router.push("/");
    }
  }, [isAdminData]);

  if (videoSourceisFetching) {
    return <div>Loading...</div>;
  }

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

export async function getServerSideProps(context: NextPageContext) {
  const { adminPassphrase } = cookies(context);

  const isAdmin = adminPassphrase === process.env.ADMIN_PASSPHRASE;

  if (!isAdmin) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const videoSources = await getVideoSources();

  return {
    props: { isAdmin, videoSources },
  };
}

export default AdminDashboard;
