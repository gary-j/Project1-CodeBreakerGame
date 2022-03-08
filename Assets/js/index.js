import Game from "./classes/game.js";
// import shuffle from "./shuffle.js";
import {shuffle} from './shuffle.js';

const game = new Game();

// EVENT LISTENER

// SETTINGS PANEL
const settingsPanel = document.querySelector('.container .settings');
const code3 = document.getElementById('code3');
const code4 = document.getElementById('code4');
const code5 = document.getElementById('code5');
const code6 = document.getElementById('code6');

const codeLength =[code3, code4, code5, code6];

const nbItem3 = document.getElementById('item3');
const nbItem4 = document.getElementById('item4');
const nbItem5 = document.getElementById('item5');
const nbItem6 = document.getElementById('item6');
const nbItem7 = document.getElementById('item7');
const numOfItems = [nbItem3, nbItem4, nbItem5, nbItem6, nbItem7];

const chrono = document.getElementById('chrono');
// MOVE CONTROLS 
const startBtn = document.getElementById('start-stop');
const lastMove = document.getElementById('lastMove');

const selectItems = document.querySelector('.selectItems');

// ARRAYS OF CODE 
const arrayCode = [];
const arrayToCheck = [];

//
let codeValue = 0;
let itemsValue = 0;

// S E T _ T H E _ G A M E _ B O A R D
const gameRows = document.querySelectorAll('#gameGrid .row');
//code length
codeLength.forEach( button => {
    button.addEventListener('click', (e)=> createBoard(e))
});
// codeLength.forEach( button => {
//     button.addEventListener('click', (e) => console.log(e));
// });
function createBoard(e){
    let i = e.target.value;
    gameRows.forEach(row => {
        row.classList = (`row nbCol-${i}`);
        row.innerHTML = '';

    // - Je crée les colonnes (cellules)
        for (let j = 0; j<i; j++){
          let newCell = document.createElement('div');
          newCell.classList.add('cell');
          row.appendChild(newCell);
        }
    })
    console.log(` ${i} à été ajouté !`);

    // return for the code generator
    codeValue = i;
    console.log(codeValue, 'code value');
    return codeValue;
}

// numb of variant
numOfItems.forEach( button => {
    button.addEventListener('click', (e) => itemsBoardValue(e)) ;
});
function itemsBoardValue(e){

    selectItems.innerHTML='';
    let x = e.target.value;
    let divs =[];

    for (let j=0; j<x; j++){
       let newItem = document.createElement('div');
       newItem.classList.add('item-btn');
       newItem.classList.add(`item-${j}`);
       newItem.setAttribute('id',`item-${j}`)
       newItem.setAttribute('value',`'${j}'`);

    // I don't appendChild the <div> I shuffle them after loop
    //    selectItems.appendChild(newItem);
    //    newItem.addEventListener('click', (e)=> console.log(e));
       console.log(newItem, 'new item');
       divs.push(newItem);
    }
    // I shuffle the <div> display order
    let shuffledItems = shuffle(divs);

    shuffledItems.forEach(elem => {
        selectItems.appendChild(elem);
    // I add the event listener;
       elem.addEventListener('click', (e)=> console.log(e));
    });
    // I empty the divs array
    divs=[];
    
    // return for the code generator
    itemsValue = x;
    console.log(itemsValue, 'item value');
    return itemsValue;
}



// C O D E _ G E N E R A T O R
// with Fisher Yates Shuffle
function codeGen(codeValue, itemsValue){

// console.log(codeValue, itemsValue, 'code gen bien reçue');

let i = codeValue;
let x = itemsValue;
for(let j=0; j<i; j++){
    arrayCode.push(Math.floor(Math.random()*x));
}
    // console.log(arrayCode);
    // return arrayCode
}

// S T A R T _ G A M E
startBtn.addEventListener('click',()=> {
    if(codeValue && itemsValue){
        let i = codeValue;
        let x = itemsValue;
        // console.log(i, x, 'ouais c\'est bon');
        startGame(i,x);
    }else{
        // throw console.error('please select a code length');
        // displayError()
        // or launch the game with default parameters
        return
    }
} );

function startGame(i, x){
//    console.log(i, x, 'de startgame');
    if(startBtn.classList.contains('start')){

        settingsPanel.style.display='none';
        startBtn.textContent='RESET';
        startBtn.classList.remove('start')
        startBtn.classList.add('reset');
        codeGen(i, x);
    } else{
        settingsPanel.style.display='contents';
        startBtn.textContent='START GAME';
        startBtn.classList.remove('reset')
        startBtn.classList.add('start');
        selectItems.innerHTML='';
        arrayCode.splice(0, arrayCode.length);
        console.log(arrayCode, 'tableau vidé');
    }
}

// P L A Y E R _ C O D E
function play(){

}