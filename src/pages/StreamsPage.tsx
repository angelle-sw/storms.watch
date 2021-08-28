import Stream from "../Stream";

const StreamsPage = () => {
  return (
    <ul className="streams">
      <Stream
        title="WFAA"
        url="https://www.youtube.com/embed/yDhRFKNprKE?autoplay=1&mute=1"
      />
      <Stream
        title="I-10/I-12 Traffic Cam"
        url="https://www.youtube.com/embed/2C8ShyNmhOc?autoplay=1&mute=1"
      />
      <Stream
        title="Southeast LA"
        url="https://www.youtube.com/embed/ma03z0MKjxw?autoplay=1&mute=1"
      />
      <Stream
        title="New Orleans, LA"
        url="https://www.youtube.com/embed/OGjjTASWwYA?autoplay=1&mute=1"
      />
      <Stream
        title="Leeville, LA"
        url="https://www.youtube.com/embed/Z6OKCfWX5oM?autoplay=1&mute=1"
      />
      <Stream
        title="New Orleans, LA (French Quarter)"
        url="https://www.youtube.com/embed/QnWFKx485rA?autoplay=1&mute=1"
      />
      <Stream
        title="Coastal & Inland Cams"
        url="https://player.twitch.tv/?channel=hurricams&parent=storms.watch&parent=localhost"
      />
      <Stream
        title="Biloxi, MS"
        url="https://www.youtube.com/embed/SIA3m2Ai3hU?autoplay=1&mute=1"
      />
      <Stream
        title="Mobile, AL"
        url="https://www.youtube.com/embed/a1Cfw_muqJw?autoplay=1&mute=1"
      />
      <Stream
        title="Coastal Cams"
        url="https://www.youtube.com/embed/WyHud8_dUlA?autoplay=1&mute=1"
      />
    </ul>
  );
};

export default StreamsPage;
