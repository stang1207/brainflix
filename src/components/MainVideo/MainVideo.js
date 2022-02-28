import React, { Component } from 'react';
import Box from '../Box/Box';
import './MainVideo.scss';

export default class MainVideo extends Component {
  // videoRef = React.createRef();
  render() {
    return (
      <Box element="section" className="main-video">
        <Box element="div" className="main-video__content">
          <video
            controls
            preload="metadata"
            poster={this.props.currentVideo.image}
            className="main-video__player"
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            ref={this.videoRef}
          ></video>
          {/* Custom player controls for next week */}
          {/* <div className="main-video__controls">
            <button className="main-video__play" onClick={this.handleClick}>
              <img src=""></img>
            </button>
            <input type="range" className="main-video__progress"/>
            <div className="main-video__options">
              <button className="main-video__full-screen">full</button>
              <range className="main-video__volume">volume</range>
            </div>
          </div> */}
        </Box>
      </Box>
    );
  }
}
