import { useRef, useState } from "react";
import styled from "styled-components";
import { useDrag, useDrop } from "react-dnd";
import Card from "./Card";
import EditSourceModal from "./EditSourceModal";
import DeleteSourceModal from "./DeleteSourceModal";
import SourceCardTitle from "./SourceCardTitle";
import SourceCardUrl from "./SourceCardUrl";

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
  id: any;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  videoSource: IVideoSource;
};

const Controls = styled.div`
  padding-top: 8px;
  display: flex;
  column-gap: 10px;
  flex-direction: row;
  justify-self: flex-end;
`;

const Button = styled.button`
  width: 68px;
  height: 28px;
  cursor: pointer;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  transition: color 0.25s;
`;

const EditButton = styled(Button)`
  background: #fff;

  &:hover {
    background: #dee2e6;
  }
`;

const DeleteButton = styled(Button)`
  background: #c71f37;
  color: white;

  &:hover {
    background: #a71e34;
  }
`;

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
  id,
  index,
  moveCard,
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
    <Card $isOff={!videoSource.status} data-handler-id={handlerId} ref={ref}>
      <SourceCardTitle>{videoSource.title}</SourceCardTitle>
      <SourceCardUrl>{truncateSource(videoSource.url)}</SourceCardUrl>

      <Controls>
        <EditButton onClick={openEditModal}>Edit</EditButton>
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
        <DeleteButton onClick={openDeleteModal}>Delete</DeleteButton>
        <DeleteSourceModal
          closeModal={closeDeleteModal}
          deleteVideoSource={deleteVideoSource}
          modalOpen={deleteModalOpen}
          title={title}
          videoSource={videoSource}
          url={url}
        />
      </Controls>
    </Card>
  );
};

export default VideoSource;
