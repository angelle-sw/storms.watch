import styled from "styled-components";
import Modal from "react-modal";
import { IoMdClose as Close } from "react-icons/io";
import ModalContent from "./ModalContent";
import TitleInput from "./TitleInput";
import UrlInput from "./UrlInput";
import StatusRadio from "./StatusRadio";
import AddUpdateButton from "./AddUpdateButton";
import { IVideoSource } from "../types";

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

const Form = styled.form`
  display: grid;
  row-gap: 12px;
`;

const CloseModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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
      <ModalContent>
        <CloseModalButtonContainer>
          <span onClick={closeModal} role="button">
            <Close size="24" />
          </span>
        </CloseModalButtonContainer>

        <Form
          onSubmit={async (event) => {
            event.preventDefault();
            await editVideoSource({ id: videoSource.id, status, title, url });
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
          </StatusRadio>

          <AddUpdateButton>
            <button type="submit">Update</button>
          </AddUpdateButton>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default EditSourceModal;
