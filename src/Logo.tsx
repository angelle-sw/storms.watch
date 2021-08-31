import styled, { keyframes } from "styled-components";

const blink = keyframes`
  to {
    opacity: 0;
  }
`;

const Container = styled.div`
  display: flex;
`;

const Img = styled.img`
  width: 250px;
  height: 100%;

  @media only screen and (min-width: 640px) {
    width: 300px;
  }

  @media only screen and (min-width: 880px) {
    width: 400px;
  }
`;

const StormModeIndicator = styled.div<{ $isOn: boolean }>`
  margin-left: 10px;
  height: 10px;
  width: 10px;
  background: red;
  border-radius: 50%;
  animation: ${blink} 1s infinite;
  opacity: 1;
  display: ${({ $isOn }) => ($isOn ? "block" : "none")};
`;

function Logo() {
  return (
    <Container>
      <Img src="./images/logo.png" alt="storms.watch" />
      <StormModeIndicator $isOn={false} />
    </Container>
  );
}

export default Logo;
