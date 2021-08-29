import React from "react";
import Modal from "react-modal";

type IVideoSource = {
  id: any;
  title: string;
  url: string;
};

type Props = {
  closeModal: () => void;
  modalOpen: boolean;
  setTitle: (title: string) => void;
  setUrl: (url: string) => void;
  title: string;
  editVideoSource: (source: IVideoSource) => void;
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

const EditSourceModal = ({
  closeModal,
  modalOpen,
  setTitle,
  setUrl,
  title,
  videoSource,
  editVideoSource,
  url,
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
            await editVideoSource({ id: videoSource.id, title, url });
            closeModal();
          }}
        >
          <div>
            <input
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Title"
              value={title}
            />
          </div>
          <div>
            <textarea
              onChange={(event) => setUrl(event.target.value)}
              placeholder="URL"
              value={url}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </Modal>
  );
};

export default EditSourceModal;
