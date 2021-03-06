/*
utilities.js
==============
This JavaScript file contains useful functions for
adding interactivity to sprites. See the sprites.js file for
sprite prototype objects can use this code
*/

// Dependencies
import { makeSound } from '../library/sound';

/*
assets
------
This is an object to help you load and use game assets, like images, fonts and sounds,
and texture atlases.
Here's how to use to load an image, a font and a texture atlas:
    assets.load([
      "images/cat.png",
      "fonts/puzzler.otf",
      "images/animals.json",
    ]).then(() => setup());

When all the assets have finsihed loading, the makeSprites function
will run. (Replace makeSprites with an other function you need).
When you've loaded an asset, you can acccess it like this:
    imageObject = assets["images/cat.png"];
Access individual frames in a texture atlas using the frame's name, like this:
    frame = assets["hedgehog.png"];
(Just use the image name without the extension.)
*/

export const assets = {
    // Properties to help track the assets being loaded
    toLoad: 0,
    loaded: 0,

    //  File extensions for different types of assets
    imageExtensions: ['png', 'jpg', 'gif'],
    fontExtensions: ['ttf', 'otf', 'ttc', 'woff'],
    jsonExtensions: ['json'],
    audioExtensions: ['mp3', 'ogg', 'wav', 'webm'],

    // The `load` method creates and loads all the assets. Use it like this:
    // `assets.load(["images/anyImage.png", "fonts/anyFont.otf"]);`
    load(sources) {
        // The `load` method will return a Promise when everything has
        // loaded
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
            };

            // Display a console message to confirm that the assets are
            // being loaded
            console.log('Loading assets...');

            // Find the number of files that need to be loaded
            this.toLoad = sources.length;

            // Loop through all the source file names and find out how
            // they should be interpreted
            sources.forEach(source => {
                // Find the file extension of the asset
                const extension = source.split('.').pop();

                // Load images that have file extensions that match
                // the imageExtensions array
                if (this.imageExtensions.find(x => x === extension)) {
                    this.loadImage(source, loadHandler);
                } else if (this.fontExtensions.find(x => x === extension)) {
                    this.loadFont(source, loadHandler);
                } else if (this.jsonExtensions.find(x => x === extension)) {
                    this.loadJson(source, loadHandler);
                } else if (this.audioExtensions.find(x => x === extension)) {
                    this.loadSound(source, loadHandler);
                } else {
                    // Display a message if a file type isn't recognized
                    console.log('File type not recognized: ' + source);
                }
            });
        });
    },

    loadImage(source, loadHandler) {
        // Create a new image and call the `loadHandler` when the image
        // file has loaded
        const image = new Image();
        image.addEventListener('load', loadHandler, false);
        // Assign the image as a property of the `assets` object so
        // you can access it like this: `assets["path/imageName.png"]`
        this[source] = image;

        // Alternatively, if you only want the file name without the full
        // path, you can get it like this:
        // image.name = source.split("/").pop();
        // this[image.name] = image;
        // This will allow you to access the image like this:
        // assets["imageName.png"];

        // Set the image's `src` property to start loading the image
        image.src = source;
    },

    loadFont(source, loadHandler) {
        // Use the font's file name as the `fontFamily` name
        const fontFamily = source
            .split('/')
            .pop()
            .split('.')[0];
        // Append an `@afont-face` style rule to the head of the HTML
        // document. It's kind of a hack, but until HTML5 has a
        // proper font loading API, it will do for now
        const newStyle = document.createElement('style');
        const fontFace = `@font-face {
            font-family: ${fontFamily}';
            src: url('${source}');
        }`;

        newStyle.appendChild(document.createTextNode(fontFace));
        document.head.appendChild(newStyle);
        // Tell the `loadHandler` we're loading a font
        loadHandler();
    },

    loadJson(source, loadHandler) {
        // Create a new `xhr` object and an object to store the file
        const xhr = new XMLHttpRequest();

        // Use xhr to load the JSON file
        xhr.open('GET', source, true);

        // Tell xhr that it's a text file
        xhr.responseType = 'text';

        // Create an `onload` callback function that
        // will handle the file loading
        xhr.onload = event => {
            // Check to make sure the file has loaded properly
            if (xhr.status === 200) {
                // Convert the JSON data file into an ordinary object
                const file = JSON.parse(xhr.responseText);
                // Get the file name
                file.name = source;
                // Assign the file as a property of the assets object so
                // you can access it like this: `assets["file.json"]`
                this[file.name] = file;
                // Texture atlas support:
                // If the JSON file has a `frames` property then
                // it's in Texture Packer format
                if (file.frames) {
                    // Create the tileset frames
                    this.createTilesetFrames(file, source, loadHandler);
                } else {
                    // Alert the load handler that the file has loaded
                    loadHandler();
                }
            }
        };
        // Send the request to load the file
        xhr.send();
    },

    createTilesetFrames(file, source, loadHandler) {
        // Get the tileset image's file path
        const baseUrl = source.replace(/[^\/]*$/, '');

        // Here's how this regular expression works:
        // http:// stackoverflow.com/questions/7601674/id-like-to-remove-the-filename-from-a-path-using-javascript

        // Use the `baseUrl` and `image` name property from the JSON
        // file's `meta` object to construct the full image source path
        const imageSource = baseUrl + file.meta.image;

        // The image's load handler
        const imageLoadHandler = () => {
            // Assign the image as a property of the `assets` object so
            // you can access it like this:
            // `assets["images/imageName.png"]`
            this[imageSource] = image;

            // Loop through all the frames
            Object.keys(file.frames).forEach(frame => {
                // The `frame` object contains all the size and position
                // data for each sub-image.
                // Add the frame data to the asset object so that you
                // can access it later like this: `assets["frameName.png"]`
                this[frame] = file.frames[frame];

                // Get a reference to the source so that it will be easy for
                // us to access it later
                this[frame].source = image;
            });

            // Alert the load handler that the file has loaded
            loadHandler();
        };

        // Load the tileset image
        const image = new Image();
        image.addEventListener('load', imageLoadHandler, false);
        image.src = imageSource;
    },

    loadSound(source, loadHandler) {
        // Create a sound sprite and alert the `loadHandler`
        // when the sound file has loaded.
        //
        const sound = makeSound(source, loadHandler);

        // Get the sound file name.
        sound.name = source;

        // If you just want to extract the file name with the
        // extension, you can do it like this:
        // soundSprite.name = source.split("/").pop();
        // Assign the sound as a property of the assets object so
        // we can access it like this: `assets["sounds/sound.mp3"]`.
        this[sound.name] = sound;
    },
};
