import {shuffle} from './shuffle.js';
import {createTryRow} from './createTryRow.js';
// import {colorizer} from './colorizer.js';


// EVENT LISTENER _ SETTINGS PANEL
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
let shuffledItems = [];
const arrayToCheck = [];
let tryCounter = 0;
let previousRow = [];
let currentRow = []
// export default {tryCounter}; // for createTryRow

//
let codeValue = 0;
let itemsValue = 0;
let maxClickAllowed = 0;
let clickCounter = 0
let cellsPlayer = [];
//
allDiodesArray =[];

export { tryCounter, codeValue, gridPlayerTry, clickCounter, maxClickAllowed, allDiodesArray};


// G A M E _ B O A R D _ E L E M E N T
const gameRows = document.querySelectorAll('#gameGrid .row');
const rowSecretCode = document.getElementById('secretCode');
const gridPlayerTry = document.getElementById('gridPlayerTry');

const playerCode = document.querySelector('#playerCode');
//code length
codeLength.forEach( button => {
    button.addEventListener('click', (e)=> createBoard(e))
});
// codeLength.forEach( button => {
//     button.addEventListener('click', (e) => console.log(e));
// });

// R E S E T _ F U N C T I O N
function reset(){
    arrayCode = [];
    shuffledItems = [];
    arrayToCheck = [];
    tryCounter = 0;

    codeValue = 0;
    itemsValue = 0;
    maxClickAllowed = 0;
    clickCounter = 0
    cellsPlayer = [];

    playerCode.innerHTML=''
}
function rowReset(){
    clickCounter = 0;
    arrayToCheck.splice(0,arrayToCheck.length);

}

// S E T _ T H E _ G A M E _ B O A R D
function createBoard(e){
    let i = e.target.value;
    codeValue = e.target.value;
    maxClickAllowed = Number(i);
    cellsPlayer =[];
    playerCode.innerHTML='';
    gridPlayerTry.innerHTML='';
    tryCounter=0;

    // console.log(maxClickAllowed, '  clicks allowed');

    // set secretCode row
    rowSecretCode.classList=(`row nbCol-${i}`)
    rowSecretCode.innerHTML='';

    for (let j=0; j<=i; j++){

        if(j===+i){
            let diodeCell = document.createElement('div');
                diodeCell.classList.add('checker');
                diodeCell.setAttribute('id','secretChecker');
    
            rowSecretCode.appendChild(diodeCell);

            } else{

                let newCell = document.createElement('div');
                newCell.setAttribute('value',`${j}`);
                newCell.classList.add('cell');
                rowSecretCode.appendChild(newCell);
            }
    }

    // set try row (hidden. to be revealed if wrong code)
    currentRow = createTryRow();

    // set PlayerCode row
    for(let c=0; c<i; c++){
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('value',`${c}`);
        cell.setAttribute('id',`${c}`)
        // playerCode.appendChild(cell);
        cellsPlayer.push(cell);
    }
    cellsPlayer.forEach(elem => {
        playerCode.appendChild(elem);
    // I add the event listener;
        // elem.addEventListener('click', effacer la case);
    });
    
    console.log(` ${i} à été ajouté !`);

    // return for the code generator
    codeValue = i;
    console.log(codeValue, 'code value');
    return codeValue;
}

// set numb of variant
numOfItems.forEach( button => {
    button.addEventListener('click', (e) => itemsBoardValue(e)) ;
});

function itemsBoardValue(e){
    // reset
    selectItems.innerHTML='';
    shuffledItems = [];
    let divs =[];

    let x = e.target.value;

    for (let j=0; j<x; j++){
       let newItem = document.createElement('div');
       newItem.classList.add('item-btn');
       newItem.classList.add(`item-${j}`);
       newItem.setAttribute('id',`item-${j}`)
       newItem.setAttribute('value',`${j}`);

    // I don't appendChild the <div>  yet
    //I shuffle them after loop

    //    selectItems.appendChild(newItem);
    //    newItem.addEventListener('click', (e)=> console.log(e));

       console.log(newItem, 'new item');
       divs.push(newItem);
    }

    // I shuffle the <div> display order
    // with Fisher Yates Shuffle
    shuffledItems = shuffle(divs);

    shuffledItems.forEach(elem => {
        selectItems.appendChild(elem);
    // I add the event listener;
    //    elem.addEventListener('click', (e)=> console.log(e));
        elem.addEventListener('click', (e)=> play(e));
    });

    // I empty the divs array
    divs=[];
    
    // return for the code generator
    itemsValue = x;
    console.log(itemsValue, 'item value');
    // console.log(shuffledItems, 'shuffle items array');
    return itemsValue;
}



// C O D E _ G E N E R A T O R
function codeGen(codeValue, itemsValue){

// console.log(codeValue, itemsValue, 'code gen bien reçue');

let i = codeValue;
let x = itemsValue;
for(let j=0; j<i; j++){
    arrayCode.push(Math.floor(Math.random()*x));
}
    console.log(arrayCode,'le code généré');
    return arrayCode
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
        // Clear Board
        selectItems.innerHTML='';
        rowSecretCode.innerHTML='';
        // rowPlayerTry.innerHTML='';
        playerCode.innerHTML='';
        // Reset
        arrayCode.splice(0, arrayCode.length);
        shuffledItems = [];
        clickCounter = 0;
        tryCounter=0;

        console.log(arrayCode, 'tableau vidé');
    }
}

// P L A Y E R _ C O D E

function play(e){
    let btn = e;
    let btnValue = btn.target.attributes.value.textContent;
    console.log(clickCounter, 'avant exec');
    console.log(maxClickAllowed, 'click max');
    
    // Controle du nombre de clique
    if(clickCounter < maxClickAllowed){
        // coloring the cell
        playerCode.children[clickCounter].classList.add(`item-${btnValue}`);
        //
        gridPlayerTry.children[tryCounter].children[clickCounter].classList.add(`item-${btnValue}`);
        // change its value for the checker
        playerCode.children[clickCounter].setAttribute('value',`${btnValue}`);
        // Save move + ArraytoCheck
        arrayToCheck.push(Number(playerCode.children[clickCounter].getAttribute('value')));

        clickCounter++; 
        console.log(clickCounter, 'compteur click actuel');

        console.log(arrayToCheck, 'check this array');
        console.log(arrayCode, 'avec ce code');

       
        // Call the check
        if(clickCounter === maxClickAllowed){
            tryCounter++;
            console.log(tryCounter, 'compteur row essai');
            checker(arrayToCheck);
        } 
    }
}

// C R E A T E _ C H E C K E R

function checker(arrayToCheck){
    console.log('Appel checker ok !');
    //security :p
    if((arrayToCheck.length !== arrayCode.length) || !arrayToCheck || !arrayCode){
        return
    }
    //
    let copyCheck=[...arrayToCheck];
    let copyRealCode=[...arrayCode];
    // let actualRow = document.getElementById('try')
    //
    let lesDiodes = document.querySelectorAll('.diode');
    console.log(lesDiodes, 'les diodes');
    let countPerfect = 0;
    let countExist = 0;
    let countNone = 0;

    // 1. P E R F E C T - Does it exist at the right place? 
    
    copyCheck.forEach((elem, i) => {
        console.log('tour:', i, '1ere boucle');

        if(elem === arrayCode[i]){
            copyCheck.splice(i,1,'!');
            copyRealCode.splice(i,1,'!');
            countPerfect++;

            console.log('BINGO', elem, 'correct', arrayCode,' :code', copyCheck,' :copyCheck');        
        }
    });
    // Add 'perfect' class to diodes
    for(let a=0; a<countPerfect; a++){
        lesDiodes[a].classList.add('perfect');
    }
    console.log(copyCheck, 'copycheck après PERFECT');
    console.log(copyRealCode, 'copyRealCode après PERFECT');

    
   // 2. E X I S T ? - Wrong place but exist.

    // Sort the arrays
    copyCheck.sort();
    copyRealCode.sort();
    console.log(copyCheck, 'copycheck sorted');
    console.log(copyRealCode, 'copyRealCode sorted');

    copyCheck.forEach((elem, i) => {
        // Compare the existing pair 'exist'
      
        if(typeof(elem)==='number' && elem === copyRealCode[i]){ 
            countExist++;

            // Optional
            copyCheck.splice(i,1,'?');
            copyRealCode.splice(i,1,'?');
        }
        
    });
    console.log(copyCheck, 'copycheck after \'EXIST\'');
    console.log(copyRealCode, 'copyRealCode after \'EXIST\'');

    // Add class 'exist'
    countNone = arrayCode.length - (countPerfect+countExist);
    // console.log(countNone, 'countNone class');

    for(let a=countPerfect; a<(arrayCode.length-countNone); a++){
        lesDiodes[a].classList.add('exist');
    }
   
    // Add class 'none'
    for(let a=(countPerfect+countExist); a<arrayCode.length; a++){
        lesDiodes[a].classList.add('none');
    }
    
    console.log(lesDiodes, 'les diodes avec classes');

    // IF GOOD => set checker cell diode => Win()
    if(countPerfect === arrayCode.length){
        console.log('YOU A CRACK ! ACCESS GRANTED');
        // win();
        //reset
        reset();
    }else{   
    // IF WRONG => set checker cell diode => createRowTry()
       
        currentRow.classList.remove('hidden');
        previousRow = currentRow;
        currentRow = createTryRow();
        // createTryRow();

        //reset for new row
        rowReset();
    }
}

