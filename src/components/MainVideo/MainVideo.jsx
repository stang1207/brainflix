import './MainVideo.scss';

const MainVideo = ({ currentVideo }) => {
  return (
    <section className="main-video">
      <div className="main-video__wrapper">
        <video
          controls
          preload="metadata"
          poster={currentVideo.image}
          className="main-video__player"
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        />
      </div>
    </section>
  );
};

export default MainVideo;
