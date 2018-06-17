export class CirclesArcs {
    constructor() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.setAttribute('width', '256');
        canvas.setAttribute('height', '256');
        canvas.style.border = '1px solid black';

        const gradient = ctx.createRadialGradient(96, 96, 12, 128, 128, 96);
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(1, 'black');

        ctx.fillStyle = gradient;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;

        ctx.shadowColor = 'rgba(128, 128, 128, 0.9)';
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.arc(128, 128, 64, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(32, 18);
        ctx.quadraticCurveTo(128, 40, 224, 18);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(32, 120);
        ctx.bezierCurveTo(32, 20, 224, 20, 224, 128);
        ctx.stroke();

        document.body.appendChild(canvas);
    }
}
