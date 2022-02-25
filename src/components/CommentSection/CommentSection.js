import React, { Component } from 'react';
import './CommentSection.scss';
import Avatar from '../Avatar/Avatar';
import CommentIcon from '../../assets/icons/add_comment.svg';
import Button from '../Button/Button';
import Comment from '../Comment/Comment';

export default class CommentSection extends Component {
  state = {
    input: '',
  };
  formSubmitEvent(e) {
    e.preventDefault();
    if (!e.target.comment.value)
      return e.target.comment.classList.add('comments__input--error');
    e.target.comment.value = '';
    e.target.comment.classList.remove('comments__input--success');
    e.target.comment.classList.remove('comments__input--error');
  }
  formInputChange(e) {
    if (e.target.value) e.target.classList.add('comments__input--success');
    if (!e.target.value) {
      e.target.classList.remove('comments__input--error');
      e.target.classList.remove('comments__input--success');
    }
    this.setState({
      input: e.target.value,
    });
  }

  render() {
    return (
      <section className="comments">
        <h3 className="comments__number">
          {this.props.currentVideoComments.length} Comments
        </h3>

        <div className="comments__container">
          <Avatar className="comments__avatar" />
          <form className="comments__form" onSubmit={this.formSubmitEvent}>
            <div className="comments__input-group">
              <label htmlFor="comments__input" className="comments__label">
                Join the Conversation
              </label>
              <textarea
                placeholder="Add a new comment..."
                className={'comments__input'}
                name="comment"
                onChange={(e) => this.formInputChange(e)}
              ></textarea>
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
