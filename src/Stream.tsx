import styled from "styled-components";

interface Props {
  title: string;
  url: string;
}

const Container = styled.li`
  margin-bottom: 2em;
  width: 100%;
  text-align: center;

  &:nth-child(odd) {
    margin-right: 2em;
  }

  @media only screen and (min-width: 1120px) {
    width: calc(50% - 1em);
    text-align: left;
  }

  > div {
    position: relative;
    padding-bottom: 56.25%;
    max-width: 100%;
    height: 0;
    overflow: hidden;
    background: #000;
  }

  > div iframe,
  > div object,
  > div embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
`;

const Stream = ({ title, url }: Props) => {
  return (
    <Container>
      <div>
        <iframe
          title={title}
          src={url}
          frameBorder="0"
          allow="autoplay"
          allowFullScreen
        />
      </div>
      <h2>{title}</h2>
    </Container>
  );
};

export default Stream;
