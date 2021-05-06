const { greyscale } = require('jimp');
const { rotate } = require('jimp');
const Jimp = require('jimp');

// const fs = require('fs').promises;

const prompt = require('prompt-sync')();

// Jimp.read('IMG_0716.jpg')
//   .then(IMG_0716 => {
//     return IMG_0716
//       .resize(Jimp.AUTO, 250) // resize
//       .quality(60) // set JPEG quality
//       .sepia()
//       .write('IMG_0716-small-bw.jpg'); // save
//   })
//   .catch(err => {
//     console.error(err);
//   });

const mySepia = image => {
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    // x, y is the position of this pixel on the image
    // idx is the position start position of this rgba tuple in the bitmap Buffer
    // this is the image

    var red = this.bitmap.data[idx + 0];
    var green = this.bitmap.data[idx + 1];
    var blue = this.bitmap.data[idx + 2];
    var alpha = this.bitmap.data[idx + 3];

    red = red * 0.35 + green * 0.769 + blue * 0.189;
    green = red * 0.349 + green * 0.586 + blue * 0.168;
    blue = red * 0.272 + green * 0.534 + blue * 0.131;

    this.bitmap.data[idx] = red < 255 ? red : 255;
    this.bitmap.data[idx + 1] = green < 255 ? green : 255;
    this.bitmap.data[idx + 2] = blue < 255 ? blue : 255;
    // rgba values run from 0 - 255
    // e.g. this.bitmap.data[idx] = 0; // removes red from this pixel
  });
}

// await is store the results of the async operation
const sp = async (fileName) => {
  try {
    console.log('Starting task...');
    const image = await Jimp.read(fileName);
    mySepia(image)
    image
      //.resize(Jimp.AUTO, 250)
      .quality(100)
      .rotate(90)
      // .sepia() // method
      .write(`${fileName}_sepia.jpg`)
    console.log('Successfully copied the contents!');
  } catch (err) {
    console.log('Something went wrong:');
    console.log(err);
  }
};

// sp();

const brightSepia = image => {
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    // x, y is the position of this pixel on the image
    // idx is the position start position of this rgba tuple in the bitmap Buffer
    // this is the image

    var red = this.bitmap.data[idx + 0];
    var green = this.bitmap.data[idx + 1];
    var blue = this.bitmap.data[idx + 2];
    var alpha = this.bitmap.data[idx + 3];

    red = red * 0.45 + green * 0.869 + blue * 0.189;
    green = red * 0.349 + green * 0.786 + blue * 0.168;
    blue = red * 0.272 + green * 0.534 + blue * 0.231;

    this.bitmap.data[idx] = red < 255 ? red : 255;
    this.bitmap.data[idx + 1] = green < 255 ? green : 255;
    this.bitmap.data[idx + 2] = blue < 255 ? blue : 255;
    // rgba values run from 0 - 255
    // e.g. this.bitmap.data[idx] = 0; // removes red from this pixel
  });
}

const bs = async (fileName) => {
  try {
    console.log('Starting task...');
    const image = await Jimp.read(fileName);
    brightSepia(image)
    image
      .brightness(.25)
      .quality(100)
      .rotate(90)
      .contrast(.25)
      .write(`${fileName}_bs.jpg`)
    console.log('Successfully copied the contents!');
  } catch (err) {
    console.log('Something went wrong:');
    console.log(err);
  }
};

// bs();



const vibrance = async (fileName) => {
  try {
    console.log('Starting task...');
    const image = await Jimp.read(fileName);
    image
      .brightness(.25)
      .quality(100)
      .contrast(.35)
      .rotate(90)
      .write(`${fileName}_vibrance.jpg`)
    console.log('Successfully copied the contents!');
  } catch (err) {
    console.log('Something went wrong:');
    console.log(err);
  }
};

// vibrance();

const rotateImage = async (fileName) => {
  try {
    console.log('Starting task...');
    const image = await Jimp.read(fileName);
    image
      .rotate(180)
      .quality(100)
      .write(`${fileName}rotate.jpg`)
    console.log('Successfully copied the contents!');
  } catch (err) {
    console.log('Something went wrong:');
    console.log(err);
  }
};

// rotateImage();

const grayscale = async (fileName) => {
  try {
    console.log('Starting task...');
    const image = await Jimp.read(fileName);
    image
      // .rotate(90)
      .quality(100)
      .grayscale()
      .write(`${fileName}_grayscale.jpg`)
    console.log('Successfully copied the contents!');
  } catch (err) {
    console.log('Something went wrong:');
    console.log(err);
  }
};

// grayscale();
const fileName = prompt('What is the name of the file you want edit? ');


const n = prompt('How would you like to manipulate your photo? 1 = Sepia. 2 = Bright Sepia. 3 = Vibrancy. 4 = Rotate. 5 = Grayscale. ');

if (n === '1') {
  return sp(fileName);
} else if (n === '2') {
  return bs(fileName);
} else if (n === '3') {
  return vibrance(fileName);
} else if (n === '4') {
  return rotateImage(fileName);
} else if (n === '5') {
  return grayscale(fileName);
} else {
  return 'That is not a valid option'
}