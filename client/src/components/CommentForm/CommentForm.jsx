import CommentIcon from '../../assets/icons/add_comment.svg';
import Button from '../Button/Button';
import { Component } from 'react';
import './CommentForm.scss';

export default class CommentForm extends Component {
  state = {
    commentInput: '',
    commentInputError: false,
  };
  formSubmitEvent = (e) => {
    e.preventDefault();
    if (!this.state.commentInput.trim()) {
      return this.setState({ commentInputError: true });
    }
    this.props.addActiveVideoComment(
      this.props.currentVideoID,
      this.state.commentInput
    );
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
      <form className="comments-form" onSubmit={this.formSubmitEvent}>
        <div className="comments-form__input-group">
          <label
            htmlFor="comments-form__input"
            className="comments-form__label"
          >
            Join the Conversation
          </label>
          <textarea
            placeholder="Add a new comment"
            className={`comments-form__input ${
              this.state.commentInputError ? 'comments-form__input--error' : ''
            }`}
            name="comment"
            id="comments-form__input"
            onChange={this.handleInputChange}
            value={this.state.commentInput}
          />
        </div>
        <Button
          className="comments-form__btn"
          img={CommentIcon}
          imgAlt="Submit comment icon"
          text="Comment"
        ></Button>
      </form>
    );
  }
}
