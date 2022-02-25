import './MainVideo.scss';
import Box from '../Box/Box';

const MainVideo = ({ currentVideo }) => {
  return (
    <Box element="section" className="main-video">
      <Box element="div" className="main-video__content">
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
      </Box>
    </Box>
  );
};

export default MainVideo;
