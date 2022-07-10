import { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { IoMdClose as Close } from "react-icons/io";
import ModalContent from "./ModalContent";
import TitleInput from "./TitleInput";
import UrlInput from "./UrlInput";
import StatusRadio from "./StatusRadio";
import AddUpdateButton from "./AddUpdateButton";
import { v4 as uuid } from "uuid";
import { IVideoSource } from "../types";

type Props = {
  addVideoSource: (source: IVideoSource) => void;
  closeModal: () => void;
  modalOpen: boolean;
};

const Form = styled.form`
  display: grid;
  row-gap: 12px;
`;

const CloseModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseModalButton = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

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
      <ModalContent>
        <CloseModalButtonContainer>
          <CloseModalButton onClick={closeModal} role="button">
            <Close size="24" />
          </CloseModalButton>
        </CloseModalButtonContainer>

        <Form
          onSubmit={async (event) => {
            event.preventDefault();
            await addVideoSource({ id: uuid(), title, url, status });
            closeModal();
          }}
        >
          <div>
            <TitleInput
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Title"
              value={title}
            />
          </div>
          <div>
            <UrlInput
              onChange={(event) => setUrl(event.target.value)}
              placeholder="URL"
              value={url}
            />
          </div>
          <StatusRadio>
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
          </StatusRadio>
          <AddUpdateButton>
            <button type="submit">Add</button>
          </AddUpdateButton>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default AddSourceModal;
