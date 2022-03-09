const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const fsPromises = require('fs/promises');
const path = require('path');
const jsonPath = path.join(__dirname, '../data/videos.json');

//Get - retrieve video details
router.get('/:videoID', async (req, res, next) => {
  const { videoID } = req.params;
  const data = await fsPromises.readFile(jsonPath);
  const videoList = JSON.parse(data);
  const foundVideo = videoList.find((video) => video.id === videoID);
  if (!foundVideo) {
    return next({
      errorMessage: `Can't find the video.`,
      statusCode: 404,
    });
  }
  return res.status(200).json({ data: foundVideo });
});

//Get - retrieve a list of videos
router.get('/', async (req, res, next) => {
  let data = await fsPromises.readFile(jsonPath);
  const videoList = JSON.parse(data);
  const filteredVideos = videoList.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    };
  });
  return res.json({ data: filteredVideos });
});

//Post - add a new comment of the active video
router.post('/:videoID/comments', async (req, res, next) => {
  const { videoID } = req.params;
  const { comment } = req.body;
  const data = await fsPromises.readFile(jsonPath);
  const videoList = JSON.parse(data);
  const foundVideo = videoList.find((video) => video.id === videoID);
  if (!foundVideo) {
    return next({
      errorMessage: `Can't find the video.`,
      statusCode: 404,
    });
  }
  if (!comment) {
    return next({
      errorMessage: 'Comment field is not filled',
      statusCode: 400,
    });
  }
  const newComment = {
    id: uuid.v4(),
    name: 'BrainStation Test',
    comment: comment,
    likes: (0).toLocaleString('en-US'),
    timestamp: new Date().getTime(),
  };
  foundVideo.comments.push(newComment);
  await fsPromises.writeFile(jsonPath, JSON.stringify(videoList));
  return res.status(200).json({
    data: foundVideo,
    message: 'Comment has been added to the video.',
  });
});

//Post - add a new video to the videolist
router.post('/', async (req, res, next) => {
  const data = await fsPromises.readFile(jsonPath);
  const videoList = JSON.parse(data);
  const { videoTitle, videoDescription } = req.body;
  if (!videoTitle || !videoDescription) {
    return next({
      errorMessage: 'The required fields are not filled',
      statusCode: 400,
    });
  }
  const newVideo = {
    id: uuid.v4(),
    title: videoTitle,
    channel: 'BrainStation Test',
    image: 'http://localhost:8000/images/default-video.jpg',
    description: videoDescription,
    views: (0).toLocaleString('en-US'),
    likes: (0).toLocaleString('en-US'),
    duration: '2:39',
    video: 'https://project-2-api.herokuapp.com/stream?api_key=lab',
    timestamp: new Date().getTime(),
    comments: [],
  };
  videoList.push(newVideo);
  await fsPromises.writeFile(jsonPath, JSON.stringify(videoList));
  return res
    .status(200)
    .json({ data: newVideo, message: 'Your video has been added.' });
});

//Delete - delete a comment of the active video
router.delete('/:videoID/comments/:commentID', async (req, res, next) => {
  const { videoID, commentID } = req.params;
  const data = await fsPromises.readFile(jsonPath);
  const videoList = JSON.parse(data);

  const foundVideo = videoList.find((video) => video.id === videoID);
  if (!foundVideo) {
    return next({
      errorMessage: `Can't find the video.`,
      statusCode: 404,
    });
  }
  const foundComment = foundVideo.comments.find(
    (comment) => comment.id === commentID
  );
  if (!foundComment) {
    return next({
      errorMessage: `Can't find the comment.`,
      statusCode: 404,
    });
  }
  foundVideo.comments = foundVideo.comments.filter(
    (comment) => comment.id !== commentID
  );
  await fsPromises.writeFile(jsonPath, JSON.stringify(videoList));
  return res.status(200).json({
    data: foundVideo,
    message: 'The comment has been removed!',
  });
});

//Put - add a like to the current video
router.put('/:videoID', async (req, res, next) => {
  const { videoID } = req.params;
  const data = await fsPromises.readFile(jsonPath);
  const videoList = JSON.parse(data);
  const foundVideo = videoList.find((video) => video.id === videoID);
  if (!foundVideo) {
    return next({
      errorMessage: `Can't find the video.`,
      statusCode: 404,
    });
  }
  const newLikeNumber = parseInt(foundVideo.likes.replace(/,/gi, ''));
  foundVideo.likes = (newLikeNumber + 1).toLocaleString('en-US');
  await fsPromises.writeFile(jsonPath, JSON.stringify(videoList));
  return res.status(200).json({ data: foundVideo });
});

router.use((err, req, res, next) => {
  const { errorMessage, statusCode } = err;
  return res
    .status(statusCode)
    .json({ message: `Error ${statusCode} - ${errorMessage}` });
});

module.exports = router;
