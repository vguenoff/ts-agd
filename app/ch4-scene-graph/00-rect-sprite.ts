const children = [];

const reactangle = (
    width = 32,
    height = 32,
    fillStyle = 'gray',
    strokeStyle = 'none',
    lineWidth = 0,
    x = 0,
    y = 0,
) => {
    const o = {
        width,
        height,
        fillStyle,
        strokeStyle,
        lineWidth,
        x,
        y,
        rotation: 0,
        alpha: 0,
        visible: true,
        scaleX: 1,
        scaleY: 1,
        vx: 0,
        vy: 0,
        render: ctx => {
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.lineWidth;
            ctx.fillStyle = this.fillStyle;
            ctx.beginPath();
            ctx.rect(
                -this.width / 2,
                -this.height / 2,
                this.width,
                this.height,
            );

            if (this.strokeStyle !== 'none') {
                ctx.stroke();
            }
            ctx.fill();
        },
    };

    children.push(o);

    return 0;
};
