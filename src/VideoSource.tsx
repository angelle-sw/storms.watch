import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import EditSourceModal from "./EditSourceModal";
import DeleteSourceModal from "./DeleteSourceModal";

type IVideoSource = {
  id: string;
  status: boolean;
  title: string;
  url: string;
};

type DragItem = {
  index: number;
  id: string;
  type: string;
};

type Props = {
  deleteVideoSource: (id: string) => void;
  editVideoSource: (source: IVideoSource) => void;
  isOriginalOrder: boolean;
  id: any;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  setDisabled: (disabled: boolean) => void;
  videoSource: IVideoSource;
};

export const truncateSource = (source: string) => {
  if (source.length > 80) {
    const start = source.slice(0, 30);
    const end = source.slice(-30);

    return `${start}...${end}`;
  }

  return source;
};

const VideoSource = ({
  deleteVideoSource,
  editVideoSource,
  isOriginalOrder,
  id,
  index,
  moveCard,
  setDisabled,
  videoSource,
}: Props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [status, setStatus] = useState(videoSource.status);
  const [title, setTitle] = useState(videoSource.title);
  const [url, setUrl] = useState(videoSource.url);

  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop() {
      if (isOriginalOrder) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    },
    hover(item: DragItem) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div className="card source-card" data-handler-id={handlerId} ref={ref}>
      <div className="source-card-title">{title}</div>
      <div className="source-card-url">{truncateSource(url)}</div>
      <div className="source-card-controls">
        <div className="source-card-status">{status ? "On" : "Off"}</div>
        <button className="edit" onClick={openEditModal}>
          Edit
        </button>
        <EditSourceModal
          closeModal={closeEditModal}
          modalOpen={editModalOpen}
          setStatus={setStatus}
          setTitle={setTitle}
          setUrl={setUrl}
          status={status}
          title={title}
          videoSource={videoSource}
          editVideoSource={editVideoSource}
          url={url}
        />
        <button className="delete" onClick={openDeleteModal}>
          Delete
        </button>
        <DeleteSourceModal
          closeModal={closeDeleteModal}
          deleteVideoSource={deleteVideoSource}
          modalOpen={deleteModalOpen}
          title={title}
          videoSource={videoSource}
          url={url}
        />
      </div>
    </div>
  );
};

export default VideoSource;
