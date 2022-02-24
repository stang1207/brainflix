import DefaultAvatar from '../../assets/images/Mohan-muruge.jpg';
import './Avatar.scss';

const Avatar = ({ linkURL = DefaultAvatar }) => {
  return <img className="avatar " alt="avatar" src={linkURL} />;
};

export default Avatar;
