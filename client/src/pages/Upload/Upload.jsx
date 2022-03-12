import { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '../../components/Button/Button';
import { addVideo } from '../../apis/videos';
import catchAsyncError from '../../utils/catchAsyncError';
import UploadImage from '../../assets/images/default-upload.jpeg';
import PublishImage from '../../assets/icons/publish.svg';
import './Upload.scss';

export default class Upload extends Component {
  state = {
    videoTitleInput: '',
    videoDescriptionInput: '',
    errors: [],
    imageFile: null,
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

  onImageChange = (e) => {
    const reader = new FileReader();
    //If there is change on the file input, set the state to that image
    reader.onload = (e) => {
      this.setState({ imageFile: e.target.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  onFormSubmit = async (e) => {
    e.preventDefault();
    const { videoTitleInput, videoDescriptionInput } = this.state;
    const newErrorList = [];
    //If one of the input fields is empty, add it to the errors array state, and use that state to manipulate the border color
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
    //If the form data passed the validation, add it to the data file and redirect to that video page
    const [newVideoError, newVideo] = await catchAsyncError(
      addVideo(
        this.state.videoTitleInput,
        this.state.videoDescriptionInput,
        this.state.imageFile
      )
    );
    if (newVideoError) return newVideoError;
    this.setState({
      redirectObj: {
        shouldRedirect: true,
        to: newVideo.data.id,
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
              <label
                htmlFor="inputThumbnail"
                className="upload__label upload__label--thumbnail"
              >
                <span>Video Thumbnail</span>
                <img
                  src={
                    this.state.imageFile ? this.state.imageFile : UploadImage
                  }
                  alt="Click me to upload thumbnail"
                  className="upload__input--preview"
                />
              </label>
              <input
                type="file"
                name="upload__input--thumbnail"
                id="inputThumbnail"
                className="upload__input--thumbnail"
                onChange={this.onImageChange}
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
