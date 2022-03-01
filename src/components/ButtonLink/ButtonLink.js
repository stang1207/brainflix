import { Link } from 'react-router-dom';
import './ButtonLink.scss';

const ButtonLink = ({ to, className, img, imgAlt, text }) => {
  return (
    <Link to={to} className={className}>
      {img && <img src={img} alt={imgAlt} className={'link-btn__img'} />}
      {text && <span className={'link-btn__text'}>{text}</span>}
    </Link>
  );
};

export default ButtonLink;
