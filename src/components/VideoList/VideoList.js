import './VideoList.scss';
import Video from '../Video/Video';

const VideoList = ({ currentVideoID, changeCurrentVideo, videos }) => {
  return (
    <section className="sidebar">
      <h2 className="sidebar__title">Next videos</h2>
      <ul className="video-list">
        {videos.map((video) => {
          if (video.id !== currentVideoID)
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

export default VideoList;
