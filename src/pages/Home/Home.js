import { Component } from 'react';
import Box from '../../components/Box/Box';
import MainVideo from '../../components/MainVideo/MainVideo';
import Container from '../../components/Container/Container';
import VideoDescription from '../../components/VideoDescription/VideoDescription';
import CommentSection from '../../components/CommentSection/CommentSection';
import Sidebar from '../../components/Sidebar/Sidebar';

import FakeVideosDetails from '../../data/video-details.json';
import FakeVideoList from '../../data/videos.json';
import './Home.scss';

export default class Home extends Component {
  state = {
    currentVideo: FakeVideosDetails[0],
    videos: FakeVideoList,
  };
  changeCurrentVideo = (id) => {
    this.setState({
      currentVideo: FakeVideosDetails.find((video) => video.id === id),
    });
  };
  render() {
    return (
      <Box element="main" className="main">
        <MainVideo currentVideo={this.state.currentVideo} />
        <Container element="section" className="content">
          <Box element="div" className="content__left">
            <VideoDescription currentVideo={this.state.currentVideo} />
            <CommentSection
              currentVideoComments={this.state.currentVideo.comments}
            />
          </Box>
          <Sidebar
            videos={this.state.videos
              .filter((video) => video.id !== this.state.currentVideo.id)
              .map((video) => {
                return video;
              })}
            currentVideoID={this.state.currentVideo.id}
            changeCurrentVideo={this.changeCurrentVideo}
          />
        </Container>
      </Box>
    );
  }
}
