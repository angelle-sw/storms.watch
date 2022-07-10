import styled from "styled-components";
import { useRouter } from "next/router";
import { FaHome } from "react-icons/fa";
import useDebugFlags from "../hooks/useDebugFlags";

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
  const router = useRouter();
  const debugFlags = useDebugFlags();

  return (
    <Container
      role="button"
      onClick={() => router.push({ pathname: "/", query: debugFlags })}
    >
      <FaHome size={32} />
    </Container>
  );
};

export default HomeIcon;
