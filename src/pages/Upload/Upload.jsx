import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '../../components/Button/Button';
import PublishImage from '../../assets/icons/publish.svg';
import UploadPreview from '../../assets/images/upload-preview.jpg';
import './Upload.scss';

const Upload = ({ history }) => {
  const onFormSubmit = (e) => {
    e.preventDefault();
    alert('Video has been submitted!');
    history.push('/');
  };

  return (
    <>
      <Helmet>
        <title>Brainflix - Upload</title>
      </Helmet>
      <main className="upload">
        <h1 className="upload__heading">Upload Video</h1>
        <form className="upload__form" id="uploadForm" onSubmit={onFormSubmit}>
          <div className="upload__input-group upload__input-group--thumbnail">
            <label htmlFor="" className="upload__label">
              Video Thumbnail
            </label>
            <img
              src={UploadPreview}
              alt="Click me to upload video thumbnail"
              className="upload__input--thumbnail"
            />
          </div>
          <section className="upload__details">
            <div className="upload__input-group upload__input-group--title">
              <label htmlFor="" className="upload__label">
                Title Your Video
              </label>
              <input
                name="video-title"
                type="text"
                className="upload__input upload__input--title"
                placeholder="Add a title to your video"
              />
            </div>
            <div className="upload__input-group upload__input-group--description">
              <label htmlFor="upload__description" className="upload__label">
                Add a video description
              </label>
              <textarea
                name="video-description"
                className="upload__input upload__input--description"
                placeholder="Add a description to your video"
              ></textarea>
            </div>
          </section>
        </form>
        <div className="upload__btns">
          <Link to="/" className="upload__cancel">
            Cancel
          </Link>
          <Button
            className="upload__publish"
            text="Publish"
            img={PublishImage}
            imgAlt={'Publish icon'}
            form="uploadForm"
          />
        </div>
      </main>
    </>
  );
};

export default Upload;
