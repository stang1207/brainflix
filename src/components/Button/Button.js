import './Button.scss';
const Button = ({ formId, className, children }) => {
  return (
    <button className={`btn ${className}`} form={formId}>
      {children}
    </button>
  );
};

export default Button;
