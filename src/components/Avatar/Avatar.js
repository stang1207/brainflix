import DefaultAvatar from '../../assets/images/Mohan-muruge.jpg';
import './Avatar.scss';

const Avatar = ({
  linkURL = DefaultAvatar,
  alt = 'Default alt',
  className,
}) => {
  return <img className={`avatar ${className}`} alt={alt} src={linkURL} />;
};

export default Avatar;
