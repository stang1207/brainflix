import './Button.scss';
const Button = ({ formId, children }) => {
  return (
    <button className="btn" form={formId}>
      {children}
    </button>
  );
};

export default Button;
