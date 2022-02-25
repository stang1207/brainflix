import './Button.scss';
const Button = ({ className, img, imgAlt, text }) => {
  return (
    <button className={`btn ${className}`}>
      {img && <img src={img} alt={imgAlt} className={'btn__img'} />}
      {text && <span className={'btn__text'}>{text}</span>}
    </button>
  );
};

export default Button;
