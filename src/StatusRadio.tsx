import styled from "styled-components";

const StatusRadio = styled.div`
  padding-right: 16px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;

  & > input,
  & > label {
    cursor: pointer;
  }
`;

export default StatusRadio;
