import React, { Component } from 'react';
import WebcamStream from './WebcamStream';

class Practice extends Component {
  constructor(props) {
    super(props)

    this.state = {
      camSpecs: { audio: false, video: { width: 400, height: 300 } },
      bestMatch: null,
      randomLetter: ['A', 'C', 'V'][Math.floor(Math.random() * 3)]
    }

    this.handleCaptureClick = this.handleCaptureClick.bind(this);
    this.captureImage = this.captureImage.bind(this);
    this.clearPhoto = this.clearPhoto.bind(this);
    this.handleNewLetter = this.handleNewLetter.bind(this);

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

    const imgData = canvas.toDataURL('image/png')
    const rawImgData = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, '');
    photo.setAttribute('src', imgData);

    predict('aslalphabet', rawImgData)
      .then(bestMatch => this.setState({
        bestMatch
    }))
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
    setTimeout(this.captureImage, 3000);
  }

  handleNewLetter() {
    this.setState({ randomLetter: ['A', 'C', 'V'][Math.floor(Math.random() * 3)] });
  }

  render() {
    return (
      <div className="capture" >
        <h3>Sign the letter {this.state.randomLetter}.</h3>
        <p>For the most accurate experience, sign against a solid white background.</p>
        <WebcamStream handleCaptureClick={this.handleCaptureClick} />
        <canvas id="canvas" hidden></canvas>
        <div className="output">
          <img id="photo" alt="Your photo" width="200" />
        </div>
        <h2>Your sign best matches: {this.state.bestMatch}</h2>
        <button id="newLetter" onClick={this.handleNewLetter}>Get New Letter</button>
      </div>
    )
  }

}

// Predict Logic: Predicts the ASL sign of an image by passing in a url and the clarifai model
const clarifaiApp = require('../clarifaiApp')

function predict(model, imgUrl) {
  return clarifaiApp.models.predict(model, imgUrl)
    .then(res => {
      const bestMatch = res.rawData.outputs[0].data.concepts[0].name;
      return bestMatch
    })
}


export default Practice;
