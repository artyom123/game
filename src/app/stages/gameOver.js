import Background from '../painting/background';
import Text from '../painting/text';
import bgMusic from '../../audio/game.mp3';
import Form from '../form';

export default class GameOver {
    constructor(context, assets) {
        this.context = context;
        this.assets = assets;
        this.nextStage = 'over';
        this.audio = new Audio();
        this.form = new Form();

        this.bool = true;
        this.boolMagic = true;
    }

    render() {
        this.drawBg();
        this.drawTitle();
        this.form.divTable.classList.remove('hidden');

        if (this.bool) {
            this.playAudio();
            this.form.createButtonRestart();
            this.form.createTable();
            this.bool = false;
        }
    }

    update() {
        this.form.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.form.popup.innerHTML = '';
            if (this.boolMagic) {
                this.pauseAudio();
                this.boolMagic = false;
                this.form.magic.classList.remove('hidden');
            }
            this.changeStage();
            this.clearStage();
            this.bool = true;
        });
    }

    drawBg() {
        const img = this.assets.getAsset('bg-game-over.svg');
        const bg = new Background(this.context, img);

        bg.draw();
    }

    drawTitle() {
        const title = new Text(this.context, 'GAME OVER', '#fff', 70, 'Teko');
        title.draw((window.innerWidth / 2) + 10, 100);
    }

    changeStage() {
        this.nextStage = 'game';
    }

    clearStage() {
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    playAudio() {
        this.audio.src = bgMusic;
        this.audio.play();
        this.audio.loop = true;
    }

    pauseAudio() {
        this.audio.pause();
    }
}
