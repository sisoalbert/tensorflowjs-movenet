/********************************************************************
// Created by Jason Mayes 2020.
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

// In this demo, we have tagged all our clickable images with the 
// CSS class 'classifyOnClick'. Lets get all the elements that have
// this class.
const images = document.getElementsByClassName('classifyOnClick');

// Now let's go through all of these found images and add a click
// event listener.
for (let i = 0; i < images.length; i++) {
  images[i].addEventListener('click', handleClick);
}

// When an image is clicked, let's classify it and display results!
function handleClick(event) {
  // We can call model.classify as many times as we like with
  // different image data each time. This returns a promise
  // which we wait to complete and then call a function to
  // print out the results of the prediction.
   model.classify(document.getElementsByTagName('img')[0]).then(function (predictions) {
      console.log(predictions);
    });
  
  const img = document.createElement('img');
  img.crossOrigin = 'Anonymous';
  img.src = event.target.getAttribute('src');
  
  img.addEventListener('load', function() {
    model.classify(img).then(function (predictions) {
      console.log(predictions);
    });
  });

}