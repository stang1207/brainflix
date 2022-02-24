import { Component } from 'react';
import './App.scss';
import MainVideo from './components/MainVideo/MainVideo';
import Header from './components/Header/Header';
import VideoDescription from './components/VideoDescription/VideoDescription';
import VideoList from './components/VideoList/VideoList';
import FakeVideo from './data/video-details.json';

export default class App extends Component {
  state = {
    currentVideo: FakeVideo[0],
  };

  changeCurrentVideo = (id) => {
    this.setState({
      currentVideo: FakeVideo.find((video) => video.id === id),
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
            </div>
            <VideoList
              currentVideo={this.state.currentVideo}
              changeCurrentVideo={this.changeCurrentVideo}
            />
          </section>
        </main>
      </>
    );
  }
}
