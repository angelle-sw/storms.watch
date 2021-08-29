import React, { useState } from "react";
import Modal from "react-modal";
import { IoMdClose as Close } from "react-icons/io";
import { v4 as uuid } from "uuid";

type IVideoSource = {
  id: string;
  status: boolean;
  title: string;
  url: string;
};

type Props = {
  addVideoSource: (source: IVideoSource) => void;
  closeModal: () => void;
  modalOpen: boolean;
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

const AddSourceModal = ({ addVideoSource, closeModal, modalOpen }: Props) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState(true);

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
            await addVideoSource({ id: uuid(), title, url, status });
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
                setStatus((prev) => !prev);
              }}
            />
            <label htmlFor="on">On</label>
            <input
              type="radio"
              id="off"
              name="status"
              checked={!status}
              onChange={() => {
                setStatus((prev) => !prev);
              }}
            />
            <label htmlFor="off">Off</label>
          </div>
          <div className="add-update-button">
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddSourceModal;
