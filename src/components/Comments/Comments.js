import './Comments.scss';
import Avatar from '../Avatar/Avatar';
import CommentIcon from '../../assets/icons/add_comment.svg';
import Button from '../Button/Button';
import Comment from '../Comment/Comment';

const Comments = ({ currentVideoComments }) => {
  return (
    <section className="comments">
      <h3 className="comments__number">
        {currentVideoComments.length} Comments
      </h3>
      <div className="comments__box">
        <Avatar className="comments__avatar" />
        <form className="comments__form">
          <div className="comments__input-group">
            <label htmlFor="comments__input" className="comments__label">
              Join the Conversation
            </label>
            <input
              placeholder="Add a new comment..."
              className="comments__input"
              id="comments__input"
            ></input>
          </div>
          <Button className="comments__btn">
            <img src={CommentIcon} alt="comment icon" />
            <span>Comment</span>
          </Button>
        </form>
      </div>
      <ul className="comments__list">
        {currentVideoComments &&
          currentVideoComments.map((comment, i) => {
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
};

export default Comments;
