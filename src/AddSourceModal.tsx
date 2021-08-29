import React, { useState } from "react";
import Modal from "react-modal";
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
    width: "500px",
    height: "300px",
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
      contentLabel="Example Modal"
      style={customModalStyles}
    >
      <div className="edit-modal">
        <button onClick={closeModal}>Close</button>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await addVideoSource({ id: uuid(), title, url, status });
            setTitle("");
            setUrl("");
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
          <button type="submit">Add</button>
        </form>
      </div>
    </Modal>
  );
};

export default AddSourceModal;
