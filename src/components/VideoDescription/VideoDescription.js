import './VideoDescription.scss';
import LikeIcon from '../../assets/icons/likes.svg';
import ViewIcon from '../../assets/icons/views.svg';

const VideoDescription = () => {
  return (
    <section className="description">
      <h2 className="description__title">BMX Rampage: 2021 Highlights</h2>
      <ul className="description__details">
        <li className="description__channel">By Red Crow</li>
        <li className="description__views">
          <img
            src={ViewIcon}
            className="description__icon"
            alt="views icon"
          ></img>
          <span>1,001,023</span>
        </li>
        <li className="description__date">15/01/2022</li>
        <li className="description__likes">
          <img
            src={LikeIcon}
            className="description__icon"
            alt="likes icon"
          ></img>
          <span>110,985</span>
        </li>
      </ul>
      <p className="description__text">
        On a gusty day in Southern Utah, a group of 25 daring mountain bikers
        blew the doors off what is possible on two wheels, unleashing some of
        the biggest moments the sport has ever seen. While mother nature only
        allowed for one full run before the conditions made it impossible to
        ride, that was all that was needed for event veteran Kyle Strait, who
        won the event for the second time -- eight years after his first Red Cow
        Rampage title
      </p>
    </section>
  );
};

export default VideoDescription;
