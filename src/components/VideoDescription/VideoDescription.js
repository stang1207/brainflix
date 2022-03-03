import { Component } from 'react';
import relativeDate from 'relative-date-test';

import LikeIcon from '../../assets/icons/likes.svg';
import ViewIcon from '../../assets/icons/views.svg';
import './VideoDescription.scss';

export default class VideoDescription extends Component {
  state = {
    showText: false,
  };
  changeShowText(prevState) {
    this.setState({ showText: !prevState });
  }

  render() {
    const trimmedText =
      this.props.currentVideo &&
      this.props.currentVideo.description.slice(0, 200) + '...';
    return (
      <section className="description">
        <h2 className="description__title">
          {this.props.currentVideo && this.props.currentVideo.title}
        </h2>
        <ul className="description__details">
          <li className="description__channel">
            By {this.props.currentVideo && this.props.currentVideo.channel}
          </li>
          <li className="description__views">
            <img
              src={ViewIcon}
              className="description__icon"
              alt="views icon"
            ></img>
            <span>
              {this.props.currentVideo && this.props.currentVideo.views}
            </span>
          </li>
          <li className="description__date">
            {relativeDate.mdy(
              this.props.currentVideo && this.props.currentVideo.timestamp
            )}
          </li>
          <li className="description__likes">
            <img
              src={LikeIcon}
              className="description__icon"
              alt="likes icon"
            ></img>
            <span>
              {this.props.currentVideo && this.props.currentVideo.likes}
            </span>
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
