import VideoAPI from '../apis/video';

//Fetch current active video
const getVideo = async (videoID) => {
  const { data } = await VideoAPI.get(`/${videoID}`);
  return await data;
};

//Fetch videolist
const getVideoList = async () => {
  const { data } = await VideoAPI.get('/');
  return await data;
};

//Add a new video
const addVideo = async (videoTitle, videoDescription) => {
  const { data } = await VideoAPI.post('/', {
    videoTitle,
    videoDescription,
  });
  return await data;
};

// Add a new video comment
const addVideoComment = async (videoID, comment) => {
  const { data } = await VideoAPI.post(`/${videoID}/comments`, {
    comment,
  });
  return await data;
};

// Delete a video comment
const deleteVideoComment = async (videoID, commentID) => {
  const { data } = await VideoAPI.delete(`/${videoID}/comments/${commentID}`);
  return await data;
};

// Add a like on the current active video
const addLike = async (videoID) => {
  const { data } = await VideoAPI.put(`/${videoID}`);
  return await data;
};

export {
  getVideoList,
  getVideo,
  addVideo,
  addVideoComment,
  addLike,
  deleteVideoComment,
};
