import React, { useCallback, useState } from "react";
import update from "immutability-helper";
import useUpdateVideoSources from "./hooks/useUpdateVideoSources";
import VideoSource from "./VideoSource";
import NewSource from "./NewSource";
import AddSourceModal from "./AddSourceModal";

type IVideoSource = {
  id: string;
  status: boolean;
  title: string;
  url: string;
};

type Props = {
  isOriginalOrder: boolean;
  setVideoSources: (sources: IVideoSource[]) => void;
  videoSources: IVideoSource[];
};

const VideoSources = ({
  isOriginalOrder,
  setVideoSources,
  videoSources,
}: Props) => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const { mutate } = useUpdateVideoSources();

  const editVideoSource = async (source: IVideoSource) => {
    const updatedSources = videoSources.map((card) => {
      if (card.id === source.id) {
        return {
          ...source,
        };
      }

      return card;
    });
    setVideoSources(updatedSources);
    await mutate(updatedSources);
  };

  const deleteVideoSource = async (id: string) => {
    const updatedSources = videoSources.filter((card) => {
      if (card.id === id) {
        return false;
      }

      return true;
    });
    setVideoSources(updatedSources);
    await mutate(updatedSources);
  };

  const addVideoSource = async (source: IVideoSource) => {
    const updatedSources = [...videoSources, source];
    setVideoSources(updatedSources);
    await mutate(updatedSources);
  };

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = videoSources[dragIndex];
      setVideoSources(
        update(videoSources, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [setVideoSources, videoSources]
  );

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  return (
    <>
      {videoSources.map((videoSource, index) => {
        return (
          <VideoSource
            deleteVideoSource={deleteVideoSource}
            editVideoSource={editVideoSource}
            isOriginalOrder={isOriginalOrder}
            id={index}
            index={index}
            moveCard={moveCard}
            videoSource={videoSource}
          />
        );
      })}
      <NewSource openAddModal={openAddModal} />
      <AddSourceModal
        addVideoSource={addVideoSource}
        closeModal={closeAddModal}
        modalOpen={addModalOpen}
      />
    </>
  );
};

export default VideoSources;
