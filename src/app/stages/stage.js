import Loading from './loading';
import StartGame from './startGame';
import Rules from './rules';
import Game from './game';
import GameOver from './gameOver';
import Assets from '../assets';
import bgMusic from '../../audio/game.mp3';

export default class Stage {
    constructor(ctx) {
        this.context = ctx;
        this.current = 'loading';
        this.assets = new Assets();
        this.bgMusic = new Audio();

        this.loading = new Loading(this.context, this.assets);
        this.startGame = new StartGame(this.context, this.assets);
        this.rules = new Rules(this.context, this.assets);
        this.game = new Game(this.context, this.assets);
        this.gameOver = new GameOver(this.context, this.assets);
    }

    downloadAssets() {
        this.assets.addRessource();
        this.assets.download();
    }

    playAudio() {
        this.bgMusic.src = bgMusic;
        this.bgMusic.play();
        this.bgMusic.loop = true;
    }

    pauseAudio() {
        this.bgMusic.pause();
    }
}
