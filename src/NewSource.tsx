import styled from "styled-components";
import Card from "./Card";
import { FaPlusCircle as NewSourceIcon } from "react-icons/fa";

const Container = styled(Card)`
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;

  > svg {
    transition: fill 0.25s;
    fill: #ffffff60;
  }

  &:hover > svg {
    fill: #fff;
  }
`;

type Props = {
  openAddModal: () => void;
};

const NewSource = ({ openAddModal }: Props) => (
  <Container onClick={openAddModal} role="button">
    <NewSourceIcon size={40} />
  </Container>
);

export default NewSource;
