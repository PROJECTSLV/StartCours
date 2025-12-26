// однострочный комментарий

/* многострочный ctrl + / 
*/

let number = 5;
let $tring = 'Sorry';
const floatNumber = 10.5;
const string = 'Мы вам перезвоним...';
const sym = Symbol();
const boolean = true;
let typeUndefined;
const typeNull = null;
const object = {};
const arr = [];
const func = function() {};


const item = '<article class="item"> Дайте мне больше джунов!!! (meedle) </article>';

const item2 = '<article class = "item">' +
                'Их нет у меня)  (senior)' +
                '</article>';

                console.log(item2);

const item3 = `
    <article class="item">
        Я могу вам помочь? (junior)
    </article>
`;
console.log(item3)


const item4= `
    <article class="item">
        <h2>Не думаю... (meedle)</h2>
        <h2>Вообще нет! ${string}(senior)</h2>
    </article>
`;
console.log(item3)

console.log(item);

console.log(item4)

console.log(typeof number);
console.log(typeof $tring);
console.log(typeof floatNumber);
console.log(typeof arr);