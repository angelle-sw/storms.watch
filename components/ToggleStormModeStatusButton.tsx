import styled from "styled-components";
import { useState, useEffect } from "react";

type Props = {
  adminPassphrase: string;
  openModal: () => void;
  status: boolean;
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
  adminPassphrase,
  openModal,
  status,
}: Props) => {
  return (
    <Container role="button" onClick={() => openModal()}>
      <Button>{status ? "Exit Storm Mode" : "Enter Storm Mode"}</Button>
    </Container>
  );
};

export default ToggleStormModeStatus;
