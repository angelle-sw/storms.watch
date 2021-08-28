import React from "react";
import Stream from "../Stream";

// https://www.youtube.com/watch?v=unAcs4-vNcA

const StreamsPage = () => {
  return (
    <ul className="streams">
      <Stream
        title="Stream 1"
        url="https://www.youtube.com/embed/WpEgJ9qysUk?autoplay=1&mute=1"
      />
      <Stream
        title="Stream 2"
        url="https://www.youtube.com/embed/lNCcmAu8Iss?autoplay=1&mute=1"
      />
      <Stream
        title="Stream 3"
        url="https://www.youtube.com/embed/o1GRBm8OtGo?autoplay=1&mute=1"
      />
      <Stream
        title="Stream 4"
        url="https://www.youtube.com/embed/HHk3WXd2sUQ?autoplay=1&mute=1"
      />
      <Stream
        title="Stream 5"
        url="https://www.youtube.com/embed/K_QXbe1k81s?autoplay=1&mute=1"
      />
      <Stream
        title="Stream 6"
        url="https://www.youtube.com/embed/kFp4ShRIi7I?autoplay=1&mute=1"
      />
      <Stream
        title="Stream 7"
        url="https://www.youtube.com/embed/RPXNIKM5nPQ?autoplay=1&mute=1"
      />
      <Stream
        title="Stream 8"
        url="https://www.youtube.com/embed/e0A4hD2teBc?autoplay=1&mute=1"
      />
    </ul>
  );
};

export default StreamsPage;
