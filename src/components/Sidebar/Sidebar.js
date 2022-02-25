import './Sidebar.scss';
import Video from '../Video/Video';

const VideoList = ({ changeCurrentVideo, videos }) => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">Next videos</h2>
      <ul className="sidebar__video-list">
        {videos.map((video) => {
          return (
            <Video
              key={video.id}
              video={video}
              videoTitle={video.title}
              videoAuthor={video.channel}
              imgUrl={video.image}
              changeCurrentVideo={changeCurrentVideo}
            />
          );
        })}
      </ul>
    </aside>
  );
};

export default VideoList;
