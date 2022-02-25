import './Avatar.scss';

const Avatar = ({ linkURL, alt = 'Default alt', className }) => {
  return <img className={`avatar ${className}`} alt={alt} src={linkURL} />;
};

export default Avatar;
