import axios from 'axios';

//Fetch current active video
const getVideo = async (videoID) => {
  const { data } = await axios
    .get(`/videos/${videoID}`)
    .catch((err) => Error(err));
  return data;
};

//Fetch videolist
const getVideoList = async () => {
  const { data } = await axios.get('/videos').catch((err) => Error(err));
  return data;
};

//Add a new video
const addVideo = async (videoTitle, videoDescription) => {
  const { data } = await axios
    .post('/videos', {
      videoTitle,
      videoDescription,
    })
    .catch((err) => Error(data));
  return data;
};

// Add a like on the current active video
const addLike = async (videoID) => {
  const { data } = await axios
    .put(`/videos/${videoID}`)
    .catch((err) => Error(err));
  return data;
};

// Add a new video comment
const addComment = async (videoID, comment) => {
  const data = await axios
    .post(`/videos/${videoID}/comments`, {
      comment,
    })
    .catch((err) => Error(err));
  return data;
};

// Delete a video comment
const deleteComment = async (videoID, commentID) => {
  const data = await axios
    .delete(`/videos/${videoID}/comments/${commentID}`)
    .catch((err) => Error(err));
  return data;
};

export { getVideo, getVideoList, addVideo, addLike, addComment, deleteComment };
