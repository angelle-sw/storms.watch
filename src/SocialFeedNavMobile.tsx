import styled from "styled-components";
import { FaRedditAlien, FaTwitter } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  activeFeed: "reddit" | "twitter";
  setActiveFeed: (feed: "reddit" | "twitter") => void;
  setIsOpen: (isOpen: boolean) => void;
}

const Container = styled.ul`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 0;
  padding: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  list-style: none;
  background: #1a1b2f;
  z-index: 1;
  box-shadow: 0 0 50px #00000077;

  @media only screen and (min-width: 880px) {
    display: none;
  }
`;

const NavItem = styled.li`
  margin: 0 20px;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #ffffff60;
  transition: color 0.25s;

  &:hover {
    color: #fff;
  }
`;

const RedditIcon = styled(FaRedditAlien)<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? "#fff" : "inherit")};
`;

const TwitterIcon = styled(FaTwitter)<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? "#fff" : "inherit")};
`;

const SocialFeedNavMobile = ({
  isOpen,
  activeFeed,
  setActiveFeed,
  setIsOpen,
}: Props) => (
  <Container>
    <NavItem>
      <NavLink
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
          setActiveFeed("reddit");
        }}
      >
        <RedditIcon $isActive={isOpen && activeFeed === "reddit"} size={32} />
      </NavLink>
    </NavItem>

    <NavItem>
      <NavLink
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
          setActiveFeed("twitter");
        }}
      >
        <TwitterIcon $isActive={isOpen && activeFeed === "reddit"} size={32} />
      </NavLink>
    </NavItem>
  </Container>
);

export default SocialFeedNavMobile;
