import Link from "next/link";
import { FaSlidersH } from "react-icons/fa";
import useDebugFlags from "../hooks/useDebugFlags";
import styled from "styled-components";

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
  const debugFlags = useDebugFlags();

  return (
    <Link
      href={{
        pathname: "/admin",
        query: debugFlags,
      }}
    >
      <Container>
        <FaSlidersH size={32} />
      </Container>
    </Link>
  );
};

export default AdminDashboardIcon;
