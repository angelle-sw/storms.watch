import React from "react";
import Modal from "react-modal";

type IVideoSource = {
  id: any;
  title: string;
  url: string;
};

type Props = {
  closeModal: () => void;
  deleteVideoSource: (source: IVideoSource) => void;
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
    width: "500px",
    height: "300px",
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
      contentLabel="Example Modal"
      style={customModalStyles}
    >
      <div className="edit-modal">
        <button onClick={closeModal}>Close</button>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await deleteVideoSource({ id: videoSource.id, title: title, url });
            closeModal();
          }}
        >
          <div>{title}</div>
          <div>{url}</div>
          <button onClick={() => closeModal()}>Cancel</button>
          <button type="submit">Delete</button>
        </form>
      </div>
    </Modal>
  );
};

export default DeleteSourceModal;
