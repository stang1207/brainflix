import { Component } from 'react';
import { mdy } from '../../utils/date';
import LikeIcon from '../../assets/icons/likes.svg';
import ViewIcon from '../../assets/icons/views.svg';
import './VideoDescription.scss';

/**
 * Video Description component
 * @prop   {object} video  - An object that contains all the information about the current active video, including title, image, description, channel, likes...
 * @callback ReferenceStateSetter - A function that the change the state of showText and allows more text to be displayed when clicking the show btn
 * @param {ReferenceState} showText - A boolean that determined if the text length of the video description should be reduced and hide some of it
 * @return  {HTMLElement}  - An li element with image, video title and channel details...
 */

export default class VideoDescription extends Component {
  state = {
    showText: false,
    isVideoLiked: false,
    likedVideoListID: [],
  };

  componentDidMount = () => {
    //Fetch liked videolist ids from localstorage
    const likedVideos = JSON.parse(localStorage.getItem('likedVideoIds')) || [];
    const foundLikedVideo = likedVideos.find(
      (id) => id === this.props.currentVideo.id
    );
    //If current video id is included in the liked list, change the state and styles to disable pressing the like button functionality
    if (foundLikedVideo)
      this.setState({ likedVideoListID: likedVideos, isVideoLiked: true });
  };

  likeButtonClicked = async (id) => {
    if (!this.state.isVideoLiked) {
      //Update the json file
      await this.props.addLikeOnCurrentVideo(id);
      //Previous Items
      const previousIDs =
        JSON.parse(localStorage.getItem('likedVideoIds')) || [];
      //Put the id into localstorage
      localStorage.setItem(
        'likedVideoIds',
        JSON.stringify([...previousIDs, id])
      );
      //Set state to true and change styles
      this.setState({
        isVideoLiked: true,
      });
    }
  };

  changeShowText(prevState) {
    // If button is clicked, either trim the texts to a certain length, or show all the texts
    this.setState({ showText: !prevState });
  }

  render() {
    //Either show texts with a length of 200 or show all the texts
    const trimmedText =
      this.props.currentVideo.description.length <= 200
        ? this.props.currentVideo.description
        : this.props.currentVideo.description.slice(0, 200) + '...';

    return (
      <section className="description">
        <h1 className="description__title">{this.props.currentVideo.title}</h1>
        <ul className="description__details">
          <li className="description__channel">
            By {this.props.currentVideo.channel}
          </li>
          <li className="description__views">
            <img
              src={ViewIcon}
              className="description__icon"
              alt="views icon"
            ></img>
            <span>{this.props.currentVideo.views.toLocaleString('en-US')}</span>
          </li>
          <li className="description__date">
            {mdy(this.props.currentVideo.timestamp)}
          </li>
          <li
            className={`description__likes ${
              this.state.isVideoLiked ? 'description__likes--liked' : ''
            }`}
            onClick={() => this.likeButtonClicked(this.props.currentVideo.id)}
          >
            <img
              src={LikeIcon}
              className="description__icon"
              alt="likes icon"
            ></img>
            <span>{this.props.currentVideo.likes.toLocaleString('en-US')}</span>
          </li>
        </ul>
        <p className="description__text">
          {this.state.showText
            ? this.props.currentVideo.description
            : trimmedText}
        </p>
        {this.props.currentVideo.description.length <= 200 ? (
          ''
        ) : (
          <span
            onClick={() => this.changeShowText(this.state.showText)}
            className="description__show-btn"
          >
            {this.state.showText ? 'Show less' : 'Show more'}{' '}
          </span>
        )}
      </section>
    );
  }
}
