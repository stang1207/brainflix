import './MainVideo.scss';

const MainVideo = ({ currentVideo }) => {
  return (
    <section className="main-video">
      <video
        controls
        preload="metadata"
        poster={currentVideo.image}
        className="main-video__player"
      >
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        ></source>
      </video>
    </section>
  );
};

export default MainVideo;
