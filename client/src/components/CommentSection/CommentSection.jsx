import React, { Component } from 'react';
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import Comment from '../Comment/Comment';
import DefaultAvatar from '../../assets/images/Mohan-muruge.jpg';
import CommentIcon from '../../assets/icons/add_comment.svg';
import './CommentSection.scss';

export default class CommentSection extends Component {
  state = {
    commentInput: '',
    commentInputError: false,
  };
  formSubmitEvent = (e) => {
    e.preventDefault();
    if (!this.state.commentInput.trim()) {
      return this.setState({ commentInputError: true });
    }
    //If the form has valid values in it, then submit the form and call the axio post method and append the new comment
    this.props.addActiveVideoComment(
      this.props.currentVideoID,
      this.state.commentInput
    );
    //Return to default state
    this.setState({ commentInput: '' });
  };
  handleInputChange = (e) => {
    // Clear the previous error when user starts typing
    if (this.state.commentInputError) {
      this.setState({ commentInputError: false });
    }
    this.setState({
      commentInput: e.target.value,
    });
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
                className={`comments__input ${
                  this.state.commentInputError ? 'comments__input--error' : ''
                }`}
                name="comment"
                id="comments__input"
                onChange={this.handleInputChange}
                value={this.state.commentInput}
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
        {this.props.currentVideoComments.length > 0 ? (
          <ul className="comments__list">
            {this.props.currentVideoComments &&
              this.props.currentVideoComments.map((comment, i) => {
                return (
                  <Comment
                    key={i}
                    deleteActiveVideoComment={
                      this.props.deleteActiveVideoComment
                    }
                    currentVideoID={this.props.currentVideoID}
                    commentID={comment.id}
                    comment={comment.comment}
                    name={comment.name}
                    timestamp={comment.timestamp}
                  />
                );
              })}
          </ul>
        ) : (
          <p className="comments__no-comment">
            This video has no comments yet!
          </p>
        )}
      </section>
    );
  }
}
