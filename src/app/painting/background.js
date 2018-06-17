export default class Background {
    constructor(ctx, elem) {
        this.context = ctx;
        this.elem = elem;
    }

    draw() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.context.drawImage(this.elem, 0, 0, width, height);
    }
}
