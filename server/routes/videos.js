const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let videoList = require('../data/videos.json');

//Get - retrieve video details
router.get('/:videoID', (req, res, next) => {
  const { videoID } = req.params;
  const targetVideo = videoList.find((video) => video.id === videoID);
  if (!targetVideo)
    next({
      errorMessage: `This video id doesn't exist.`,
      statusCode: 404,
    });
  return res.json({ data: targetVideo });
});

//Get - retrieve a list of videos
router.get('/', (req, res, next) => {
  console.log(process.env.PORT);

  const filteredVideos = videoList.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    };
  });
  res.json({ data: filteredVideos });
});

//Post - add a new comment of the active video
router.post('/:videoID/comments', (req, res, next) => {
  const { videoID } = req.params;
  const targetVideo = videoList.find((video) => video.id === videoID);
  if (!targetVideo)
    next({
      errorMessage: `This video id doesn't exist.`,
      statusCode: 404,
    });
  const { comment } = req.body;
  if (!comment)
    next({
      errorMessage: 'Please fill out the comment field.',
      statusCode: 400,
    });
  const newComment = {
    id: uuid.v4(),
    name: 'BrainStation Test',
    comment: comment,
    likes: (0).toLocaleString('en-US'),
    timestamp: new Date().getTime(),
  };
  targetVideo.comments = [...targetVideo.comments, newComment];
  return res.json({ data: newComment });
});

//Post - add a new video to the videolist
router.post('/', (req, res, next) => {
  const { videoTitle, videoDescription } = req.body;
  if (!videoTitle || !videoDescription) {
    next({
      errorMessage:
        'Failed to add the new video, please make sure that all the required fields are filled',
      statusCode: 400,
    });
  }
  const newVideo = {
    id: uuid.v4(),
    title: videoTitle,
    channel: 'Test Channel',
    image: 'http://localhost:8000/images/default-video.jpg',
    description: videoDescription,
    views: (0).toLocaleString('en-US'),
    likes: (0).toLocaleString('en-US'),
    duration: '2:39',
    video: 'https://project-2-api.herokuapp.com/stream?api_key=lab',
    timestamp: new Date().getTime(),
    comments: [],
  };
  const newVideoList = [...videoList, newVideo];
  videoList = newVideoList;
  return res.json({ data: newVideo, message: 'new video has been added!' });
});

//Delete - delete a comment of the active video
router.delete('/:videoID/comments/:commentID', (req, res, next) => {
  const { videoID, commentID } = req.params;
  const targetVideo = videoList.find((video) => video.id === videoID);
  if (!targetVideo)
    next({
      errorMessage: `This video id doesn't exist.`,
      statusCode: 404,
    });
  const targetComment = targetVideo.comments.find(
    (comment) => comment.id === commentID
  );
  if (!targetComment)
    next({
      errorMessage: `This comment id doesn't exist.`,
      statusCode: 404,
    });

  const newCommentList = targetVideo.comments.filter((video) => {
    return video.id !== commentID;
  });
  targetVideo.comments = newCommentList;
  return res.json({ Message: 'The selected comment has been deleted!' });
});

//Put - add a like to the current video
router.put('/:videoID', (req, res, next) => {
  const { videoID } = req.params;
  const foundVideo = videoList.find((video) => video.id === videoID);
  if (!foundVideo)
    return next({
      errorMessage: `This video id doesn't exist.`,
      statusCode: 404,
    });
  const newLikeNumber = parseInt(foundVideo.likes.replace(/,/gi, ''));
  foundVideo.likes = (newLikeNumber + 1).toLocaleString('en-US');
  return res.json({ data: foundVideo, message: 'Like has been increased' });
});

router.use((err, req, res, next) => {
  const { errorMessage, statusCode } = err;
  return res.json({ Message: `Error ${statusCode} - ${errorMessage}` });
});

module.exports = router;
