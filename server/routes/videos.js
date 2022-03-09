const express = require('express');
const router = express.Router();
const videoController = require('../controller/videoController');

//Get - retrieve video details
router.get('/:videoID', videoController.getVideo);

//Get - retrieve a list of videos
router.get('/', videoController.getVideoList);

//Post - add a new comment of the active video
router.post('/:videoID/comments', videoController.addVideoComment);

//Post - add a new video to the videolist
router.post('/', videoController.addNewVideo);

//Delete - delete a comment of the active video
router.delete(
  '/:videoID/comments/:commentID',
  videoController.deleteVideoComment
);

//Put - add a like to the current video
router.put('/:videoID', videoController.addVideoLike);

//Error route
router.use((err, req, res, next) => {
  const { errorMessage, statusCode } = err;
  return res.status(statusCode).json({ errorMessage, statusCode });
});

module.exports = router;
