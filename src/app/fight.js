import explosion from '../audio/explode.mp3';
import { randomize } from './static';

export default class Fight {
    constructor(img, x, y) {
        this.img = img;
        this.audio = new Audio();

        this.x = x;
        this.y = y;
        this.width = 220;
        this.height = 220;
    }

    playAudio() {
        this.audio.src = explosion;
        this.audio.play();
    }

    positionBangX() {
        const max = 10;
        const min = 30;

        this.x = randomize(max, min);

        return this.x;
    }

    positionBangY() {
        const max = 0;
        const min = 110;

        this.y = randomize(max, min);
        return this.y;
    }
}
