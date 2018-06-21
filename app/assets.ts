export const assets = {
    toLoad: 0,
    loaded: 0,
    imageExtensions: ['png', 'jpg', 'gif'],
    fontExtensions: ['ttf', 'otf', 'ttc', 'woff'],
    jsonExtensions: ['json'],
    audioExtensions: ['mp3', 'ogg', 'wav', 'webm'],
    load(sources) {
        return new Promise(resolve => {
            const loadHandler = () => {
                this.loaded += 1;
                console.log(this.loaded);

                if (this.toLoad === this.loaded) {
                    this.toLoad = 0;
                    this.loaded = 0;
                    console.log('Assets fiished loading.');

                    resolve();
                }
            };

            console.log('Loading assets...');
            this.toLoad = sources.length;

            sources.forEach(source => {
                const extension = source.split('.').pop();

                if (this.imageExtensions.indexOf(extension) !== -1) {
                    this.loadImage(source, loadHandler);
                } else if (this.fontExtensions.indexOf(extension) !== -1) {
                    this.loadImage(source, loadHandler);
                } else if (this.jsonExtensions.indexOf(extension) !== -1) {
                    this.loadImage(source, loadHandler);
                } else if (this.audioExtensions.indexOf(extension) !== -1) {
                    this.loadImage(source, loadHandler);
                } else {
                    console.log(`File type not recognized: ${source}`);
                }
            });
        });
    },
};
