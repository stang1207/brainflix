import './Button.scss';
import { Link } from 'react-router-dom';
const Button = ({ className, img, imgAlt, text, isLink, to, form }) => {
  if (isLink)
    return (
      <Link to={to} className={`btn ${className}`}>
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
