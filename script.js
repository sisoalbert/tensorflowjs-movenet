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



model.classify(img).then(function (predictions) {
  console.log('Predictions: ');
  console.log(predictions);
});