export default class Text {
    constructor(ctx, text, color, size, font) {
        this.context = ctx;
        this.text = text;
        this.color = color;
        this.size = size;
        this.font = font;
    }

    draw(x, y) {
        this.context.textAlign = 'center';
        this.context.fillStyle = this.color;
        this.context.font = `${this.size}px ${this.font}`;
        this.context.fillText(this.text, x, y);
    }
}
