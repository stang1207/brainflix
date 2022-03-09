import CommentForm from '../CommentForm/CommentForm';
import Avatar from '../Avatar/Avatar';
import Comment from '../Comment/Comment';
import DefaultAvatar from '../../assets/images/Mohan-muruge.jpg';
import './CommentSection.scss';

const CommentSection = ({
  currentVideoComments,
  deleteActiveVideoComment,
  addActiveVideoComment,
  currentVideoID,
}) => {
  return (
    <section className="comments">
      <h3 className="comments__number">
        {currentVideoComments.length} Comments
      </h3>
      <div className="comments__container">
        <Avatar
          src={DefaultAvatar}
          imgAlt="user avatar"
          className="comments__avatar"
        />
        <CommentForm
          addActiveVideoComment={addActiveVideoComment}
          currentVideoID={currentVideoID}
        />
      </div>
      {currentVideoComments.length > 0 ? (
        <ul className="comments__list">
          {currentVideoComments &&
            currentVideoComments.map((comment, i) => {
              return (
                <Comment
                  key={i}
                  deleteActiveVideoComment={deleteActiveVideoComment}
                  currentVideoID={currentVideoID}
                  commentID={comment.id}
                  comment={comment.comment}
                  name={comment.name}
                  timestamp={comment.timestamp}
                />
              );
            })}
        </ul>
      ) : (
        <p className="comments__no-comment">This video has no comments yet!</p>
      )}
    </section>
  );
};
export default CommentSection;
