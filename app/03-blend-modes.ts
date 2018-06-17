export class BlendModes {
    constructor() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.setAttribute('width', '256');
        canvas.setAttribute('height', '256');
        canvas.style.border = '1px solid black';

        // ctx.globalCompositeOperation = 'multiply';
        ctx.globalCompositeOperation = 'xor';

        ctx.save();
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.rect(32, 32, 128, 128);
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(160, 160, 64, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.restore();

        document.body.appendChild(canvas);
    }
}
