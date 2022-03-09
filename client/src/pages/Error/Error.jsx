import './Error.scss';
import ErrorImage from '../../assets/images/error.png';

const Error = ({ error }) => {
  const { statusCode, errorMessage } = error;
  return (
    <main className="error">
      <img src={ErrorImage} alt="Found an error" className="error__img" />
      <div className="error__text">
        <h1 className="error__message">
          <span className="error__code">Error {statusCode}</span>
          {errorMessage}
        </h1>
      </div>
    </main>
  );
};
export default Error;
