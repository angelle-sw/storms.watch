import React from "react";

interface Props {
  title: string;
  url: string;
}

const Stream = ({ title, url }: Props) => {
  return (
    <li>
      <div>
        <iframe title={title} src={url} frameBorder="0" allow="autoplay" />
      </div>
      <h2>{title}</h2>
    </li>
  );
};

export default Stream;