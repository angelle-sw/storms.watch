import { IoMdClose as Close } from "react-icons/io";
import Modal from "react-modal";
import { UseMutateFunction } from "react-query";
import styled from "styled-components";
import ModalContent from "./ModalContent";

type Props = {
  closeModal: () => void;
  modalOpen: boolean;
  setStatus: UseMutateFunction;
  status: boolean;
};

const CloseModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StormModeButtonContainer = styled.div`
  display: flex;
  justify-content: center;
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

const Button = styled.button`
  display: flex;
  justify-content: center;
  background: transparent;
  color: #fe3939;
  height: 15px;
  padding: 15px;
  border: 1px solid #ffffff60;
  border-radius: 3px;
  line-height: 0px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    border: 1px solid white;
    color: red;
  }
`;

const Container = styled.span`
  display: flex;
  justify-content: center;
  padding: 15px;
  transition: fill 0.25s;
  color: #ffffff60;

  &:hover {
    cursor: pointer;
    color: #fff;
  }
`;

const ToggleStormModeConfirmationModal = ({
  closeModal,
  modalOpen,
  status,
  setStatus,
}: Props) => {
  return (
    <Modal
      ariaHideApp={false}
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

        <StormModeButtonContainer>
          Are you sure you want to
          {status ? " exit storm mode?" : " enter storm mode?"}
        </StormModeButtonContainer>
        <Container
          role="button"
          onClick={() => {
            setStatus();
            closeModal();
          }}
        >
          <Button>{status ? "Exit Storm Mode" : "Enter Storm Mode"}</Button>
        </Container>
      </ModalContent>
    </Modal>
  );
};

export default ToggleStormModeConfirmationModal;
