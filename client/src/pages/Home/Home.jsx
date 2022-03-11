import { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import Error from '../Error/Error';
import MainVideo from '../../components/MainVideo/MainVideo';
import VideoDescription from '../../components/VideoDescription/VideoDescription';
import Sidebar from '../../components/Sidebar/Sidebar';
import CommentSection from '../../components/CommentSection/CommentSection';
import PageLoader from '../../components/PageLoader/PageLoader';
import {
  getVideoList,
  getVideo,
  addComment,
  deleteComment,
  addLike,
} from '../../apis/videos';
import catchAsyncError from '../../utils/catchAsyncError';
import './Home.scss';

export default class Home extends Component {
  state = {
    currentVideo: null,
    videos: [],
    isLoading: true,
    hasError: false,
    error: null,
  };

  componentDidMount() {
    this.initialFetch();
  }

  componentDidUpdate(prevProps) {
    this.fetchNewVideoRoute(prevProps);
  }

  initialFetch = async () => {
    const [videoListError, videoList] = await catchAsyncError(getVideoList());
    if (videoListError) return console.log(videoListError);

    //If there is an id in the url,fetch that video
    if (this.props.match.params.videoId) {
      let [activeVideoError, activeVideo] = await catchAsyncError(
        getVideo(this.props.match.params.videoId)
      );
      return this.setState({
        videos: videoList.data,
        currentVideo: activeVideo?.data,
        isLoading: false,
        hasError: activeVideoError ? true : false,
        error: activeVideoError ? activeVideoError : '',
      });
    }
    //Else fetch the first video of the video array as default
    const [activeVideoError, activeVideo] = await catchAsyncError(
      getVideo(videoList.data[0].id)
    );
    return this.setState({
      videos: videoList.data,
      currentVideo: activeVideo.data,
      isLoading: false,
      hasError: activeVideoError ? true : false,
      error: activeVideoError ? activeVideoError : '',
    });
  };

  fetchNewVideoRoute = async (prevProps) => {
    if (this.props.match.params.videoId !== prevProps.match.params.videoId) {
      this.setState({ isLoading: true, hasError: false });
      //Set either the video id in the url or the first video or the video array as default
      const videoID = this.props.match.params.videoId
        ? this.props.match.params.videoId
        : this.state.videos[0].id;
      const [activeVideoError, activeVideo] = await catchAsyncError(
        getVideo(videoID)
      );
      this.setState({
        currentVideo: activeVideo?.data,
        isLoading: false,
        hasError: activeVideoError ? true : false,
        error: activeVideoError,
      });
    }
  };

  addActiveVideoComment = async (videoID, comment) => {
    const [activeVideoError, activeVideo] = await catchAsyncError(
      addComment(videoID, comment)
    );
    if (activeVideoError) return console.error(activeVideoError);
    this.setState({
      currentVideo: activeVideo.data.data,
    });
  };

  deleteActiveVideoComment = async (videoID, commentID) => {
    const [activeVideoError, activeVideo] = await catchAsyncError(
      deleteComment(videoID, commentID)
    );
    if (activeVideoError) return console.error(activeVideoError);
    this.setState({ currentVideo: activeVideo.data.data });
  };

  addLikeOnCurrentVideo = async (videoID) => {
    //Optimistic UI Updates
    const prevStr = this.state.currentVideo.likes;
    const updatedVideo = {
      ...this.state.currentVideo,
      likes: this.state.currentVideo.likes + 1,
    };
    this.setState({ currentVideo: updatedVideo });
    //If there is an error, reinstate to previous video states
    const [activeVideoError] = await catchAsyncError(addLike(videoID));
    if (activeVideoError) {
      return this.setState({
        currentVideo: { ...this.state.currentVideo, likes: prevStr },
      });
    }
  };

  render() {
    //If there is no data, then show loading screen
    return this.state.isLoading ? (
      <PageLoader />
    ) : (
      <>
        {/* If it is not loading and there is an error loading video show error page, then show the homepage*/}
        {!this.state.hasError ? (
          <main className="main">
            <Helmet>
              <title>Brainflix - {this.state.currentVideo.title}</title>
            </Helmet>
            <MainVideo currentVideo={this.state.currentVideo} />
            <section className="content">
              <div className="content__left">
                <VideoDescription
                  currentVideo={this.state.currentVideo}
                  addLikeOnCurrentVideo={this.addLikeOnCurrentVideo}
                />
                <CommentSection
                  currentVideoComments={this.state.currentVideo.comments}
                  currentVideoID={this.state.currentVideo.id}
                  addActiveVideoComment={this.addActiveVideoComment}
                  deleteActiveVideoComment={this.deleteActiveVideoComment}
                />
              </div>
              <Sidebar
                videos={this.state.videos
                  .filter((video) => video.id !== this.state.currentVideo.id)
                  .map((video) => {
                    return video;
                  })}
                currentVideoID={this.state.currentVideo.id}
              />
            </section>
          </main>
        ) : (
          <Error error={this.state.error} />
        )}
      </>
    );
  }
}
