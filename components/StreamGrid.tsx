import styled, { css } from "styled-components";
import Stream from "./Stream";
import useVideoSources from "../hooks/useVideoSources";
import { IVideoSource } from "../types";

interface Props {
  socialFeedIsOpen: boolean;
  videoSources: IVideoSource[];
}

const Container = styled.ul<{ socialFeedIsOpen: boolean }>`
  display: ${({ socialFeedIsOpen }) => (socialFeedIsOpen ? "none" : "flex")};
  margin: 0;
  padding: 0;
  margin-top: 2em;
  width: 100%;
  min-height: 500px;
  flex-wrap: wrap;
  list-style: none;
  border-radius: 1em;

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

const StreamGrid = ({ socialFeedIsOpen, videoSources }: Props) => {
  const { data: videoSourcesData, isLoading } = useVideoSources({
    initialData: { videoSources },
  });

  return (
    <Container socialFeedIsOpen={socialFeedIsOpen}>
      {!isLoading &&
        videoSourcesData
          .filter((source: IVideoSource) => source.status)
          .map((source: IVideoSource) => (
            <Stream key={source.id} title={source.title} url={source.url} />
          ))}
    </Container>
  );
};

export default StreamGrid;
