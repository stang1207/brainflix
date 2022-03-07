import './Comment.scss';
import Avatar from '../Avatar/Avatar';
import DefaultCommentAvatar from '../../assets/images/user.png';
import { getRelativeDate } from '../../utils/date';

/**
 * Comment component for displaying
 * @prop   {string} commentID  - The current comment id that is used for deleting the same comment
 * @prop   {string} currentVideoID  - The current active video id that is also used for deleting a specific comment
 * @prop   {string} comment  - A comment (string) that is left by a user about the video
 * @prop   {function} deleteActiveVideoComment  - a function that trigger axio delete method, which will deletes the current selected video comment
 * @prop   {number} timestamp  - The timestamp in which the current comment was first created
 * @prop   {string} name  - The name of the current comment author
 * @prop   {string} imgURL  - The current comment author's avatar
 * @return  {HTMLElement}  - An list item that includes a comment and some information about the person who posted the comment
 */

const Comment = (props) => {
  const {
    commentID,
    currentVideoID,
    comment,
    deleteActiveVideoComment,
    name,
    timestamp,
    imgURL = DefaultCommentAvatar,
  } = props;
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
      <Avatar
        className="comment__avatar"
        src={imgURL}
        alt="Default user avatar"
      />
      <div className="comment__text-box">
        <h4 className="comment__author">{name}</h4>
        <time className="comment__date" dateTime={formattedDateForAttribute}>
          {getRelativeDate(timestamp)}
        </time>
        <p className="comment__text">{comment}</p>
        <button
          className="comment__delete"
          onClick={() => deleteActiveVideoComment(currentVideoID, commentID)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Comment;
