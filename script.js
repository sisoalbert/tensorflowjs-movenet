/********************************************************************
// Demo created by Jason Mayes 2020.
// Got questions? Reach out to me on social:
// Twitter: @jason_mayes
// LinkedIn: https://www.linkedin.com/in/creativetech
********************************************************************/

const video = document.getElementById('webcam');
const webcamPredictions = document.getElementById('webcamPredictions');

var modelHasLoaded = false;
var model = undefined;

// Before we can use COCO-SSD we must wait for it to finish loading. 
// Machine Learning models can be large and take a moment to get 
// everything they need to run.
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  modelHasLoaded = true;
});


/********************************************************************
// Demo 1: Grab a bunch of images from the page and classify them
// upon click.
********************************************************************/

// In this demo, we have put all our clickable images in divs with the 
// CSS class 'classifyOnClick'. Lets get all the elements that have
// this class.
const imageContainers = document.getElementsByClassName('classifyOnClick');

// Now let's go through all of these and add a click event listener.
for (let i = 0; i < imageContainers.length; i++) {
  // Add event listener to the child element whichis the img element.
  imageContainers[i].children[0].addEventListener('click', handleClick);
}

// When an image is clicked, let's classify it and display results!
function handleClick(event) {
  if (!modelHasLoaded) {
    return;
  }
  
  // We can call model.classify as many times as we like with
  // different image data each time. This returns a promise
  // which we wait to complete and then call a function to
  // print out the results of the prediction.
  model.detect(event.target).then(function (predictions) {
    // Lets write the predictions to a new paragraph element and
    // add it to the DOM.
    const p = document.createElement('p');
    p.innerText = 'We think this is a: ' + predictions[0].class 
        + ' - with ' + Math.round(parseFloat(predictions[0].score) * 100) 
        + '% confidence.';

    const highlighter = document.createElement('div');
    highlighter.setAttribute('class', 'highlighter');
    highlighter.style = 'left: ' + predictions[0].bbox[0] + 'px; top: '
        + predictions[0].bbox[1] + 'px; width: ' 
        + predictions[0].bbox[2] + 'px; height: '
        + predictions[0].bbox[3] + 'px;';

    event.target.parentNode.appendChild(highlighter);
    event.target.parentNode.appendChild(p);
  });
}



/********************************************************************
// Demo 2: Continuously grab image from webcam stream and classify it.
// Note: You must access the demo on https for this to work:
// https://tensorflow-js-image-classification.glitch.me/
********************************************************************/

// Check if webcam access is supported.
function hasGetUserMedia() {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}


function predictWebcam() {
  // Now let's start classifying the stream.
  model.detect(video).then(function (predictions) {
    if(predictions.length > 0) {
      webcamPredictions.innerText = 'We think this is a: ' + predictions[0].class 
          + ' - with ' + Math.round(parseFloat(predictions[0].score) * 100) 
          + '% confidence.';
    }
    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(predictWebcam);
  });
}


// Enable the live webcam view and start classification.
function enableCam(event) {
  if (!modelHasLoaded) {
    return;
  }
  
  // Hide the button.
  event.target.classList.add('removed');  
  
  // getUsermedia parameters.
  const constraints = {
    video: true
  };

  // Activate the webcam stream.
  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    video.srcObject = stream;
    video.addEventListener('loadeddata', predictWebcam);
  });
}


// If webcam supported, add event listener to button for when user
// wants to activate it.
if (hasGetUserMedia()) {
  const enableWebcamButton = document.getElementById('webcamButton');
  enableWebcamButton.addEventListener('click', enableCam);
} else {
  console.warn('getUserMedia() is not supported by your browser');
}