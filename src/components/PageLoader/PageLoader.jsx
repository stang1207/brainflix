import './PageLoader.scss';

/**
 * Page Loading component
 * @return  {HTMLElement}  - a div that displays a loading spinner with some css animations
 */
const Loader = () => {
  return (
    <div className="loader">
      <span className="loader__spinner">Loading...</span>
    </div>
  );
};

export default Loader;
