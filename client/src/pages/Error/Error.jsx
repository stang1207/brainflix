import './Error.scss';
import ErrorImage from '../../assets/images/error.png';
import Button from '../../components/Button/Button';
import { Helmet } from 'react-helmet-async';

const Error = ({ error }) => {
  const { statusCode, errorMessage } = error;
  return (
    <>
      <Helmet>
        <title>Brainflix - Error {statusCode.toString()} </title>
      </Helmet>
      <main className="error">
        <img src={ErrorImage} alt="Found an error" className="error__img" />
        <div className="error__textbox">
          <p className="error__code">Error {statusCode}</p>
          <p className="error__message">{errorMessage}</p>
          <Button
            isLink
            to="/"
            alt="Homepage link"
            className="error__redirect"
            text="Back to the homepage"
          />
        </div>
      </main>
    </>
  );
};
export default Error;
