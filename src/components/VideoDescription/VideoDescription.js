import './VideoDescription.scss';
import LikeIcon from '../../assets/icons/likes.svg';
import ViewIcon from '../../assets/icons/views.svg';
import { getRelativeDate } from '../../utils/date';

const VideoDescription = ({ currentVideo }) => {
  return (
    <section className="description">
      <h2 className="description__title">{currentVideo.title}</h2>
      <ul className="description__details">
        <li className="description__channel">By {currentVideo.channel}</li>
        <li className="description__views">
          <img
            src={ViewIcon}
            className="description__icon"
            alt="views icon"
          ></img>
          <span>{currentVideo.views}</span>
        </li>
        <li className="description__date">
          {getRelativeDate(+currentVideo.timestamp)}
        </li>
        <li className="description__likes">
          <img
            src={LikeIcon}
            className="description__icon"
            alt="likes icon"
          ></img>
          <span>{currentVideo.likes}</span>
        </li>
      </ul>
      <p className="description__text">{currentVideo.description}</p>
    </section>
  );
};

export default VideoDescription;
