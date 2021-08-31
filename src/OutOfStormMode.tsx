import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 50vh;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #ffffff80;
  text-align: center;
`;

const OutOfStormMode = () => (
  <Container>We are currently not in storm mode.</Container>
);

export default OutOfStormMode;
