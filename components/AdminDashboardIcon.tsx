import styled from "styled-components";
import { useRouter } from "next/router";
import { FaSlidersH } from "react-icons/fa";
import useDebugFlags from "../hooks/useDebugFlags";

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

const AdminDashboardIcon = () => {
  const router = useRouter();
  const debugFlags = useDebugFlags();

  return (
    <Container
      role="button"
      onClick={() => router.push({ pathname: "/admin", query: debugFlags })}
    >
      <FaSlidersH size={32} />
    </Container>
  );
};

export default AdminDashboardIcon;
