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
        const title = new Text(this.context, 'Loading...', '#fff', 110, 'Arial');
        title.draw(window.innerWidth / 2, window.innerHeight / 2);
    }

    changeStage() {
        this.nextStage = 'start';
    }

    clearStage() {
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
}
