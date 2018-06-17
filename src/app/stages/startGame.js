import Background from '../painting/background';
import { cache } from '../static';
import Form from '../form';

export default class StartGame {
    constructor(context, assets) {
        this.context = context;
        this.assets = assets;
        this.nextStage = 'start';
        this.bool = true;
        this.nameUser = [];
        this.form = new Form();
    }

    static getHeroName() {
        return this.nameUser;
    }

    render() {
        this.drawBg();

        if (this.bool) {
            this.form.createFormUser();
            this.bool = false;
        }
    }

    update() {
        this.form.inputSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            this.form.clearFormUser();
            cache.heroName = this.form.inputText.value;
            this.changeStage();
            this.clearStage();
        });
    }

    drawBg() {
        const img = this.assets.getAsset('start.svg');
        const bg = new Background(this.context, img);

        bg.draw();
    }

    changeStage() {
        this.nextStage = 'rules';
    }

    clearStage() {
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
}
