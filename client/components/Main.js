import React, { Component } from 'react';
import WebcamCapture from './WebcamCapture';
import WebcamStream from './WebcamStream';

export default class Main extends Component {

  render() {
    return (
      <div>
        <WebcamCapture />
      </div>
    )
  }
}
