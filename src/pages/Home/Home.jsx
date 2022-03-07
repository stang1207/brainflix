import { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import videoAPI from '../../apis/video';
import MainVideo from '../../components/MainVideo/MainVideo';
import VideoDescription from '../../components/VideoDescription/VideoDescription';
import Sidebar from '../../components/Sidebar/Sidebar';
import CommentSection from '../../components/CommentSection/CommentSection';
import PageLoader from '../../components/PageLoader/PageLoader';
import './Home.scss';

export default class Home extends Component {
  state = {
    currentVideo: null,
    videos: [],
    isLoading: true,
  };
  componentDidMount() {
    this.fetchDefaultVideos();
  }
  componentDidUpdate(prevProps) {
    this.fetchNewActiveVideo(prevProps);
  }
  fetchDefaultVideos = async () => {
    try {
      //Fetch sidebar video list when app starts running
      const { data } = await videoAPI.get('/videos');
      //If there is an id already in the url, fetch that as the active video
      if (this.props.match.params.videoId) {
        const { data: currentVideoData } = await videoAPI.get(
          `/videos/${this.props.match.params.videoId}`
        );
        return this.setState({
          videos: data,
          currentVideo: currentVideoData,
          isLoading: false,
        });
      }
      //Otherwise set the first video of the sidebar videos as default active video
      const { data: currentVideoData } = await videoAPI.get(
        `/videos/${data[0].id}`
      );
      this.setState({
        videos: data,
        currentVideo: currentVideoData,
        isLoading: false,
      });
    } catch (err) {
      return new Error(err.message);
    }
  };
  fetchNewActiveVideo = async (prevProps) => {
    try {
      //If the current url and prev url are not the same, use the new url and fetch the new active video
      if (this.props.match.params.videoId !== prevProps.match.params.videoId) {
        this.setState({ isLoading: true });
        const { data } = await videoAPI.get(
          `/videos/${
            this.props.match.params.videoId
              ? this.props.match.params.videoId
              : this.state.videos[0].id
          }`
        );
        this.setState({
          currentVideo: data,
          isLoading: false,
        });
      }
    } catch (err) {
      return new Error(err.message);
    }
  };
  addActiveVideoComment = async (id, comment) => {
    //Add a new comment for current active video
    await videoAPI.post(`/videos/${id}/comments`, {
      name: 'BrainStation Test',
      comment: comment,
    });
    const { data } = await videoAPI.get(`/videos/${id}`);
    this.setState({ currentVideo: data });
  };
  deleteActiveVideoComment = async (videoID, commentID) => {
    //delete current selected comment
    await videoAPI.delete(`/videos/${videoID}/comments/${commentID}`);
    const { data } = await videoAPI.get(`/videos/${videoID}`);
    this.setState({ currentVideo: data });
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
              <VideoDescription currentVideo={this.state.currentVideo} />
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
