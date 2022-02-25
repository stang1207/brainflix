import './Container.scss';
const Container = ({ element, className, children }) => {
  const CustomTag = `${element}`;
  return (
    <CustomTag className={className ? `${className} container` : 'container'}>
      {children}
    </CustomTag>
  );
};

export default Container;
