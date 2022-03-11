import './Button.scss';
import { Link } from 'react-router-dom';

/**
 * Button component
 * @prop   {string} img  - The source of float left icon
 * @prop   {string} imgAlt  - Alternative description of the icon
 * @prop   {string} className  - Custom css classname
 * @prop   {boolean} isLink  - Boolean that determines if the button is a react router dom link or regular html button
 * @prop   {boolean} text  - The inner text content of the button or link
 * @prop   {string} to  - The target route if the link is clicked
 * @prop   {string} from  - Custom css classname
 * @return  {HTMLElement}  - An button or a link that takes you to another url
 */

const Button = ({ img, imgAlt, className, isLink, text, to, alt, form }) => {
  if (isLink)
    return (
      <Link to={to} className={`btn ${className}`} alt={alt}>
        {img && <img src={img} alt={imgAlt} className={'btn__img'} />}
        {text && <span className={'btn__text'}>{text}</span>}
      </Link>
    );
  return (
    <button className={`btn ${className}`} form={form}>
      {img && <img src={img} alt={imgAlt} className={'btn__img'} />}
      {text && <span className={'btn__text'}>{text}</span>}
    </button>
  );
};

export default Button;
