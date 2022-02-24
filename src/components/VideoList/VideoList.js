import './VideoList.scss';
import Video from '../Video/Video';
import FakeVideos from '../../data/videos.json';

const VideoList = ({ currentVideo, changeCurrentVideo }) => {
  return (
    <section className="sidebar">
      <h2 className="sidebar__title">Next videos</h2>
      <ul className="video-list">
        {FakeVideos.map((video) => {
          if (video.id !== currentVideo.id)
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
