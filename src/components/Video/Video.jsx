import './Video.scss';
import { Link } from 'react-router-dom';

const Video = ({ video }) => {
  return (
    <li className="video">
      <Link to={`/videos/${video.id}`} className="video__link">
        <img src={video.image} alt={video.title} className="video__thumbnail" />
        <div className="video__text-box">
          <p className="video__title">{video.title}</p>
          <p className="video__author">{video.channel}</p>
        </div>
      </Link>
    </li>
  );
};

export default Video;
