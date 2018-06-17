export default class Form {
    constructor() {
        this.popup = document.querySelector('#popup');
        this.magic = document.querySelector('#magic');
        this.formId = document.querySelector('#form');
        this.divTable = document.querySelector('.table-wrapper');

        this.form = document.createElement('form');
        this.inputText = document.createElement('input');
        this.inputSubmit = document.createElement('input');
        this.h2 = document.createElement('h2');
        this.p = document.createElement('p');
        this.div = document.createElement('div');
        this.button = document.createElement('button');
        this.table = document.createElement('table');
        this.tbody = document.createElement('tbody');
        this.tr = document.createElement('tr');
        this.tdName = document.createElement('td');
        this.tdLevel = document.createElement('td');

        this.btnFire = document.createElement('button');
        this.btnIce = document.createElement('button');
        this.btnWater = document.createElement('button');
        this.btnSoil = document.createElement('button');
        this.btnHealth = document.createElement('button');

        this.text_h2 = document.createTextNode('Hi, Hero');
        this.text_p = document.createTextNode('Save the magical world from monsters!');
        this.textGo = document.createTextNode('GO');
        this.text = document.createTextNode('RESTART');
    }

    createFormUser() {
        this.form.setAttribute('id', 'users');
        this.form.classList.add('users');
        this.inputText.setAttribute('type', 'text');
        this.inputText.setAttribute('placeholder', 'Name...');
        this.inputText.setAttribute('id', 'name');
        this.inputSubmit.setAttribute('type', 'submit');
        this.inputSubmit.setAttribute('value', 'Send');

        this.popup.appendChild(this.form);
        this.form.appendChild(this.h2);
        this.h2.appendChild(this.text_h2);
        this.form.appendChild(this.p);
        this.p.appendChild(this.text_p);
        this.form.appendChild(this.inputText);
        this.form.appendChild(this.inputSubmit);
    }

    createButtonGo() {
        this.button.classList.add('button-go');

        this.popup.appendChild(this.button);
        this.button.appendChild(this.textGo);
    }

    clearFormUser() {
        this.popup.innerHTML = '';
    }

    creatPopupMagic() {
        this.textFire = document.createTextNode('Fire');
        this.textIce = document.createTextNode('Ice');
        this.textWater = document.createTextNode('Water');
        this.textSoil = document.createTextNode('Soil');
        this.textHealth = document.createTextNode('+10');

        this.magic.appendChild(this.btnFire);
        this.btnFire.appendChild(this.textFire);

        this.magic.appendChild(this.btnIce);
        this.btnIce.appendChild(this.textIce);

        this.magic.appendChild(this.btnWater);
        this.btnWater.appendChild(this.textWater);

        this.magic.appendChild(this.btnSoil);
        this.btnSoil.appendChild(this.textSoil);

        this.magic.appendChild(this.btnHealth);
        this.btnHealth.appendChild(this.textHealth);
    }

    createFormTask() {
        this.formId.classList.remove('hidden');
        this.formId.classList.add('fight');

        this.inputText.setAttribute('type', 'text');
        this.p.setAttribute('id', 'information');
        this.inputText.setAttribute('id', 'number');
        this.inputSubmit.setAttribute('type', 'submit');
        this.inputSubmit.setAttribute('value', 'Fight');

        this.formId.appendChild(this.p);
        this.formId.appendChild(this.inputText);
        this.formId.appendChild(this.inputSubmit);
    }

    clearInputFormFight() {
        const information = document.querySelector('#information');

        this.inputText.value = '';
        information.innerText = '';
        this.formId.classList.add('hidden');
    }

    createButtonRestart() {
        this.button.classList.add('button-rest');

        this.popup.appendChild(this.button);
        this.button.appendChild(this.text);
    }

    createTable() {
        let i = 0;

        this.table.classList.add('table');

        this.divTable.appendChild(this.table);
        this.table.appendChild(this.tbody);
        this.tbody.appendChild(this.tr);

        this.tr.appendChild(this.tdName);
        this.tr.appendChild(this.tdLevel);

        this.tdName.innerText = 'Name';
        this.tdLevel.innerText = 'Level';

        while (localStorage.getItem(`player${i}`) !== null) {
            const info = localStorage.getItem(`player${i}`).split(',');
            const tr = this.tbody.insertRow();

            for (let j = 0; j < 2; j += 1) {
                const td = tr.insertCell();
                td.appendChild(document.createTextNode(info[j]));
            }
            i += 1;
        }
    }
}
