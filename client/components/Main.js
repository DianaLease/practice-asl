import React, { Component } from 'react';
import WebcamCapture from './WebcamCapture';
import WebcamStream from './WebcamStream';

export default class Main extends Component {

  render() {
    return (
      <div>
        <h1 id="title">Welcome to the ASL Practice App!</h1>
        <h3>For the most accurate experience, sign against a solid white background.</h3>
        <WebcamCapture />
      </div>
    )
  }
}
