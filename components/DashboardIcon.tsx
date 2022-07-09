import styled from "styled-components";
import { useRouter } from "next/router";
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
  const router = useRouter();

  return (
    <Container role="button" onClick={() => router.push("/admin")}>
      <FaSlidersH size={32} />
    </Container>
  );
};

export default DashboardIcon;
