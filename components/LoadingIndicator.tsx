import styled, { keyframes } from "styled-components";
import { WiHurricane as HurricaneIcon } from "react-icons/wi";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-360deg);
  }
`;

const Container = styled.div`
  position: absolute;
  margin-top: 120px;
  left: calc(50% - 116px);
  height: 232px;
  animation: ${spin} 0.5s linear infinite;
`;

const LoadingIndicator = () => (
  <Container>
    <HurricaneIcon size={240} color="#ffffff70" />
  </Container>
);

export default LoadingIndicator;
