export function drawPath(ctx: CanvasRenderingContext2D, shape: number[][]) {
   const lastPoint = shape.length - 1;

   ctx.beginPath();
   ctx.moveTo(lastPoint[0], lastPoint[1]);
   shape.forEach(point => ctx.lineTo(point[0], point[1]));
   ctx.closePath();
   ctx.stroke();
}
