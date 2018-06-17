import Text from '../painting/text';

export default class Loading {
    constructor(context, assets) {
        this.context = context;
        this.assets = assets;
        this.nextStage = 'loading';
    }

    render() {
       this.drawTitle();
    }

    update() {
        if (this.assets.isDone()) {
            this.changeStage();
            this.clearStage();
        }
    }

    drawTitle() {
        const title = new Text(this.context, 'Loading...', '#000', 110, 'Mael');
        title.draw(window.innerWidth / 2, window.innerHeight / 2);
    }

    changeStage() {
        this.nextStage = 'loading';
    }

    clearStage() {
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
}
