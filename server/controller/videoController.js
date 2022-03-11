const uuid = require('uuid');
const { asyncWrapper } = require('../utils/asyncErrorCatcher');
const { readFile, saveData } = require('../utils/modifyFile');
const videoFilePath = require('path').join(__dirname, '../data/videos.json');

//Get - retrieve a video
const getVideo = asyncWrapper(async (req, res, next) => {
  const { videoID } = req.params;
  const videoList = await readFile(videoFilePath);
  const foundVideo = videoList.find((video) => video.id === videoID);
  if (!foundVideo) {
    return next({
      errorMessage: `This is not the page you're looking.`,
      statusCode: 404,
    });
  }
  foundVideo.views += 1;
  await saveData(videoFilePath, videoList);
  return res.status(200).json({ data: foundVideo });
});

//Get - retrieve a list of videos
const getVideoList = asyncWrapper(async (req, res, next) => {
  const videoList = await readFile(videoFilePath);
  const filteredVideos = videoList.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    };
  });
  return res.status(200).json({ data: filteredVideos });
});

//Post - add a new video
const addNewVideo = asyncWrapper(async (req, res, next) => {
  const videoList = await readFile(videoFilePath);
  const { videoTitle, videoDescription, videoImage } = req.body;
  if (!videoTitle || !videoDescription) {
    return next({
      errorMessage:
        'Forbidden error - Please fill out all the required fields.',
      statusCode: 403,
    });
  }
  const newVideo = {
    id: uuid.v4(),
    title: videoTitle,
    channel: 'Test Channel',
    image: videoImage
      ? videoImage
      : 'http://localhost:8000/images/default-video.jpg',
    description: videoDescription,
    views: 0,
    likes: 0,
    duration: '3:30',
    video: 'https://project-2-api.herokuapp.com/stream?api_key=lab',
    timestamp: new Date().getTime(),
    comments: [],
  };
  videoList.push(newVideo);
  await saveData(videoFilePath, videoList);
  return res
    .status(200)
    .json({ data: newVideo, message: 'Your video has been added.' });
});

//Post - add a new video comment
const addVideoComment = asyncWrapper(async (req, res, next) => {
  const { videoID } = req.params;
  const videoList = await readFile(videoFilePath);
  const foundVideo = videoList.find((video) => video.id === videoID);
  if (!foundVideo) {
    return next({
      errorMessage: `Can't find the video that you're looking.`,
      statusCode: 404,
    });
  }
  const { comment } = req.body;
  if (!comment) {
    return next({
      errorMessage: 'Comment field is not filled',
      statusCode: 400,
    });
  }
  const newComment = {
    id: uuid.v4(),
    name: 'Default Name',
    comment: comment,
    likes: 0,
    timestamp: new Date().getTime(),
  };
  foundVideo.comments.push(newComment);
  await saveData(videoFilePath, videoList);
  return res.status(200).json({
    data: foundVideo,
    message: 'Comment has been added to the video.',
  });
});

//Delete - delete a video comment
const deleteVideoComment = asyncWrapper(async (req, res, next) => {
  const { videoID, commentID } = req.params;
  const videoList = await readFile(videoFilePath);
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
  await saveData(videoFilePath, videoList);
  return res.status(200).json({
    data: foundVideo,
    message: 'The comment has been removed!',
  });
});

//Put - increase the like counter num
const addVideoLike = asyncWrapper(async (req, res, next) => {
  const { videoID } = req.params;
  const videoList = await readFile(videoFilePath);
  const foundVideo = videoList.find((video) => video.id === videoID);
  if (!foundVideo) {
    return next({
      errorMessage: `Can't find the video.`,
      statusCode: 404,
    });
  }
  foundVideo.likes += 1;
  await saveData(videoFilePath, videoList);
  return res.status(200).json({ data: foundVideo });
});

module.exports = {
  getVideo,
  getVideoList,
  addVideoComment,
  addNewVideo,
  addVideoLike,
  deleteVideoComment,
};
