import React from "react";
import Modal from "react-modal";

type IVideoSource = {
  id: string;
  status: boolean;
  title: string;
  url: string;
};

type Props = {
  closeModal: () => void;
  modalOpen: boolean;
  setStatus: (status: boolean) => void;
  setTitle: (title: string) => void;
  setUrl: (url: string) => void;
  status: boolean;
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
  setStatus,
  setTitle,
  setUrl,
  status,
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
            await editVideoSource({ id: videoSource.id, status, title, url });
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
          <div>
            <div>Status</div>  
            <input
              type="radio"
              id="on"
              name="status"
              checked={status}
              onChange={() => {
                setStatus(!status);
              }}
            />
            <label htmlFor="on">On</label>
            <input
              type="radio"
              id="off"
              name="status"
              checked={!status}
              onChange={() => {
                setStatus(!status);
              }}
            />
            <label htmlFor="off">Off</label>
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </Modal>
  );
};

export default EditSourceModal;
