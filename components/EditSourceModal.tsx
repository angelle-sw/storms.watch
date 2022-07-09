import React from "react";
import Modal from "react-modal";
import { IoMdClose as Close } from "react-icons/io";

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
    borderRadius: "8px",
    paddingRight: "24px",
    paddingLeft: "24px",
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
      style={customModalStyles}
    >
      <div className="modal">
        <div className="close-modal">
          <span onClick={closeModal} role="button">
            <Close size="24" />
          </span>
        </div>
        <form
          className="add-edit-modal"
          onSubmit={async (event) => {
            event.preventDefault();
            await editVideoSource({ id: videoSource.id, status, title, url });
            closeModal();
          }}
        >
          <div className="title-input">
            <input
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Title"
              value={title}
            />
          </div>
          <div className="url-input">
            <textarea
              onChange={(event) => setUrl(event.target.value)}
              placeholder="URL"
              value={url}
            />
          </div>
          <div className="status-radio">
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
          <div className="add-update-button">
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditSourceModal;
