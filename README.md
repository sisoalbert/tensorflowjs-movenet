# Classifying images using a pre trained MobileNet in TensorFlow.js

Difficulty: Easy

Please note: This loads a nice easy to use JavaScript class made by the TensorFlow.js team to do the hardwork for you. No machine learning knowledge is needed.

If you were looking to learn how to load in a TensorFlow.js model directly yourself then please see our tutorial on loading TensorFlow.js models. If you want to train a system to recognize your own objects, using your own data, then check out our tutorials on "transfer learning".

## What is this?

This page shows how we can use a pre made machine learning solution to recognize objects in images on any image you wish to present to it. To do this we are using a model known as MobileNet, to recognize 1000 common objects it has already been taught from the ImageNet data set.

If what you want to recognize is in that list of things it knows about, this may be useful to you as is, or just to experiment with Machine Learning in the browser and get familiar with ML.

## Your Project

### ← index.html

We simply have a script tag in our HTML to grab the latest version of TensorFlow.js

In this case we simply reference the following:

```HTML
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js" type="text/javascript"></script>
```

However, if you want to pull in a particular version of TensorFlow.js you can do so like this:

```HTML
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.4.0/dist/tf.min.js" type="text/javascript"></script>
```

### ← script.js

This simply grabs a reference to a paragraph in the DOM and then prints out the TensorFlow.js version number to it once loaded.

---
