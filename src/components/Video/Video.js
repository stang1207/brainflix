import './Video.scss';
import Avatar from '../../assets/images/Mohan-muruge.jpg';

const Video = ({ video, imgUrl = Avatar, changeCurrentVideo }) => {
  return (
    <li className="video" onClick={() => changeCurrentVideo(video.id)}>
      <img src={imgUrl} alt="" className="video__thumbnail" />
      <div className="video__text-box">
        <p className="video__title">{video.title}</p>
        <p className="video__author">{video.channel}</p>
      </div>
    </li>
  );
};

export default Video;