import styled from "styled-components";
import Modal from "react-modal";
import ModalContent from "./ModalContent";
import { IoMdClose as Close } from "react-icons/io";
import { truncateSource } from "./VideoSource";
import SourceCardTitle from "./SourceCardTitle";
import SourceCardUrl from "./SourceCardUrl";
import { IVideoSource } from "../types";

type Props = {
  closeModal: () => void;
  deleteVideoSource: (id: string) => void;
  modalOpen: boolean;
  title: string;
  url: string;
  videoSource: IVideoSource;
};

const DeleteModalForm = styled.form`
  display: grid;
  row-gap: 16px;
`;

const DeleteControls = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 14px;
`;

const ActionButton = styled.button`
  background: #fff;
  width: 80px;
  height: 30px;
  cursor: pointer;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  transition: color 0.25s;
  margin-right: 8px;
  margin-top: 12px;
`;

const CancelButton = styled(ActionButton)`
  background: #fff;

  &:hover {
    background: #dee2e6;
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #c71f37;
  color: white;

  &:hover {
    background: #a71e34;
  }
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
      <ModalContent>
        <CloseModalButtonContainer>
          <span onClick={closeModal} role="button">
            <Close size="24" />
          </span>
        </CloseModalButtonContainer>

        <DeleteModalForm
          onSubmit={async (event) => {
            event.preventDefault();
            await deleteVideoSource(videoSource.id);
            closeModal();
          }}
        >
          <SourceCardTitle>{title}</SourceCardTitle>
          <SourceCardUrl>{truncateSource(url)}</SourceCardUrl>
          <DeleteControls>
            <CancelButton onClick={() => closeModal()}>Cancel</CancelButton>
            <DeleteButton type="submit">Delete</DeleteButton>
          </DeleteControls>
        </DeleteModalForm>
      </ModalContent>
    </Modal>
  );
};

export default DeleteSourceModal;
