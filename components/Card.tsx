import styled from "styled-components";

const Card = styled.div<{ $isOff?: boolean }>`
  display: grid;
  row-gap: 12px;
  grid-template-rows: min-content 1fr min-content;
  padding: 24px;
  border-width: 4px;
  border-style: solid;
  border-color: ${({ $isOff }) => ($isOff ? "#ffdd00" : "#ffffff60")};
  border-radius: 8px;
  width: 300px;
  height: 140px;
  background: #050521;
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: #fff;
  }
`;

export default Card;
