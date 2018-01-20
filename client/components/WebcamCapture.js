import React, { Component } from 'react';

class WebcamCapture extends Component {
  constructor(props) {
    super(props)

    this.state = {
      camSpecs: { audio: false, video: { width: 400, height: 300 } }
    }

    this.handleStartClick = this.handleStartClick.bind(this);
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
        const video = document.querySelector('webcam');
        const vendorURL = window.URL || window.webkitURL;

        video.src = vendorURL.createObjectURL(stream);
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });

    this.clearPhoto();
  }

  takePicture() {
    const canvas = document.querySelector('canvas'),
          context = canvas.getContext('2d'),
          video = document.querySelector('video'),
          photo = document.getElementById('photo'),
          { width, height } = this.state.camSpecs.video;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    const imgData = canvas.toDataURL('image/png');
    photo.setAttribute('src', imgData);
  }

  clearPhoto() {
    const canvas = document.querySelector('canvas'),
          photo = document.getElementById('photo'),
          context = canvas.getContext('2d'),
          { width, height } = this.state.camSpecs.video;

    context.fillStyle = '#FFF';
    context.fillRect(0, 0, width, height);

    const imgData = canvas.toDataURL('image/png');
    photo.setAttribute('src', imgData);
  }

  handleStartClick(event) {
    event.preventDefault();
    this.captureImage();
  }

}


export default WebcamCapture;
