<script>
  if (process.browser) {
    const refreshTropicalReddit = () => {
      document.querySelector('.tropical-reddit').src = './tropical-reddit.html';
    };

    window.setInterval(refreshTropicalReddit, 60000);

    // const resizeFacebookStream = () => {
    //   console.log('resize');
    //   const targetSize = [...document.querySelectorAll('.stream')][1].clientWidth;
    // };

    // window.addEventListener('resize', resizeFacebookStream);
  }

</script>

<style>
  .page {
    margin-top: -0.5em;
    padding-bottom: 1em;
    display: flex;
    flex-direction: column;
  }

  h3 {
    margin-bottom: 0.5em;
    text-align: center;
  }

  .streams {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-content: flex-start;
  }

  .stream {
    margin: 1em 0;
    flex: 1 0 calc(100% - 1em);
  }
  
  .embed-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
  }

  .embed-container iframe,
  .embed-container object,
  .embed-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .stream iframe {
    width: 100%;
  }

  .offline-container {
    position: relative;
    display: flex;
    max-width: 100%;
    padding-bottom: 56.25%;
    background: #eee;
    justify-content: center;
    font-style: italic;
  }

  .offline {
    position: absolute;
    top: 50%;
    margin-top: -15px;
    height: 30px;
    display: flex;
    align-items: center;
  }

  .tropical-twitter {
    margin: 1em 0 0 0;
    width: 100%;
    height: 800px;
    border: 1px solid rgba(15, 70, 100, 0.12);
    overflow: auto;
  }

  .tropical-reddit {
    margin: 16px 0 0 0;
    width: 100%;
    min-height: 1000px;
    font-size: 14px;
    border: none;
    overflow: hidden;
  }

  :global(.reddit-title) {
    font-size: 18px;
  }

  @media (min-width: 1000px) {
    .page {
      margin-top: 0;
      flex-direction: row;
    }

    h3 {
      text-align: left;
    }

    .tropical-twitter {
      margin: 1em 1em 0 0;
      width: 22%;
      height: 1582px;
      height: 1423px;
    }

    .tropical-reddit {
      margin: 16px 0 0 0;
      width: 18%;
      height: 1582px;
      height: 1423px;
      border: 1px solid rgba(15, 70, 100, 0.12);
    }

    .streams {
      width: 60%;
    }

    .embed-container,
    .offline-container {
      max-width: calc(100% - 1em);
    }
  }

  @media (min-width: 1150px) {
    .stream {
      margin: 1em 1em 1em 0;
      flex: 1 0 calc(50% - 1em);
    }

    .embed-container,
    .offline-container {
      max-width: 100%;
      width: 100%;
    }
  }
</style>

<svelte:head>
  <title>Storm Mode / storms.watch</title>
</svelte:head>

<div class="page">
  <div class="streams">

    <!-- <div class="stream">
      <h3>12News</h3>
      <div class="embed-container">
        <iframe
          title="12News"
          type="text/html"
          src="https://www.youtube.com/embed/vS9bc5aAqXk?autoplay=1&mute=1"
          frameborder="0"
          allow="autoplay"
          allowfullscreen="1" />
      </div>
    </div> -->

    <div class="stream">
      <h3>Agenda-Free TV</h3>
      <div class="embed-container">
        <iframe
          title="Agenda-Free TV"
          type="text/html"
          src="https://www.youtube.com/embed/Qc4pFwpmKQs?autoplay=1&mute=1"
          frameborder="0"
          allow="autoplay"
          allowfullscreen="1" />
      </div>
    </div>

    <!-- <div class="stream">
      <h3>Reed Timmer</h3>
      <div class="embed-container">
        <div
          class="fb-video"
          data-href="https://www.facebook.com/reedtimmer2.0/videos/826650501409007/"
          data-show-text="false"
          data-width="auto">
          <blockquote

            cite="https://developers.facebook.com/reedtimmer2.0/videos/826650501409007/"
            class="fb-xfbml-parse-ignore" />
        </div>
      </div>
    </div> -->

    <div class="stream">
      <h3>Jeff Piotrowski</h3>
      <div class="embed-container">
        <iframe
          title="Jeff Piotrowski"
          type="text/html"
          src="https://www.youtube.com/embed/WpEgJ9qysUk?autoplay=1&mute=1"
          frameborder="0"
          allow="autoplay"
          allowfullscreen="1" />
      </div>
    </div>

    <div class="stream">
      <h3>Delta Field Mission</h3>
      <div class="embed-container">
        <iframe
          title="Delta Field Mission"
          type="text/html"
          src="https://www.youtube.com/embed/kFp4ShRIi7I?autoplay=1&mute=1"
          frameborder="0"
          allow="autoplay"
          allowfullscreen="1" />
      </div>

      <!-- <div class="offline-container">
        <span class="offline">(currently offline)</span>
      </div> -->
    </div>

    <div class="stream">
      <h3>StormChasingVideo</h3>
      <div class="embed-container">
        <iframe
          title="StormChasingVideo"
          type="text/html"
          src="https://www.youtube.com/embed/lNCcmAu8Iss?autoplay=1&mute=1"
          frameborder="0"
          allow="autoplay"
          allowfullscreen="1" />
      </div>

      <!-- <div class="offline-container">
        <span class="offline">(currently offline)</span>
      </div> -->
    </div>

    <div class="stream">
      <h3>Lake Arthur</h3>
      <div class="embed-container">
        <iframe
          src="https://player.twitch.tv/?channel=ohioweathernut&parent=storms.watch&parent=localhost"
          frameborder="0"
          allowfullscreen="1" />
      </div>

      <!-- <div class="offline-container">
        <span class="offline">(currently offline)</span>
      </div> -->
    </div>

    <!-- <div class="stream">
      <h3>Lake Arthur #2</h3>
      <div class="embed-container">
        <iframe
          title="Lake Arthur #2"
          type="text/html"
          src="https://www.youtube.com/embed/HHk3WXd2sUQ?autoplay=1&mute=1"
          frameborder="0"
          allow="autoplay"
          allowfullscreen="1" />
      </div>
    </div> -->

    <div class="stream">
      <h3>svrweather</h3>
      <div class="embed-container">
        <iframe
          title="svrweather"
          type="text/html"
          src="https://www.youtube.com/embed/o1GRBm8OtGo?autoplay=1&mute=1"
          frameborder="0"
          allow="autoplay"
          allowfullscreen="1" />
      </div>
    </div>

    <!-- <div class="stream">
      <h3>Lake Charles</h3>
      <div class="embed-container">
        <iframe
          src="https://player.twitch.tv/?channel=mezmerial&parent=storms.watch&parent=localhost"
          frameborder="0"
          allowfullscreen="1" />
      </div>
    </div> -->

    <div class="stream">
      <h3>Jennings #1</h3>
      <div class="embed-container">
        <iframe
          src="https://player.twitch.tv/?channel=jennifermcmahan&parent=storms.watch&parent=localhost"
          frameborder="0"
          allowfullscreen="1" />
      </div>
    </div>

    <div class="stream">
      <h3>Jennings #2</h3>
      <div class="embed-container">
        <iframe
          src="https://player.twitch.tv/?channel=txwxman1&parent=storms.watch&parent=localhost"
          frameborder="0"
          allowfullscreen="1" />
      </div>

      <!-- <div class="offline-container">
        <span class="offline">(currently offline)</span>
      </div> -->
    </div>

    <!-- <div class="stream">
      <h3>Lafayette</h3>
      <div class="embed-container">
        <iframe
          src="https://player.twitch.tv/?channel=not_a_bot100&parent=storms.watch&parent=localhost"
          frameborder="0"
          allowfullscreen="1" />
      </div>
    </div> -->

    <!-- <div class="stream">
      <h3>Gulf Coast</h3>
      <div class="embed-container">
        <iframe
          title="Gulf Coast"
          type="text/html"
          src="https://www.youtube.com/embed/RPXNIKM5nPQ?autoplay=1&mute=1"
          frameborder="0"
          allow="autoplay"
          allowfullscreen="1" />
      </div>
    </div> -->

  </div>

  <div class="tropical-twitter">
    <a
      class="twitter-timeline"
      href="https://twitter.com/wx_becks/lists/tropical-twitter?ref_src=twsrc%5Etfw" />
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8">

    </script>
  </div>

  <iframe class="tropical-reddit" src="./tropical-reddit.html" />
</div>