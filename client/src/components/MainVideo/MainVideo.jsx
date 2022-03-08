import './MainVideo.scss';

/**
 * Main active video component
 * @prop   {object} currentVideo  - An object that includes all the info about the current active video, such as title, description, image, likes...
 * @return  {HTMLElement}  - An section that includes a video of the current active vide
 */

const MainVideo = ({ currentVideo }) => {
  const { image } = currentVideo;
  return (
    <section className="main-video">
      <div className="main-video__wrapper">
        <video
          controls
          preload="metadata"
          poster={image}
          className="main-video__player"
          src={
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
          }
        />
      </div>
    </section>
  );
};

export default MainVideo;
