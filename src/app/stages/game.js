import Background from '../painting/background';
import { Hero, Enemy } from '../entity';
import Text from '../painting/text';
import { cache, randomize } from '../static';
import gong from '../../audio/start.mp3';

import Fight from '../fight';
import Form from '../form';


export default class Game {
    constructor(context, assets) {
        this.context = context;
        this.assets = assets;
        this.nextStage = 'game';
        this.audio = new Audio();
        this.form = new Form();

        this.xFire = 0;
        this.yFire = 0;

        this.hero = null;
        this.enemy = null;
        this.fight = null;

        this.bool = true;
        this.boolMagic = true;
        this.boolFight = true;

        this.boolBang = false;

        this.fireBangEnemy = false;

        this.selectMagic = null;
        this.key = this;

        this.count = 15;
        this.add = 10;

        this.text = '';

        this.value = [];
        this.keyPlayer = 0;
        this.player = 'player';

        this.numberArithmetic = 0;
        this.numberOne = 0;
        this.numberTwo = 0;
        this.intArrayRangeSimple = [1, 15];
        this.intArrayRangeDifficult = [0, 100];
        this.numbersArray = [];

        this.wordsEnglish = {
            cat: ['кот', 'кошка', 'котенок'],
            dog: ['собака', 'щенок', 'собачка'],
            fish: ['рыба', 'рыбка'],
            mouse: ['мышь', 'мышка', 'мышонок'],
        };
    }

    render() {
        if (!this.hero && !this.enemy) {
            this.createHero();
            this.createEnemy();
        }

        if (this.bool) {
            this.form.creatPopupMagic();
            this.selectMagic = document.querySelectorAll('#magic');
            this.bool = false;
        }

        if (this.enemy.health <= 0) {
            this.hero.changeLevel();
            this.createEnemy();
        }

        this.createFight(300, 300);

        this.drawBg();

        this.drawNameHero();
        this.drawHealthHero();
        this.drawLevelHero();
        this.drawEntity(this.hero);

        this.drawNameEnemy();
        this.drawHealthEnemy();
        this.drawEntity(this.enemy.imgArm);
        this.drawEntity(this.enemy.imgLeg);
        this.drawEntity(this.enemy.imgTrunk);
        this.drawEntity(this.enemy.imgHead);

        this.drawLighting();

        if (this.fireBangEnemy && this.xFire < this.enemy.imgTrunk.x) {
            this.createFire();
        } else if (this.fireBangEnemy && this.xFire > this.enemy.imgTrunk.x) {
            this.fight.playAudio();
            this.fireBangEnemy = false;
            this.enemy.changeHealth(this.count);

            this.x = this.xFire;
            this.y = this.yFire;

            this.createFight(this.x, this.y);
            this.drawEntity(this.fight);
        }

        if (this.fireBangHero && this.xFire > this.hero.x + 50) {
            this.createFire();
        } else if (this.fireBangHero && this.xFire < this.hero.x) {
            this.fight.playAudio();
            this.fireBangHero = false;
            this.hero.changeHealth(this.count);

            this.x = this.xFire;
            this.y = this.yFire;

            this.createFight(this.x, this.y);
            this.drawEntity(this.fight);
        }

        if (this.boolBang) {
            this.fireBangHero = true;

            this.xFire = window.innerWidth - 500;
            this.yFire = (window.innerHeight / 2) - 80;

            this.boolBang = false;
        } else if (this.boolBangEnemy) {
            this.fireBangEnemy = true;

            this.xFire = window.innerWidth / 6;
            this.yFire = (window.innerHeight / 2) - 80;

            this.boolBangEnemy = false;
        }

        if (this.boolMagic) {
            this.boolMagic = false;
            for (let i = 0; i < this.selectMagic.length; i += 1) {
                this.selectMagic[i].addEventListener('click', this.openMagic.bind(this));
            }
        }

        if (this.boolFight) {
            this.boolFight = false;
            this.form.inputSubmit.addEventListener('click', (e) => {
                e.preventDefault();
                this.Validate(this.numberArithmetic);
            });
        }
    }

    update() {
        this.createFire();
        if (this.hero.health <= 0) {
            this.form.magic.classList.add('hidden');
            this.value = [this.hero.fullName, this.hero.level];
            while (localStorage.getItem(`${this.player}${this.keyPlayer}`)) {
                this.keyPlayer += 1;
            }
            localStorage.setItem(`${this.player}${this.keyPlayer}`, `${this.value}`);

            this.changeStage();
            this.clearStage();
        }
    }

    drawBg() {
        const img = this.assets.getAsset('bg-game1.svg');
        const bg = new Background(this.context, img);

        bg.draw();
    }

    drawLighting() {
        const min = 0;
        const max = 170;

        const img = this.assets.getAsset(`lighting${randomize(3, 1)}.png`);

        this.x = this.hero.x + randomize(max, min);
        this.y = this.hero.y + randomize(max, min);
        this.context.drawImage(img, this.x, this.y, 100, 100);
    }

    drawNameHero() {
        const title = new Text(this.context, this.hero.fullName, '#5ba0f3', 30, 'Lato');
        title.draw(200, 50);
    }

    drawHealthHero() {
        const title = new Text(this.context, `Health: ${this.hero.health}`, '#fff', 25, 'Teko');
        title.draw(200, 80);
    }

    drawLevelHero() {
        const title = new Text(this.context, `Level: ${this.hero.level}`, '#fff', 20, 'Teko');
        title.draw(200, 110);
    }

    drawNameEnemy() {
        const title = new Text(this.context, this.enemy.fullName, '#d360ff', 30, 'Lato');
        title.draw(window.innerWidth - 220, 50);
    }

    drawHealthEnemy() {
        const title = new Text(this.context, `Health: ${this.enemy.health}`, '#fff ', 25, 'Teko');
        title.draw(window.innerWidth - 220, 80);
    }

    createHero() {
       const img = this.assets.getAsset('hero.png');
       this.hero = new Hero(img, 250, 300);
       this.hero.setName(!cache.heroName ? 'Clark' : cache.heroName);
    }

    createEnemy() {
        const max = 2;
        const min = 1;

        this.enemy = new Enemy(this.assets.getAsset(`head${randomize(max, min)}.png`), this.assets.getAsset(`arm${randomize(max, min)}.png`), this.assets.getAsset(`leg${randomize(max, min)}.png`), this.assets.getAsset(`trunk${randomize(max, min)}.png`));
        this.startAudio();
    }

    createFight(x, y) {
        const img = this.assets.getAsset('bang.png');
        this.fight = new Fight(img, x, y);
    }

    drawEntity(elem) {
        this.context.drawImage(elem.img, elem.x, elem.y, elem.width, elem.height);
    }

    openMagic(e) {
        const key = e.target.innerText;

        if (key !== 'FireIceWaterSoil+10') {
            this.form.magic.classList.add('hidden');
            this.form.createFormTask();
        }

        switch (key) {
            case 'Fire': this.createTask(key, '+');
            this.numberArithmetic = this.Sum(this.numberOne, this.numberTwo);
            break;

            case 'Ice': this.createTask(key, '-');
            this.numberArithmetic = this.Subtraction(this.numberOne, this.numberTwo);
            break;

            case 'Water': this.createTask(key, '*');
            this.numberArithmetic = this.Multiplication(this.numberOne, this.numberTwo);
            break;

            case 'Soil': this.createTask();
            break;

            case '+10': this.createTask(key);
            break;

            default:
            throw new Error('No stage is choosen');
        }
    }

    createTask(level, sign) {
        if (level === undefined && sign === undefined) {
        const wordsArrayEnglish = Object.keys(this.wordsEnglish);
        const randWordsEnglish = Math.floor(Math.random() * wordsArrayEnglish.length);

        this.text = document.createTextNode(`Translate into Russian: ${wordsArrayEnglish[randWordsEnglish]}`);
        } else if (level !== undefined && sign === undefined) {
            const min = 10;
            const max = 70;
            const numberRandom = randomize(max, min);

            for (let i = 0; i < 4; i += 1) {
                this.numbersArray.push(numberRandom + i);
            }
            const numbersStringLength = this.numbersArray.join(', ');
            this.text = document.createTextNode(`Enter the next number: ${numbersStringLength.substr(0, numbersStringLength.length - 3)} ...`);
        } else {
            this.numberOne = level === 'Fire' || level === 'Ice' ? randomize(...this.intArrayRangeDifficult) : randomize(...this.intArrayRangeSimple);
            this.numberTwo = level === 'Fire' || level === 'Ice' ? randomize(...this.intArrayRangeDifficult) : randomize(...this.intArrayRangeSimple);
            if (this.numberOne > this.numberTwo) this.text = document.createTextNode(`How much will: ${this.numberOne} ${sign} ${this.numberTwo} = ?`);
            else this.text = document.createTextNode(`How much will: ${this.numberTwo} ${sign} ${this.numberOne} = ?`);
        }
        const p = document.createElement('p');

        const information = document.querySelector('#information');

        this.form.div.appendChild(p);
        p.appendChild(this.text);
        information.appendChild(this.text);
    }

    Sum(numberOne, numberTwo) {
        this.numberOne = numberOne;
        this.numberTwo = numberTwo;
        return this.numberOne + this.numberTwo;
    }

    Subtraction(numberOne, numberTwo) {
        this.numberOne = numberOne;
        this.numberTwo = numberTwo;
        if (this.numberOne > this.numberTwo) return this.numberOne - this.numberTwo;
        return this.numberTwo - this.numberOne;
    }

    Multiplication(numberOne, numberTwo) {
        this.numberOne = numberOne;
        this.numberTwo = numberTwo;
        return this.numberOne * this.numberTwo;
    }

    Validate(numberArithmetic) {
        if (+this.form.inputText.value === numberArithmetic && this.form.inputText.value !== '') {
            this.boolBangEnemy = true;
        } else if (this.numbersArray[this.numbersArray.length - 1]) {
            if (this.numbersArray[this.numbersArray.length - 1] === +this.form.inputText.value) {
                this.hero.addHealth(this.add);
            } else {
                this.enemy.addHealth(this.add);
            }
        } else if (this.form.inputText.value) {
            let count = 0;
            const wordsArrayEnglish = Object.keys(this.wordsEnglish);
            for (let j = 0; j < wordsArrayEnglish.length; j += 1) {
                const words = this.wordsEnglish[wordsArrayEnglish[j]];
                for (let i = 0; i < words.length; i += 1) {
                    if (this.form.inputText.value.toUpperCase() === words[i].toUpperCase()) {
                        this.boolBangEnemy = true;
                        count += 1;
                    }
                }
            }
            if (count === 0) {
                this.boolBang = true;
            }
        } else {
            this.boolBang = true;
        }

        this.numbersArray = [];
        this.boolFight = false;
        this.form.clearInputFormFight();
        this.form.magic.classList.remove('hidden');
    }

    createFire() {
        if (this.fireBangEnemy) this.xFire += 2;
        else this.xFire -= 2;
        const img = this.assets.getAsset('fire.png');
        this.context.drawImage(img, this.xFire, this.yFire, 100, 100);
    }

    changeStage() {
        this.nextStage = 'over';
    }

    clearStage() {
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    restartGame() {
        this.startAudio();
        this.hero.health = 100;
        this.hero.level = 1;
        this.enemy.health = 100;
        this.form.divTable.classList.add('hidden');
    }

    startAudio() {
        this.audio.src = gong;
        this.audio.play();
    }
}
