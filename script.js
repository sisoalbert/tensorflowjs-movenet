//1. Loading the raw pre-trained model

const MODEL_PATH =
  "https://tfhub.dev/google/tfjs-model/movenet/singlepose/lightning/4";
const EXAMPLE_IMG = document.getElementById("exampleImg");
// Get the canvas element

let movenet = undefined;

async function loadAndRunModel() {
  movenet = await tf.loadGraphModel(MODEL_PATH, { fromTFHub: true });

  // 2. Test: Before we use the model on real images that require processing, it is a good practice to use a dummy tensor with the required input shape to check whether the model is working correctly in your code. In this particular example, we create a tensor filled with zeros by using ‘tf.zeros’.
  let exampleInputTensor = tf.zeros([1, 192, 192, 3], "int32");

  // The tf.browser.fromPixels() function in TensorFlow.js is used to create a tensor from an image object. The image object can be an HTMLImageElement, an HTMLCanvasElement, or an HTMLVideoElement. This function will create a tensor with the shape of [numrows, numcolumns, numchannels], where numchannels is the number of color channels in the image (e.g. 1 for grayscale, 3 for RGB).
  let imageTensor = tf.browser.fromPixels(EXAMPLE_IMG);
  console.log("imageTensor", imageTensor.shape);

  // Calculate the coordinates of the crop area. You may choose to use the COCO-SSD model to draw an ideal bounding box around the object on which you want the model to perform inference.
  let cropStartPoint = [15, 170, 0];
  let cropSize = [345, 345, 3];

  // The tf.slice() function in TensorFlow.js is used to extract a slice of a tensor. The function takes three parameters: the input tensor, the start position (an array of integers), and the size (also an array of integers). The output tensor will contain the values of the input tensor from the start position to the end of the specified size.
  let croppedTensor = tf.slice(imageTensor, cropStartPoint, cropSize);

  // The tf.image.resizeBilinear() function in TensorFlow.js is used to resize an image tensor. The function takes three parameters: the input tensor, the desired output size (an array of two integers), and an argument which specifies whether to preserve the aspect ratio of the image or not (the default is true). The output tensor will contain the resized image.For example, to resize an image tensor to a size of [192, 192]:
  let resizedTensor = tf.image
    .resizeBilinear(croppedTensor, [192, 192], true)
    .toInt();

  console.log("resizedTensorshape", resizedTensor.shape);
  //Test below:
  // let tensorOutput = movenet.predict(exampleInputTensor);

  // Action
  // use ‘tf.expandDims()’ to account for the additional dimension required to add the batch size to the tensor. Your image currently has the shape [192, 192, 3] while the shape of the expected input tensor is [1, 192, 192, 3]. Not doing this will cause a shape error.
  let tensorOutput = movenet.predict(tf.expandDims(resizedTensor));

  console.log("raw tensorOutput", tensorOutput);

  //The tensorOutput.array() function returns the values of the tensor as a JavaScript array
  let arrayOutput = await tensorOutput.array();

  console.log("arrayOutput", arrayOutput);

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Draw the image on the canvas
  ctx.drawImage(EXAMPLE_IMG, 0, 0);

  // Draw a small circular point at x: 170, y: 15 from the box
  ctx.beginPath();
  ctx.arc(170, 15, 3, 0, 2 * Math.PI);
  ctx.fillStyle = "blue";
  ctx.fill();

  // Draw a small circular point at x: 94, y: 15 from the box
  ctx.beginPath();
  let x = 170 + 345 / 2;
  let y = 15 + 345 / 2;
  ctx.arc(x, y, 3, 0, 2 * Math.PI);
  ctx.fillStyle = "green";
  ctx.fill();

  // Set the stroke style to red
  ctx.strokeStyle = "red";
  // Draw a box at x: 170, y: 15, width: 345, height: 345
  ctx.strokeRect(170, 15, 345, 345);
  // Draw a small circular point at x: 94, y: 15 from the box
  ctx.beginPath();
  ctx.arc(264, 30, 3, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();

  const inputSize = 192;
  const arr = [
    [
      [
        [0.08709511160850525, 0.49314209818840027, 0.5901185274124146],
        [0.07062023133039474, 0.5149994492530823, 0.7489978075027466],
        [0.07055883854627609, 0.4780544340610504, 0.5669557452201843],
      ],
    ],
  ];

  let coordinates = [];

  for (let i = 0; i < arrayOutput.length; i++) {
    for (let j = 0; j < arrayOutput[i].length; j++) {
      for (let k = 0; k < arrayOutput[i][j].length; k++) {
        coordinates.push([
          arrayOutput[i][j][k][0] * inputSize,
          arrayOutput[i][j][k][1] * inputSize,
        ]);
      }
    }
  }
  console.log(coordinates);

  const Xd = 170;
  const Yd = 15;

  let newArr = [];
  for (let i = 0; i < coordinates.length; i++) {
    console.log(coordinates[i][0] + Yd);
    console.log(coordinates[i][1] + Xd);

    newArr.push([coordinates[i][1] + Xd, coordinates[i][0] + Yd]);
  }
  console.log(newArr);

  // Draw small circles at newArr points
  for (let i = 0; i < newArr.length; i++) {
    ctx.beginPath();
    ctx.arc(newArr[i][0], newArr[i][1], 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  // // Draw a small circular point at x: 94, y: 15
  // ctx.beginPath();
  // ctx.arc(640, 15, 3, 0, 5 * Math.PI);
  // ctx.fillStyle = "red";
  // ctx.fill();

  // const keypoints = arrayOutput;

  // // Draw rectangles for the keypoints
  // for (let i = 0; i < keypoints[0].length; i++) {
  //   const keypoint = keypoints[0][i];
  //   if (keypoint[2] > 0.5) {
  //     ctx.fillRect(
  //       keypoint[0] * canvas.width,
  //       keypoint[1] * canvas.height,
  //       5,
  //       5
  //     );
  //   }
  // }
}

loadAndRunModel();
