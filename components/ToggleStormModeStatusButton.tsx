import { useMemo } from "react";
import styled from "styled-components";

type Props = {
  loading: boolean;
  openModal: () => void;
  status: boolean;
  toggleStormModeStatusData: boolean;
};

const Button = styled.button`
  background: transparent;
  color: white;
  height: 15px;
  padding: 15px;
  border: 1px solid #ffffff60;
  border-radius: 3px;
  line-height: 0px;
  filter: brightness(50%);
  font-weight: bold;

  &:hover {
    cursor: pointer;
    filter: brightness(100%);
  }
`;

const Container = styled.span`
  padding: 15px;
  transition: fill 0.25s;
  color: #ffffff60;

  &:hover {
    cursor: pointer;
    color: #fff;
  }
`;

const ToggleStormModeStatus = ({
  loading,
  openModal,
  status,
  toggleStormModeStatusData,
}: Props) => {
  console.log({ toggleStormModeStatusData });
  const buttonLabel = useMemo(() => {
    if (loading && (toggleStormModeStatusData || status)) {
      return "Exiting Storm Mode...";
    }
    if (loading && (!toggleStormModeStatusData || !status)) {
      return "Entering Storm Mode...";
    }
    if (toggleStormModeStatusData) {
      return "Exit Storm Mode";
    }
    if (!toggleStormModeStatusData) {
      return "Enter Storm Mode";
    } else {
      return "";
    }
  }, [loading, toggleStormModeStatusData, status]);
  return (
    <Container role="button" onClick={() => openModal()}>
      <Button>{buttonLabel}</Button>
    </Container>
  );
};

export default ToggleStormModeStatus;
