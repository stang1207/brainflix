import { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import catchAsyncError from '../../utils/catchAsyncError';
import { addVideo } from '../../hooks/videoHooks';
import Button from '../../components/Button/Button';
import PublishImage from '../../assets/icons/publish.svg';
import UploadPreview from '../../assets/images/upload-preview.jpg';
import './Upload.scss';

export default class Upload extends Component {
  state = {
    videoTitleInput: '',
    videoDescriptionInput: '',
    errors: [],
    redirectObj: {
      shouldRedirect: false,
      to: '/',
    },
  };
  onInputChange = (e) => {
    //If the input has an error class, then remove it
    if (this.state.errors.includes(e.target.name)) {
      this.setState({
        errors: this.state.errors.filter((error) => error !== e.target.name),
      });
    }
    //Set current e.target.value as the state
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onFormSubmit = async (e) => {
    e.preventDefault();
    const { videoTitleInput, videoDescriptionInput } = this.state;
    const newErrorList = [];
    //If input field is empty, add it to the errors array state, and use that state to manipulate the border color
    if (!videoTitleInput.trim()) {
      newErrorList.push('videoTitleInput');
    }
    if (!videoDescriptionInput.trim()) {
      newErrorList.push('videoDescriptionInput');
    }
    if (!videoDescriptionInput.trim() || !videoTitleInput.trim()) {
      return this.setState({
        errors: newErrorList,
      });
    }
    const [activeVideo, activeVideoError] = await catchAsyncError(
      addVideo(this.state.videoTitleInput, this.state.videoDescriptionInput)
    );
    if (activeVideoError) return Error(activeVideoError);
    this.setState({
      redirectObj: {
        shouldRedirect: true,
        to: activeVideo.data.id,
      },
    });
  };
  render() {
    return (
      <>
        <Helmet>
          <title>Brainflix - Upload</title>
        </Helmet>
        {/* if this form is subbmitted redirect to homepage */}
        {this.state.redirectObj.shouldRedirect && (
          <Redirect to={`/videos/${this.state.redirectObj.to}`} />
        )}

        <main className="upload">
          <h1 className="upload__heading">Upload Video</h1>
          <form
            className="upload__form"
            id="uploadForm"
            onSubmit={this.onFormSubmit}
            ref={this.formRef}
          >
            <div className="upload__input-group upload__input-group--thumbnail">
              <label htmlFor="inputThumbnail" className="upload__label">
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
                <label htmlFor="videoTitleInput" className="upload__label">
                  Title Your Video
                </label>
                <input
                  id="videoTitleInput"
                  name="videoTitleInput"
                  placeholder="Add a title to your video"
                  type="text"
                  className={`${
                    this.state.errors.includes('videoTitleInput')
                      ? 'upload__input--error'
                      : ''
                  } upload__input upload__input--title`}
                  value={this.state.videoTitleInput}
                  onChange={this.onInputChange}
                />
              </div>
              <div className="upload__input-group upload__input-group--description">
                <label
                  className="upload__label"
                  htmlFor="videoDescriptionInput"
                >
                  Add a video description
                </label>
                <textarea
                  id="videoDescriptionInput"
                  name="videoDescriptionInput"
                  placeholder="Add a description to your video"
                  className={`upload__input upload__input--description ${
                    this.state.errors.includes('videoDescriptionInput')
                      ? 'upload__input--error'
                      : ''
                  }`}
                  value={this.state.videoDescriptionInput}
                  onChange={this.onInputChange}
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
  }
}
