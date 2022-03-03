import { Component } from 'react';
import Box from '../../components/Box/Box';
import MainVideo from '../../components/MainVideo/MainVideo';
import Container from '../../components/Container/Container';
import VideoDescription from '../../components/VideoDescription/VideoDescription';
import CommentSection from '../../components/CommentSection/CommentSection';
import Sidebar from '../../components/Sidebar/Sidebar';
import video from '../../apis/video';
import './Home.scss';

export default class Home extends Component {
  state = {
    videos: [],
    currentVideo: null,
  };

  async componentDidMount() {
    const { data } = await video.get('/videos');
    this.setState({ videos: data });
    const currentVideoData = await video.get(
      `/videos/${this.state.videos[0].id}`
    );
    this.setState({ currentVideo: currentVideoData.data });
  }

  changeCurrentVideo = async (id) => {
    const { data } = await video.get(`/videos/${id}`);
    this.setState({
      currentVideo: this.state.videos.find((video) => video.id === id),
    });
  };

  render() {
    return (
      <Box element="main" className="main">
        <MainVideo
          currentVideo={this.state.currentVideo && this.state.currentVideo}
        />
        <Container element="section" className="content">
          <Box element="div" className="content__left">
            <VideoDescription
              currentVideo={this.state.currentVideo && this.state.currentVideo}
            />
            <CommentSection
              currentVideoComments={
                this.state.currentVideo && this.state.currentVideo.comments
              }
            />
          </Box>
          <Sidebar
            videos={
              this.state.videos &&
              this.state.videos
                .filter((video) => video.id !== this.state.currentVideo.id)
                .map((video) => {
                  return video;
                })
            }
            currentVideoID={
              this.state.currentVideo && this.state.currentVideo.id
            }
            changeCurrentVideo={this.changeCurrentVideo}
          />
        </Container>
      </Box>
    );
  }
}
