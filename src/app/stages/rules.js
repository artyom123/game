import Background from '../painting/background';
import Text from '../painting/text';

import Form from '../form';

export default class Rules {
    constructor(context, assets) {
        this.context = context;
        this.assets = assets;
        this.nextStage = 'rules';

        this.form = new Form();

        this.bool = true;
    }

    render() {
        this.drawBg();
        this.drawTitle();
        this.drawRule('1. You need to defeat all monsters.', 60);
        this.drawRule('2. Fight monsters using magic.', 100);
        this.drawRule('3. Each correct decision of a problem leaves for you the right of a course.', 140);
        this.drawRule('4. If the answer is wrong, the monster takes away your health.', 180);
        if (this.bool) {
            this.form.createButtonGo();
            this.bool = false;
        }
    }

    update() {
        this.form.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.form.clearFormUser();
            this.changeStage();
            this.clearStage();
        });
    }

    drawBg() {
        const img = this.assets.getAsset('rule.svg');
        const bg = new Background(this.context, img);

        bg.draw();
    }

    drawTitle() {
        const title = new Text(this.context, 'HOW TO PLAY', '#3D8DEC', 70, 'Teko');
        title.draw(window.innerWidth / 2, window.innerHeight / 3);
    }

    drawRule(str, margin) {
        const rule = new Text(this.context, str, '#fff', 24, 'Lato');
        rule.draw(window.innerWidth / 2, (window.innerHeight / 3) + margin);
    }

    changeStage() {
        this.nextStage = 'game';
    }

    clearStage() {
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
}
