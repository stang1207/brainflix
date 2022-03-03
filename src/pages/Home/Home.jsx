import { Component } from 'react';
import './Home.scss';
import { Helmet } from 'react-helmet-async';

import MainVideo from '../../components/MainVideo/MainVideo';
import VideoDescription from '../../components/VideoDescription/VideoDescription';
import Sidebar from '../../components/Sidebar/Sidebar';
import CommentSection from '../../components/CommentSection/CommentSection';
import videoAPI from '../../apis/video';
import PageLoader from '../../components/PageLoader/PageLoader';

export default class Home extends Component {
  state = {
    currentVideo: null,
    videos: [],
    isLoading: true,
  };
  async componentDidMount() {
    try {
      //Fetch sidebar videos and default active video
      const { data } = await videoAPI.get('/videos');
      const { data: currentVideoData } = await videoAPI.get(
        `/videos/${data[0].id}`
      );
      //Set currentActiveVideo, and videolist
      this.setState({
        videos: data,
        currentVideo: currentVideoData,
        isLoading: false,
      });
    } catch (err) {
      return new Error(err);
    }
  }

  async componentDidUpdate(prevProps) {
    try {
      if (this.props.match.params.videoId !== prevProps.match.params.videoId) {
        this.setState({ isLoading: true });
        //Fetch Either VideoID from URL or First video from the videolist fetched earlier (the default video)
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
      return new Error(err);
    }
  }

  render() {
    return this.state.isLoading ? (
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
