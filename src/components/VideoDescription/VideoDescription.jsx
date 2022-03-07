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
  };
  changeShowText(prevState) {
    this.setState({ showText: !prevState });
  }
  render() {
    const trimmedText =
      this.props.currentVideo.description.slice(0, 200) + '...';
    return (
      <section className="description">
        <h2 className="description__title">{this.props.currentVideo.title}</h2>
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
            <span>{this.props.currentVideo.views}</span>
          </li>
          <li className="description__date">
            {mdy(this.props.currentVideo.timestamp)}
          </li>
          <li className="description__likes">
            <img
              src={LikeIcon}
              className="description__icon"
              alt="likes icon"
            ></img>
            <span>{this.props.currentVideo.likes}</span>
          </li>
        </ul>
        <p className="description__text">
          {this.state.showText
            ? this.props.currentVideo.description
            : trimmedText}
        </p>
        <span
          onClick={() => this.changeShowText(this.state.showText)}
          className="description__show-btn"
        >
          {this.state.showText ? 'Show less' : 'Show more'}
        </span>
      </section>
    );
  }
}
