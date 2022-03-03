import './Avatar.scss';

const Avatar = ({ src, alt = 'user default alt', className }) => {
  return <img className={`avatar ${className}`} alt={alt} src={src} />;
};

export default Avatar;
