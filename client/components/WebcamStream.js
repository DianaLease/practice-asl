import React from 'react';

const WebcamStream = (props) => (
  <div className="webcam">
    <video id="webcam"></video>
    <button id="captureButton" onClick={props.handleCaptureClick}>Capture and Submit</button>
  </div>
);

export default WebcamStream;
