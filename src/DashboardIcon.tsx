import { useNavigate } from "react-router";
import styled from "styled-components";
import { FaSlidersH } from "react-icons/fa";

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

const DashboardIcon = () => {
  const navigate = useNavigate();

  return (
    <Container role="button" onClick={() => navigate("/admin")}>
      <FaSlidersH size={32} />
    </Container>
  );
};

export default DashboardIcon;
