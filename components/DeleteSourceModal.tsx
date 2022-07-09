import React from "react";
import Modal from "react-modal";
import { IoMdClose as Close } from "react-icons/io";
import { truncateSource } from "./VideoSource";

type IVideoSource = {
  id: string;
  status: boolean;
  title: string;
  url: string;
};

type Props = {
  closeModal: () => void;
  deleteVideoSource: (id: string) => void;
  modalOpen: boolean;
  title: string;
  url: string;
  videoSource: IVideoSource;
};

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#42435d",
    borderRadius: "8px",
    paddingRight: "24px",
    paddingLeft: "24px",
  },
};

const DeleteSourceModal = ({
  closeModal,
  deleteVideoSource,
  modalOpen,
  title,
  url,
  videoSource,
}: Props) => {
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customModalStyles}
    >
      <div className="modal">
        <div className="close-modal">
          <span onClick={closeModal} role="button">
            <Close size="24" />
          </span>
        </div>
        <form
          className="delete-modal"
          onSubmit={async (event) => {
            event.preventDefault();
            await deleteVideoSource(videoSource.id);
            closeModal();
          }}
        >
          <div className="source-card-title">{title}</div>
          <div className="source-card-url">{truncateSource(url)}</div>
          <div className="delete-controls">
            <button className="cancel" onClick={() => closeModal()}>
              Cancel
            </button>
            <button className="delete" type="submit">
              Delete
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default DeleteSourceModal;
