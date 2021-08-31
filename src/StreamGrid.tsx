import styled, { css } from "styled-components";
import Stream from "./Stream";
import useVideoSources from "./hooks/useVideoSources";

interface Props {
  socialFeedIsOpen: boolean;
}

interface IVideoSource {
  id: string;
  status: boolean;
  title: string;
  url: string;
}

const Container = styled.ul<{ socialFeedIsOpen: boolean }>`
  display: ${({ socialFeedIsOpen }) => (socialFeedIsOpen ? "none" : "flex")};
  margin: 0;
  padding: 0;
  margin-top: 2em;
  width: 100%;
  flex-wrap: wrap;
  list-style: none;
  border-radius: 2em;

  @media only screen and (min-width: 640px) {
    padding: 2em 2em 0;
    background: #1a1b2f;
  }

  ${({ socialFeedIsOpen }) =>
    socialFeedIsOpen &&
    css`
      @media only screen and (min-width: 880px) {
        display: flex;
        margin-top: 3em;
      }
    `}

  @media only screen and (min-width: 1120px) {
    margin-top: 3em;
  }
`;

const StreamGrid = ({ socialFeedIsOpen }: Props) => {
  const { data: videoSourcesData, isLoading } = useVideoSources();

  if (isLoading) {
    return null;
  }

  return (
    <Container socialFeedIsOpen={socialFeedIsOpen}>
      {videoSourcesData
        .filter((source: IVideoSource) => source.status)
        .map((source: IVideoSource) => (
          <Stream title={source.title} url={source.url} />
        ))}
    </Container>
  );
};

export default StreamGrid;
