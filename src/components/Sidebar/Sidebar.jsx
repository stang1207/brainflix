import './Sidebar.scss';
import Video from '../Video/Video.jsx';

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
