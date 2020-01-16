# Classifying images using a pre trained MobileNet in TensorFlow.js

## Difficulty: Easy

Please note: This demo loads an easy to use JavaScript class made by the TensorFlow.js team to do the hardwork for you so no machine learning knowledge is needed to use it.

If you were looking to learn how to load in a TensorFlow.js saved model directly yourself then please see our tutorial on loading TensorFlow.js models. 

If you want to train a system to recognize your own objects, using your own data, then check out our tutorials on "transfer learning".

## What can this demo do?

This demo shows how we can use a pre made machine learning solution to recognize objects in images (aka a binary image classifier) on any image you wish to present to it. To do this we are using a model known as MobileNet, to [recognize 1000 common objects](https://github.com/tensorflow/tfjs-models/blob/master/mobilenet/src/imagenet_classes.ts) it has already been taught to find from the [ImageNet data set](http://image-net.org/).

If what you want to recognize is in that list of things it knows about (for example a cat, dog, etc), this may be useful to you as is in your own projects, or just to experiment with Machine Learning in the browser and get familiar with the possibilties of machine learning.

## What's in all the files?

### ← index.html

We simply have a script tag in our HTML to grab the latest version of TensorFlow.js and the MobileNet class that can take image data as input and output predictions for what it sees in that image data.

In this case we simply reference the following to bring in TensorFlow.js:

```HTML
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js" type="text/javascript"></script>
```

However, if you want to pull in a particular version of TensorFlow.js you can do so like this:

```HTML
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.4.0/dist/tf.min.js" type="text/javascript"></script>
```

Finally you will see that we pull in the MobileNet class we later use in script.js like this:

```HTML
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@1.0.0"></script>
```

### ← style.css

Nothing to see here. Just styles to make the demo look prettier. You can use or ignore these as you please.

### ← script.js

This file shows the demo code you need to write in JavaScript to interact with the MobileNet class we imported in the HTML. This is where the magic happens. We can pass data to the class and then retrive predictions on what it thinks it saw in the image which we can then use to make a decision. The file is well commented so do read the comments to learn more.

---
