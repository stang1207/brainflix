import { Component } from 'react';
import MainVideo from './components/MainVideo/MainVideo';
import Header from './components/Header/Header';
import VideoDescription from './components/VideoDescription/VideoDescription';
import Sidebar from './components/Sidebar/Sidebar';
import Comments from './components/Comments/Comments';

import FakeVideosDetails from './data/video-details.json';
import FakeVideoList from './data/videos.json';
import './App.scss';

export default class App extends Component {
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
      <>
        <Header />
        <main className="main">
          <MainVideo currentVideo={this.state.currentVideo} />
          <section className="content">
            <div className="content__left">
              <VideoDescription currentVideo={this.state.currentVideo} />
              <Comments
                currentVideoComments={this.state.currentVideo.comments}
              />
            </div>
            <Sidebar
              videos={this.state.videos}
              currentVideoID={this.state.currentVideo.id}
              changeCurrentVideo={this.changeCurrentVideo}
            />
          </section>
        </main>
      </>
    );
  }
}
