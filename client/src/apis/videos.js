import axios from 'axios';

//Fetch current active video
const getVideo = async (videoID) => {
  const res = await axios.get(`/videos/${videoID}`);
  return res.data;
};

//Fetch videolist
const getVideoList = async () => {
  const { data } = await axios.get('/videos');
  return data;
};

//Add a new video
const addVideo = async (videoTitle, videoDescription, videoImage) => {
  const { data } = await axios.post('/videos', {
    videoTitle,
    videoDescription,
    videoImage,
  });
  return data;
};

// Add a like on the current active video
const addLike = async (videoID) => {
  const { data } = await axios.put(`/videos/${videoID}`);
  return data;
};

// Add a new video comment
const addComment = async (videoID, comment) => {
  const data = await axios.post(`/videos/${videoID}/comments`, {
    comment,
  });
  return data;
};

// Delete a video comment
const deleteComment = async (videoID, commentID) => {
  const data = await axios.delete(`/videos/${videoID}/comments/${commentID}`);
  return data;
};

export { getVideo, getVideoList, addVideo, addLike, addComment, deleteComment };
