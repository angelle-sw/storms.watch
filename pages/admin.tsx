import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import { FaRegSave as Save, FaUndo as Reset } from "react-icons/fa";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { isEqual } from "lodash";
import { NextPageContext } from "next/types";
import { parse } from "cookie";
import HomeIcon from "../components/HomeIcon";
import VideoSources from "../components/VideoSources";
import useVideoSources from "../hooks/useVideoSources";
import useUpdateVideoSources from "../hooks/useUpdateVideoSources";
import useAdmin from "../hooks/useAdmin";
import { useRouter } from "next/router";
import axios from "axios";
import { IVideoSource } from "../types";

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
  adminPassphrase: string;
  videoSources: IVideoSource[];
};

const AdminDashboard = ({ adminPassphrase, videoSources }: Props) => {
  const { data: videoSourceData, isLoading: videoSourceLoading } =
    useVideoSources({ initialData: { videoSources } });

  const { mutate } = useUpdateVideoSources(adminPassphrase);
  const [sources, setSources] = useState<IVideoSource[]>([]);
  const { data: adminData, isLoading: adminDataisLoading } =
    useAdmin(adminPassphrase);
  const router = useRouter();

  useEffect(() => {
    if (videoSourceData) {
      setSources(videoSourceData);
    }
  }, [videoSourceData]);

  useEffect(() => {
    if (adminData === false) {
      router.push("/");
    }
  }, [adminData, router]);

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
    setSources(videoSourceData);
  };

  if (videoSourceLoading || adminDataisLoading || !adminData) {
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
            <VideoSources
              adminPassphrase={adminPassphrase}
              setVideoSources={setSources}
              videoSources={sources}
            />
          </VideoSourcesContainer>
        </DndProvider>
      </Container>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const cookies = parse(context.req?.headers.cookie || "");

  const adminPassphrase = cookies.adminPassphrase || "";

  const { API_URL } = process.env;

  const { data: videoSources } = await axios.get(
    `${API_URL}/api/getVideoSources`
  );

  return {
    props: { adminPassphrase, videoSources },
  };
}

export default AdminDashboard;
