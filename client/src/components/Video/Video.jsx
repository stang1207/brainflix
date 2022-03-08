import './Video.scss';
import { Link } from 'react-router-dom';

/**
 * Sidebar video component
 * @prop   {object} video  - an object that includes a video id, title, channel, and image src
 * @return  {HTMLElement}  - an li element with image, video title and channel details
 */

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
