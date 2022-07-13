import Link from "next/link";
import { FaHome } from "react-icons/fa";
import useDebugFlags from "../hooks/useDebugFlags";
import styled from "styled-components";

const Container = styled.span`
  padding: 15px;
  transition: fill 0.25s;
  color: #ffffff60;

  &:hover {
    cursor: pointer;
    color: #fff;
  }
`;

const HomeIcon = () => {
  const debugFlags = useDebugFlags();

  return (
    <Link
      href={{
        pathname: "/",
        query: debugFlags,
      }}
    >
      <Container>
        <FaHome size={32} />
      </Container>
    </Link>
  );
};

export default HomeIcon;
