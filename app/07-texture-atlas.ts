import { assets } from './library/utilities';

export class TextureAtlas {
    constructor() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.setAttribute('width', '256');
        canvas.setAttribute('height', '256');
        canvas.style.border = '1px solid black';

        assets.load(['../assets/images/animals.json']).then(res => {
            console.log(res);

            const cat = assets['cat.png'];
            console.log(cat);
            // ctx.drawImage(cat, 192, 128, 64, 64, 96, 96, 64, 64);
        });

        document.body.appendChild(canvas);
    }
}
