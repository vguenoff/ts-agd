export class RotationScaleTransparency {
    constructor() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.setAttribute('width', '256');
        canvas.setAttribute('height', '256');
        canvas.style.border = '1px solid black';

        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.translate(128, 128);
        ctx.rotate(Math.PI / 4);
        ctx.beginPath();
        ctx.scale(1.2, 1.2);
        ctx.fillRect(-64, -64, 128, 128);
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = 0.3;
        ctx.arc(160, 160, 64, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.restore();

        document.body.appendChild(canvas);
    }
}
