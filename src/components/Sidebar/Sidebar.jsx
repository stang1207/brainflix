import Video from '../Video/Video.jsx';
import './Sidebar.scss';

/**
 * Sidebar videolist component
 * @prop   {array} videos  - An array of video objects that is used for building sidebar video
 * @return  {JSXElement}  - an JSX element that displays a thumbnail video and title
 */

const VideoList = ({ videos }) => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar__heading">Next videos</h2>
      <ul className="sidebar__video-list">
        {videos.map((video) => {
          return <Video key={video.id} video={video} />;
        })}
      </ul>
    </aside>
  );
};

export default VideoList;
