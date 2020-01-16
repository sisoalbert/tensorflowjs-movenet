mobilenet.load().then(function (model) {
  // Classify the image.
  model.classify(img).then(function (predictions) {
    console.log('Predictions: ');
    console.log(predictions);
  });
});
