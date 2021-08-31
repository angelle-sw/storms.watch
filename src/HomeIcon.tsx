import { useNavigate } from "react-router";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";

const Container = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  padding-top: 14px;
  padding-right: 14px;
  transition: fill 0.25s;
  color: #ffffff60;

  &:hover {
    cursor: pointer;
    color: #fff;
  }
`;

const HomeIcon = () => {
  const navigate = useNavigate();

  return (
    <Container role="button" onClick={() => navigate("/")}>
      <FaHome size={32} />
    </Container>
  );
};

export default HomeIcon;
