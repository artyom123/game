import Text from './text';

export default class Element {
    constructor(ctx, str, value) {
        this.context = ctx;
        this.str = str;
        this.value = value;
    }

    create(bg, x, y, width, height) {
        this.context.drawImage(bg, x, y, width, height);
        this.drawText(x, y, width, height);
    }

    drawText(x, y, width, height) {
        const str = `${this.str} ${this.value}`;
        const text = new Text(this.context, str, '#fff', 16, 'Lato');

        const textX = Element.defineTextX(x, width);
        const textY = Element.defineTextY(y, height, text.size);

        text.draw(textX, textY);
    }

    static defineTextX(x, width) {
        const widthCenter = width / 2;
        return x + widthCenter;
    }

    static defineTextY(y, height, size) {
        const heightCenter = (height / 2) + (size / 3);
        return y + heightCenter;
    }
}
