// (function () {
//   const video = document.getElementById('webcam'),
//     canvas = document.getElementById('canvas'),
//     context = canvas.getContext('2d'),
//     photo = document.getElementById('photo'),
//     vendorUrl = window.URL || window.webkitURL;

//   navigator.getMedia = navigator.getUserMedia ||
//     navigator.webkitGetUserMedia ||
//     navigator.mozGetUserMedia ||
//     navigator.msGetUserMedia;

//   console.log('hello');

//   navigator.getMedia({
//     video: true,
//     audio: false
//   },
//     function(stream) {
//       video.src = vendorUrl.createObjectURL(stream);
//       video.play();
//     },
//     function (err) {

//     });

//   document.getElementById('capture').addEventListener('click', function () {
//     context.drawImage(video, 0, 0, 400, 300);
//     photo.setAttribute('src', canvas.toDataURL('image/png'));
//   })
// })();
