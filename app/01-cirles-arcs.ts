import { drawPath } from './utils';

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

        ctx.beginPath();
        ctx.arc(128, 128, 64, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.fill();

        document.body.appendChild(canvas);
    }
}
