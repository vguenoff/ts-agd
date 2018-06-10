import { drawPath } from './utils';

export class CirclesArcs {
    constructor() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.setAttribute('width', '256');
        canvas.setAttribute('height', '256');
        canvas.style.border = '1px solid black';

        document.body.appendChild(canvas);
    }
}
