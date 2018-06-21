export class Text {
    constructor() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.setAttribute('width', '256');
        canvas.setAttribute('height', '256');
        canvas.style.border = '1px solid black';

        const content = 'Hello world!';

        ctx.font = "24px 'Rockwell Extra Bold','Futura',sans-serif";
        const textWidth = ctx.measureText(content).width;
        const textHeight = ctx.measureText('M').width;

        ctx.fillStyle = 'red';
        ctx.textBaseline = 'middle';

        ctx.fillText(
            content,
            canvas.width / 2 - textWidth / 2,
            canvas.height / 2 - textHeight / 2,
        );

        document.body.appendChild(canvas);
    }
}
