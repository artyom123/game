import bgGameOver from '../img/game/stage/bg-game-over.svg';

import bgStart from '../img/game/stage/start.svg';
import bgRule from '../img/game/stage/rule.svg';

import hero from '../img/game/hero/hero.png';

import fire from '../img/game/images/fire.png';

import lighting1 from '../img/game/images/lighting1.png';
import lighting2 from '../img/game/images/lighting2.png';
import lighting3 from '../img/game/images/lighting3.png';

import bgGame1 from '../img/game/stage/bg-game1.svg';

import explosion from '../img/game/images/explosion.svg';

import head1 from '../img/game/monstr/head/head1.png';
import head2 from '../img/game/monstr/head/head2.png';

import arm1 from '../img/game/monstr/arm/arm1.png';
import arm2 from '../img/game/monstr/arm/arm2.png';

import leg1 from '../img/game/monstr/leg/leg1.png';
import leg2 from '../img/game/monstr/leg/leg2.png';

import trunk1 from '../img/game/monstr/trunk/trunk1.png';
import trunk2 from '../img/game/monstr/trunk/trunk2.png';

import bang from '../img/game/images/bang.png';

export default class Assets {
    constructor() {
        this.list = [];
        this.cache = {};
        this.done = 0;
    }

    addRessource() {
        this.list.push(bgStart);
        this.list.push(bgRule);

        this.list.push(hero);

        this.list.push(fire);

        this.list.push(lighting1);
        this.list.push(lighting2);
        this.list.push(lighting3);

        this.list.push(bgGame1);

        this.list.push(bgGameOver);

        this.list.push(explosion);

        this.list.push(head1);
        this.list.push(head2);
        this.list.push(arm1);
        this.list.push(arm2);
        this.list.push(leg1);
        this.list.push(leg2);
        this.list.push(trunk1);
        this.list.push(trunk2);
        this.list.push(bang);
    }

    download() {
        this.list.forEach((item, i) => {
            const img = new Image();
            const url = this.list[i].replace(/images\//, '');

            img.addEventListener('load', () => {
                this.done += 1;
            });

            img.src = item;

            this.cache[url] = img;
        });
    }

    isDone() {
        return this.done === this.list.length;
    }

    getAsset(url) {
        return this.cache[url];
    }
}
