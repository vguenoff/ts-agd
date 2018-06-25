// https://github.com/Apress/adv-game-design-w-html5-javascript/blob/master/library/utilities.js

// export const assets = {
//     toLoad: 0,
//     loaded: 0,
//     imageExtensions: ['png', 'jpg', 'gif'],
//     fontExtensions: ['ttf', 'otf', 'ttc', 'woff'],
//     jsonExtensions: ['json'],
//     audioExtensions: ['mp3', 'ogg', 'wav', 'webm'],
//     load(sources) {
//         return new Promise(resolve => {
//             const loadHandler = () => {
//                 this.loaded += 1;
//                 console.log(this.loaded);

//                 if (this.toLoad === this.loaded) {
//                     this.toLoad = 0;
//                     this.loaded = 0;
//                     console.log('Assets fiished loading.');

//                     resolve();
//                 }
//             };

//             console.log('Loading assets...');
//             this.toLoad = sources.length;

//             sources.forEach(source => {
//                 const extension = source.split('.').pop();

//                 if (this.imageExtensions.indexOf(extension) !== -1) {
//                     this.loadImage(source, loadHandler);
//                 } else if (this.fontExtensions.indexOf(extension) !== -1) {
//                     this.loadImage(source, loadHandler);
//                 } else if (this.jsonExtensions.indexOf(extension) !== -1) {
//                     this.loadImage(source, loadHandler);
//                 } else if (this.audioExtensions.indexOf(extension) !== -1) {
//                     this.loadImage(source, loadHandler);
//                 } else {
//                     console.log(`File type not recognized: ${source}`);
//                 }
//             });
//         });
//     },
// };

export const assets = {
    // Properties to help track the assets being loaded
    toLoad: 0,
    loaded: 0,
    // File extensions for different types of assets
    imageExtensions: ['png', 'jpg', 'gif'],
    fontExtensions: ['ttf', 'otf', 'ttc', 'woff'],
    jsonExtensions: ['json'],
    audioExtensions: ['mp3', 'ogg', 'wav', 'webm'],
    // The `load` method creates and loads all the assets. Use it like this:
    // `assets.load(['images/anyImage.png', 'fonts/anyFont.otf']);`
    load(sources) {
    // The `load` method will return a Promise when everything has loaded
    return new Promise(resolve => {
        // The `loadHandler` counts the number of assets loaded, compares
        // it to the total number of assets that need to be loaded, and
        // resolves the Promise when everything has loaded
        const loadHandler = () => {
            this.loaded += 1;
            console.log(this.loaded);
            // Check whether everything has loaded
            if (this.toLoad === this.loaded) {
                // Reset `toLoad` and `loaded` to `0` so you can use them
                // to load more assets later if you need to
              this.toLoad = 0;
              this.loaded = 0;
              console.log('Assets finished loading');
              // Resolve the promise
              resolve();
        }
        // Display a console message to confirm that the assets are
        // being loaded
        console.log('Loading assets...');
        // Find the number of files that need to be loaded
        this.toLoad = sources.length;
        // Loop through all the source filenames and find out how
        // they should be interpreted
        sources.forEach(source => {
        // Find the file extension of the asset
        let extension = source.split('.').pop();
         //Load images that have file extensions that match
        //the imageExtensions array
        if (this.imageExtensions.indexOf(extension) !== -1) {
          this.loadImage(source, loadHandler);
        }
         //Load fonts
        else if (this.fontExtensions.indexOf(extension) !== -1) {
          this.loadFont(source, loadHandler);
        }
         //Load JSON files
        else if (this.jsonExtensions.indexOf(extension) !== -1) {
          this.loadJson(source, loadHandler);
        }
         //Load audio files
        else if (this.audioExtensions.indexOf(extension) !== -1) {
          this.loadSound(source, loadHandler);
         //Display a message if a file type isn't recognized
        else {
          console.log('File type not recognized: ' + source);
        }
      });
    });
    },
    loadImage(source, loadHandler) {
     //Create a new image and call the `loadHandler` when the image
    //file has loaded
    let image = new Image();
    image.addEventListener('load', loadHandler, false);
     //Assign the image as a property of the `assets` object so
    //you can access it like this: `assets['path/imageName.png']`
    this[source] = image;
     //Set the image's `src` property to start loading the image
    image.src = source;
    },
    loadFont(source, loadHandler) {
     //Use the font's filename as the `fontFamily` name
    let fontFamily = source.split('/').pop().split('.')[0];
     //Append an `@afont-face` style rule to the head of the HTML document
    let newStyle = document.createElement('style');
    let fontFace
      = '@font-face {font-family: '' + fontFamily + ''; src: url('' + source + '');}';
    newStyle.appendChild(document.createTextNode(fontFace));
    document.head.appendChild(newStyle);
     //Tell the `loadHandler` we're loading a font
    loadHandler();
    },
    loadJson(source, loadHandler) {
    //Create a new `xhr` object and an object to store the file
    let xhr = new XMLHttpRequest();
     //Use xhr to load the JSON file
    xhr.open('GET', source, true);
     //Tell xhr that it's a text file
    xhr.responseType = 'text';
     //Create an `onload` callback function that
    //will handle the file loading
    xhr.onload = event => {
       //Check to make sure the file has loaded properly
      if (xhr.status === 200) {
         //Convert the JSON data file into an ordinary object
        let file = JSON.parse(xhr.responseText);
         //Get the filename
        file.name = source;
         //Assign the file as a property of the assets object so
        //you can access it like this: `assets['file.json']`
        this[file.name] = file;
         //Texture atlas support:
    //If the JSON file has a `frames` property then
        //it's in Texture Packer format
        if (file.frames) {
           //Create the tileset frames
          this.createTilesetFrames(file, source, loadHandler);
        } else {
           //Alert the load handler that the file has loaded
          loadHandler();
        }
      }
    };
     //Send the request to load the file
    xhr.send();
    },
    createTilesetFrames(file, source, loadHandler) {
     //Get the tileset image's file path
    let baseUrl = source.replace(/[^\/]*$/, ');
     //Use the `baseUrl` and `image` name property from the JSON
    //file's `meta` object to construct the full image source path
    let imageSource = baseUrl + file.meta.image;
     //The image's load handler
    let imageLoadHandler = () => {
       //Assign the image as a property of the `assets` object so
      //you can access it like this:
      //`assets['images/imageName.png']`
      this[imageSource] = image;
       //Loop through all the frames
      Object.keys(file.frames).forEach(frame => {
         //The `frame` object contains all the size and position
        //data for each sub-image.
        //Add the frame data to the asset object so that you
        //can access it later like this: `assets['frameName.png']`
        this[frame] = file.frames[frame];
         //Get a reference to the source so that it will be easy for
        //us to access it later
        this[frame].source = image;
      });
       //Alert the load handler that the file has loaded
      loadHandler();
    };
     //Load the tileset image
    let image = new Image();
    image.addEventListener('load', imageLoadHandler, false);
    image.src = imageSource;
    },
    loadSound(source, loadHandler) {
    console.log('loadSound called – see Chapter 10 for details');
    }
};
