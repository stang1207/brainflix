import { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import MainVideo from '../../components/MainVideo/MainVideo';
import VideoDescription from '../../components/VideoDescription/VideoDescription';
import Sidebar from '../../components/Sidebar/Sidebar';
import CommentSection from '../../components/CommentSection/CommentSection';
import PageLoader from '../../components/PageLoader/PageLoader';
import './Home.scss';
import {
  getVideoList,
  getVideo,
  addComment,
  deleteComment,
  addLike,
} from '../../hooks/videoHooks';
import catchAsyncError from '../../utils/catchAsyncError';

export default class Home extends Component {
  state = {
    currentVideo: null,
    videos: [],
    isLoading: true,
  };
  componentDidMount() {
    this.initialFetch();
  }
  componentDidUpdate(prevProps) {
    this.fetchNewVideoRoute(prevProps);
  }

  initialFetch = async () => {
    const [videoList, videoListError] = await catchAsyncError(getVideoList());
    if (videoListError) return new Error(videoListError);
    if (this.props.match.params.videoId) {
      const [activeVideo, activeVideoError] = await catchAsyncError(
        getVideo(this.props.match.params.videoId)
      );
      if (activeVideoError) return new Error(activeVideoError);
      return this.setState({
        videos: videoList.data,
        currentVideo: activeVideo.data,
        isLoading: false,
      });
    }
    const [activeVideo, activeVideoError] = await catchAsyncError(
      getVideo(videoList.data[0].id)
    );

    if (activeVideoError) return new Error(activeVideoError);
    return this.setState({
      videos: videoList.data,
      currentVideo: activeVideo.data,
      isLoading: false,
    });
  };

  fetchNewVideoRoute = async (prevProps) => {
    if (this.props.match.params.videoId !== prevProps.match.params.videoId) {
      this.setState({ isLoading: true });
      const videoID = this.props.match.params.videoId
        ? this.props.match.params.videoId
        : this.state.videos[0].id;
      const [activeVideo, activeVideoError] = await catchAsyncError(
        getVideo(videoID)
      );
      if (activeVideoError) return Error(activeVideoError);
      this.setState({
        currentVideo: activeVideo.data,
        isLoading: false,
      });
    }
  };

  addActiveVideoComment = async (videoID, comment) => {
    const [activeVideo, activeVideoError] = await catchAsyncError(
      addComment(videoID, comment)
    );
    if (activeVideoError) return Error(activeVideoError);
    this.setState({
      currentVideo: activeVideo.data.data,
    });
  };

  deleteActiveVideoComment = async (videoID, commentID) => {
    const [activeVideo, activeVideoError] = await catchAsyncError(
      deleteComment(videoID, commentID)
    );
    if (activeVideoError) return Error(activeVideoError);
    this.setState({ currentVideo: activeVideo.data.data });
  };

  addLikeOnCurrentVideo = async (videoID) => {
    const [activeVideo, activeVideoError] = await catchAsyncError(
      addLike(videoID)
    );
    if (activeVideoError) return Error(activeVideoError);
    this.setState({ currentVideo: activeVideo.data });
  };

  render() {
    //If there is no data, then show the loading
    return this.state.isLoading && !this.state.redirect ? (
      <PageLoader />
    ) : (
      <>
        <Helmet>
          <title>Brainflix - {this.state.currentVideo.title}</title>
        </Helmet>
        <main className="main">
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
      </>
    );
  }
}
