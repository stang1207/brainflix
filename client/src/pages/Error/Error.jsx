import './Error.scss';
import ErrorImage from '../../assets/images/error.png';
import { Link } from 'react-router-dom';

const Error = ({ error }) => {
  const { statusCode, errorMessage } = error;
  return (
    <main className="error">
      <img src={ErrorImage} alt="Found an error" className="error__img" />
      <div className="error__textbox">
        <p className="error__message">
          <span className="error__code">Error {statusCode}</span>
          {errorMessage}
        </p>
        <Link to="/" className="error__redirect" alt="redirect to homepage">
          Back to the homepage
        </Link>
      </div>
    </main>
  );
};
export default Error;
