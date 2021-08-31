import styled from "styled-components";
import {
  FaTwitter as TwitterIcon,
  FaRedditAlien as RedditIcon,
} from "react-icons/fa";

const Container = styled.ul`
  display: none;
  margin: 0;
  padding: 0;
  list-style: none;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: 880px) {
    display: flex;
  }
`;

const NavItem = styled.li`
  margin: 0 1em;
`;

const NavLink = styled.a<{ $isActive: boolean }>`
  display: flex;
  padding: 0 20px 12px;
  align-items: center;
  justify-content: center;
  border-bottom: ${({ $isActive }) =>
    $isActive ? "2px solid #fff" : "2px solid transparent"};
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#ffffff60")};
  font-size: 20px;
  text-decoration: none;
  transition: color 0.25s;

  &:hover {
    color: #fff;
  }
`;

const IconContainer = styled.div`
  margin-right: 10px;
`;

interface Props {
  isOpen: boolean;
  activeFeed: "reddit" | "twitter";
  onOpen: () => void;
  onSelect: (feed: "reddit" | "twitter") => void;
}

const SocialFeedNav = ({ isOpen, activeFeed, onOpen, onSelect }: Props) => (
  <Container>
    <NavItem>
      <NavLink
        href="#"
        $isActive={isOpen && activeFeed === "reddit"}
        onClick={(e) => {
          e.preventDefault();
          onSelect("reddit");
        }}
      >
        <IconContainer>
          <RedditIcon size={20} />
        </IconContainer>

        <span>Reddit</span>
      </NavLink>
    </NavItem>

    <NavItem>
      <NavLink
        href="#"
        $isActive={isOpen && activeFeed === "twitter"}
        onClick={(e) => {
          e.preventDefault();
          onOpen();
          onSelect("twitter");
        }}
      >
        <IconContainer>
          <TwitterIcon size={20} />
        </IconContainer>
        <span>Twitter</span>
      </NavLink>
    </NavItem>
  </Container>
);

export default SocialFeedNav;
