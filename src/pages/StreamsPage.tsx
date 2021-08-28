import React from "react";
import Stream from "../Stream";

// https://www.youtube.com/watch?v=unAcs4-vNcA

const StreamsPage = () => {
  return (
    <ul className="streams">
      <Stream
        title="Stream 1"
        url="https://www.youtube.com/embed/DFkSBK6s4CI?autoplay=1&mute=1"
      />
      <Stream
        title="Stream 2"
        url="https://www.youtube.com/embed/unAcs4-vNcA?autoplay=1&mute=1"
      />
      <Stream
        title="Stream 3"
        url="https://www.youtube.com/embed/TZ827lkktYs?autoplay=1&mute=1"
      />
      <Stream
        title="Stream 4"
        url="https://www.youtube.com/embed/961uG4Ixg_Y?autoplay=1&mute=1"
      />
      <Stream
        title="Stream 5"
        url="https://www.youtube.com/embed/aXqt-10pWpw?autoplay=1&mute=1"
      />
      <Stream
        title="Stream 6"
        url="https://www.youtube.com/embed/K_QXbe1k81s?autoplay=1&mute=1"
      />
    </ul>
  );
};

export default StreamsPage;
