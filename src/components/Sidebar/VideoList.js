import './VideoList.scss';
import Video from '../Video/Video';

const Sidebar = ({ currentVideoID, changeCurrentVideo, videos }) => {
  return (
    <section className="sidebar">
      <h2 className="sidebar__title">Next videos</h2>
      <ul className="sidebar__video-list">
        {videos
          .filter((video) => video.id !== currentVideoID)
          .map((video) => {
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
    </section>
  );
};

export default Sidebar;
