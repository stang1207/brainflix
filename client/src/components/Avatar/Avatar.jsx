import './Avatar.scss';

/**
 * Avatar component
 * @prop   {string} src  - The source of avatar image
 * @prop   {string} alt  - Alternative description
 * @prop   {string} className  - Custom css classname
 * @return  {HTMLElement}  - an avatar image
 */

const Avatar = ({ src, alt = 'user default alt', className }) => {
  return <img className={`avatar ${className}`} alt={alt} src={src} />;
};

export default Avatar;
