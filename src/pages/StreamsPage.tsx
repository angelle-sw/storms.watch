import Stream from "../Stream";

const StreamsPage = () => {
  return (
    <ul className="streams">
      <Stream
        title="WFAA"
        url="https://www.youtube.com/embed/yDhRFKNprKE?autoplay=1&mute=1"
      />
      <Stream
        title="Southeast LA (Reed Timmer)"
        url="https://www.youtube.com/embed/LmbE_325rjs?autoplay=1&mute=1"
      />
      <Stream
        title="Houma, LA (Jeff Piotrowski)"
        url="https://www.youtube.com/embed/84dflaavVZg?autoplay=1&mute=1"
      />
      <Stream
        title="Houma, LA (Aaron Jayjack)"
        url="https://www.youtube.com/embed/wd9jxmceF0Y?autoplay=1&mute=1"
      />
      <Stream
        title="Morgan City, LA (hurricanetrack)"
        url="https://www.youtube.com/embed/Abk6KxMAhwI?autoplay=1&mute=1"
      />
      <Stream
        title="Cocodrie & New Orleans, LA"
        url="https://www.youtube.com/embed/gGt3OJRLh2c?autoplay=1&mute=1"
      />
      <Stream
        title="New Orleans, LA"
        url="https://www.youtube.com/embed/4IxKFLhwlfk?autoplay=1&mute=1"
      />
      <Stream
        title="Covington, LA"
        url="https://player.twitch.tv/?channel=atomis42&parent=storms.watch&parent=localhost"
      />
      <Stream
        title="East of New Orleans, LA"
        url="https://player.twitch.tv/?channel=radkemack&parent=storms.watch&parent=localhost"
      />
      {/*
      <Stream
        title="Leeville, LA"
        url="https://www.youtube.com/embed/Z6OKCfWX5oM?autoplay=1&mute=1"
      />
      */}
      {/*
      <Stream
        title="New Orleans, LA (French Quarter)"
        url="https://www.youtube.com/embed/1OwvQFnwsyU?autoplay=1&mute=1"
      />
      */}
      {/*
      <Stream
        title="Coastal & Inland Cams"
        url="https://player.twitch.tv/?channel=hurricams&parent=storms.watch&parent=localhost"
      />
      */}
      <Stream
        title="Biloxi, MS"
        url="https://www.youtube.com/embed/SIA3m2Ai3hU?autoplay=1&mute=1"
      />
    </ul>
  );
};

export default StreamsPage;
