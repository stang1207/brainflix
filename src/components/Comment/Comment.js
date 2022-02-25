import './Comment.scss';
import Avatar from '../Avatar/Avatar';
import DefaultCommentAvatar from '../../assets/images/user.png';
import relativeDate from 'relative-date-test';

const Comment = ({
  comment,
  name,
  timestamp,
  imgURL = DefaultCommentAvatar,
}) => {
  return (
    <li className="comment">
      {/* <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Smashicons - Flaticon</a> */}
      <Avatar className="comment__avatar" linkURL={imgURL} />
      <div className="comment__text-box">
        <p className="comment__author">{name}</p>
        <time className="comment__date">
          {relativeDate.getRelativeDate(timestamp)}
        </time>
        <p className="comment__text">{comment}</p>
      </div>
    </li>
  );
};

export default Comment;
