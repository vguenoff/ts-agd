export class BlittingImage {
    constructor() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.setAttribute('width', '256');
        canvas.setAttribute('height', '256');
        canvas.style.border = '1px solid black';

        const tileset = new Image();
        tileset.src = '../assets/images/tileset.png';
        tileset.addEventListener('load', () => {
            ctx.drawImage(tileset, 192, 128, 64, 64, 96, 96, 64, 64);
            // the source x and y position; the source height and width
        });

        document.body.appendChild(canvas);
    }
}
