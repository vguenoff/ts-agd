import { drawPath } from './utils';

export class RectShapesGradient {
    constructor() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.setAttribute('width', '256');
        canvas.setAttribute('height', '256');
        canvas.style.border = '1px solid black';

        // triangle
        const triangle = [
            [158, 125],
            [200, 210],
            [115, 210],
        ];
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.fillStyle = '#E7FA48';
        ctx.lineJoin = 'bevel'; // round, mitre, bevel

        drawPath(ctx, triangle);
        ctx.fill();

        // squares and rectangles
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;

        ctx.fillStyle = '#D1F8F8';

        ctx.beginPath();
        ctx.fillRect(65, 55, 85, 105);
        ctx.strokeRect(50, 40, 70, 90);

        // create a gradient
        // const gradient = ctx.createLinearGradient(10, 10, 70, 80);
        const gradient = ctx.createRadialGradient(40, 40, 1, 40, 40, 30);
        gradient.addColorStop(0, '#FFE9E9');
        gradient.addColorStop(1, '#FF1DA2');

        ctx.fillStyle = gradient;
        ctx.strokeStyle = '#FC4A4A';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.rect(20, 20, 40, 40);
        ctx.stroke();
        ctx.fill();

        document.body.appendChild(canvas);
    }
}
