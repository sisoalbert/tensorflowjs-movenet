/********************************************************************
// Demo created by Jason Mayes 2020.
// Got questions? Reach out to me on social:
// Twitter: @jason_mayes
// LinkedIn: https://www.linkedin.com/in/creativetech
********************************************************************/

var modelHasLoaded = false;
var model = undefined;

// Before we can use MobileNet we must wait for it to finish loading. 
// Machine Learning models can be large and take a moment to get 
// everything they need to run.
mobilenet.load().then(function (loadedModel) {
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
  model.classify(event.target).then(function (predictions) {
    // Lets write the predictions to a new paragraph element and
    // add it to the DOM.
    const p = document.createElement('p');
    p.innerText = 'We think this is a: ' + predictions[0].className 
        + ' - with ' + Math.round(parseFloat(predictions[0].probability) * 100) 
        + '% confidence.';

    event.target.parentNode.appendChild(p);
  });
}



/********************************************************************
// Demo 2: Continuously grab image from webcam stream and classify it.
// Note:  YOU 
********************************************************************/

// Check if webcam access is supported.
function hasGetUserMedia() {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}

if (hasGetUserMedia()) {
  // Good to go!
} else {
  alert('getUserMedia() is not supported by your browser');
}