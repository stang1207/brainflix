import React, { Component } from 'react';

import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import Comment from '../Comment/Comment';

import './CommentSection.scss';
import DefaultAvatar from '../../assets/images/Mohan-muruge.jpg';
import CommentIcon from '../../assets/icons/add_comment.svg';

export default class CommentSection extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      commentInput: '',
    };
  }
  formSubmitEvent = (e) => {
    e.preventDefault();
    if (!this.state.commentInput.trim()) {
      this.setState({ commentInput: '' });
      this.inputRef.current.classList.remove('comments__input--success');
      return this.inputRef.current.classList.add('comments__input--error');
    }
    //Return to default state
    this.setState({ commentInput: '' });
    this.inputRef.current.classList.remove('comments__input--success');
    this.inputRef.current.classList.remove('comments__input--error');
  };
  handleInputChange = (e) => {
    this.setState({
      commentInput: e.target.value,
    });
    if (e.target.value) {
      e.target.classList.add('comments__input--success');
    }
    if (!e.target.value) {
      e.target.classList.remove('comments__input--success');
      e.target.classList.remove('comments__input--error');
    }
  };

  render() {
    return (
      <section className="comments">
        <h3 className="comments__number">
          {this.props.currentVideoComments.length} Comments
        </h3>
        <div className="comments__container">
          <Avatar
            src={DefaultAvatar}
            imgAlt="user avatar"
            className="comments__avatar"
          />
          <form className="comments__form" onSubmit={this.formSubmitEvent}>
            <div className="comments__input-group">
              <label htmlFor="comments__input" className="comments__label">
                Join the Conversation
              </label>
              <textarea
                placeholder="Add a new comment"
                className="comments__input"
                id="comments__input"
                name="comment"
                onChange={this.handleInputChange}
                value={this.state.commentInput}
                ref={this.inputRef}
              />
            </div>
            <Button
              className="comments__btn"
              img={CommentIcon}
              imgAlt="Submit comment icon"
              text="Comment"
            ></Button>
          </form>
        </div>
        <ul className="comments__list">
          {this.props.currentVideoComments &&
            this.props.currentVideoComments.map((comment, i) => {
              return (
                <Comment
                  key={i}
                  comment={comment.comment}
                  name={comment.name}
                  timestamp={comment.timestamp}
                />
              );
            })}
        </ul>
      </section>
    );
  }
}
