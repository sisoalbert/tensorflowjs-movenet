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
  model.classify(event.target).then(function (predictions) {
    console.log('Predictions: ');
    console.log(predictions);
  });
}