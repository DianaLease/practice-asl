import React, { Component } from 'react';
import WebcamStream from './WebcamStream';
import CapturedImage from './CapturedImage';

class WebcamCapture extends Component {
  constructor(props) {
    super(props)

    this.state = {
      camSpecs: { audio: false, video: { width: 400, height: 300 } }
    }

    this.handleCaptureClick = this.handleCaptureClick.bind(this);
    this.captureImage = this.captureImage.bind(this);
    this.clearPhoto = this.clearPhoto.bind(this);

  }

  componentDidMount() {
    const camSpecs = this.state.camSpecs;
    const getUserMedia = (specs) => (
      new Promise((successCb, errorCb) => {
        navigator.getMedia = navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia ||
                             navigator.msGetUserMedia;
        navigator.getMedia.call(navigator, specs, successCb, errorCb);
      })
    );

    getUserMedia(camSpecs)
      .then((stream) => {

        const video = document.getElementById('webcam');
        console.log(video);
        const vendorURL = window.URL || window.webkitURL;

        video.src = vendorURL.createObjectURL(stream);
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });

    this.clearPhoto();
  }

  captureImage() {
    const canvas = document.getElementById('canvas'),
          context = canvas.getContext('2d'),
          video = document.getElementById('webcam'),
          photo = document.getElementById('photo'),
          { width, height } = this.state.camSpecs.video;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    const imgData = canvas.toDataURL('image/png');
    photo.setAttribute('src', imgData);
    console.log(imgData)
  }

  clearPhoto() {
    const canvas = document.getElementById('canvas'),
          photo = document.getElementById('photo'),
          context = canvas.getContext('2d'),
          { width, height } = this.state.camSpecs.video;

    context.fillStyle = '#FFF';
    context.fillRect(0, 0, width, height);

    const imgData = canvas.toDataURL('image/png');
    photo.setAttribute('src', imgData);
  }

  handleCaptureClick(event) {
    event.preventDefault();
    this.captureImage();
  }

  render() {
    return (
      <div className="capture" >
        <WebcamStream handleCaptureClick={this.handleCaptureClick} />
        <canvas id="canvas" hidden></canvas>
        <CapturedImage />
      </div>
    )
  }

}


export default WebcamCapture;
