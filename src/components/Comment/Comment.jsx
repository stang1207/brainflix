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
  //This is for fixing incorrect datetime attribute for the time element;
  const time = new Date(timestamp);
  let formattedDateForAttribute =
    time.getFullYear() +
    '-' +
    String(time.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(time.getDate()).padStart(2, '0');
  return (
    <li className="comment">
      {/* <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Smashicons - Flaticon</a> */}
      <Avatar className="comment__avatar" src={imgURL} />
      <div className="comment__text-box">
        <p className="comment__author">{name}</p>
        <time className="comment__date" dateTime={formattedDateForAttribute}>
          {relativeDate.getRelativeDate(timestamp)}
        </time>
        <p className="comment__text">{comment}</p>
      </div>
    </li>
  );
};

export default Comment;
