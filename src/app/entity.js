export class Hero {
    constructor(img, width, height) {
        this.img = img;
        this.width = width;
        this.height = height;

        this.x = window.innerWidth / 6;
        this.y = (window.innerHeight / 2) - 180;
        this.fullName = '';
        this.health = 100;
        this.level = 1;
    }

    resize() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
    }

    changeHealth(count) {
        this.health -= count;
    }

    addHealth(count) {
        if (this.health + count < 100) {
            this.health += count;
        } else this.health = 100;
    }

    changeLevel() {
        this.level += 1;
    }

    setName(name) {
        this.fullName = name;
    }
}

export class Enemy {
    constructor(imgHead, imgArm, imgLeg, imgTrunk) {
        this.name = [['Ужасный', 'Злобный', 'Сопливый'],
['Огр', 'Гном', 'Гоблин'],
['Том', 'Макс', 'Дима']];

        this.fullName = this.creatFullName();
        this.health = 100;

        this.imgHead = {
            img: imgHead,
            x: window.innerWidth - 480,
            y: (window.innerHeight / 2) - 160,
            width: 150,
            height: 150,
        };

        this.imgArm = {
            img: imgArm,
            x: window.innerWidth - 360,
            y: (window.innerHeight / 2) - 80,
            width: 100,
            height: 180,
        };

        this.imgLeg = {
            img: imgLeg,
            x: window.innerWidth - 460,
            y: (window.innerHeight / 2) + 30,
            width: 100,
            height: 150,
        };

        this.imgTrunk = {
            img: imgTrunk,
            x: window.innerWidth - 500,
            y: (window.innerHeight / 2) - 80,
            width: 200,
            height: 130,
        };

        window.addEventListener('resize', this.resize.bind(this));
    }

    resize() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
    }

    creatFullName() {
        let nameEnemy = '';
        for (let i = 0; i < this.name.length; i += 1) {
            nameEnemy += i === this.name.length - 1 ? `${this.name[i][Math.floor(Math.random() * this.name[i].length)]}` : `${this.name[i][Math.floor(Math.random() * this.name[i].length)]} `;
        }

        return nameEnemy;
    }

    changeHealth(count) {
        this.health -= count;
    }

    addHealth(count) {
        if (this.health + count < 100) {
            this.health += count;
        } else this.health = 100;
    }
}
