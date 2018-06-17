export class ShapesWithImages {
    constructor() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.setAttribute('width', '256');
        canvas.setAttribute('height', '256');
        canvas.style.border = '1px solid black';

        const cat = new Image();
        cat.src = '../assets/images/cat.png';

        cat.addEventListener('load', () => {
            // filling a shape with an image
            // ctx.beginPath();
            // ctx.rect(64, 64, 128, 128);
            // ctx.fillStyle = ctx.createPattern(cat, 'no-repeat');

            // ctx.save();
            // ctx.translate(64, 64);
            // ctx.fill();
            // ctx.restore();

            // mmask an image
            ctx.beginPath();
            ctx.arc(128, 128, 64, 0, Math.PI * 2, false);
            ctx.clip();
            // draw a image
            ctx.drawImage(cat, 64, 64);
        });

        document.body.appendChild(canvas);
    }
}
