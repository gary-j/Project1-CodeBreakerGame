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
const gameControls = document.getElementById('gameControls');
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
export { tryCounter, codeValue, gridPlayerTry, clickCounter, maxClickAllowed};


// G A M E _ B O A R D _ E L E M E N T
const gameRows = document.querySelectorAll('#gameGrid .row');
const rowSecretCode = document.getElementById('secretCode');
const gridPlayerTry = document.getElementById('gridPlayerTry');

const playerCode = document.querySelector('#playerCode');
//code length
codeLength.forEach( button => {
    button.addEventListener('click', (e)=> createBoard(e.target.value))
});
// codeLength.forEach( button => {
//     button.addEventListener('click', (e) => console.log(e));
// });

// R E S E T _ F U N C T I O N
function resetBtn(){
    gridPlayerTry.innerHTML='';
}

function reset(){
    arrayCode.splice(0, arrayCode.length);
    shuffledItems = [];
    arrayToCheck.splice(0, arrayToCheck.length);

    tryCounter = 0;
    clickCounter = 0
    cellsPlayer = [];

    selectItems.innerHTML='';
    // rowSecretCode.innerHTML='';
    // gridPlayerTry.innerHTML='';
    // playerCode.innerHTML=''
}
function rowReset(){
    clickCounter = 0;
    arrayToCheck.splice(0,arrayToCheck.length);
    // playerCode.

}

// S E T _ T H E _ G A M E _ B O A R D
function createBoard(codeCount){
    codeValue = codeCount;
    maxClickAllowed = Number(codeCount);
    cellsPlayer =[];
    playerCode.innerHTML='';
    gridPlayerTry.innerHTML='';
    tryCounter=0;

    // console.log(maxClickAllowed, '  clicks allowed');

    // set secretCode row
    rowSecretCode.classList=('row','secretCode')
    rowSecretCode.innerHTML='';

    for (let j=0; j<=maxClickAllowed; j++){

        if(j===maxClickAllowed){
            let diodeCell = document.createElement('div');
                diodeCell.classList.add('checker','cell',`col-${codeCount}`);
                diodeCell.setAttribute('id','secretChecker');
                diodeCell.textContent='checker';
    
            rowSecretCode.appendChild(diodeCell);

            } else{

                let newCell = document.createElement('div');
                newCell.setAttribute('value',`${j}`);
                newCell.classList.add('cell',`col-${codeCount}`);
                newCell.textContent='?';
                rowSecretCode.appendChild(newCell);
            }
    }

    // set try row (hidden. to be revealed if wrong code)
    currentRow = createTryRow();

    // set PlayerCode row
    playerCode.classList=('row','playerCode');
    playerCode.innerHTML='';
    for(let c=0; c<maxClickAllowed; c++){
        let cell = document.createElement('div');
        cell.classList.add('cell',`col-${codeCount}`);
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
    
    // console.log(` ${maxClickAllowed} ?? ??t?? ajout?? !`);

    // return for the code generator

    // console.log(codeValue, 'code value');
    return codeValue;
}

// set numb of variant
numOfItems.forEach( button => {
    button.addEventListener('click', (e) => itemsBoardValue(e.target.value)) ;
});

function itemsBoardValue(variantCount){
    // reset
    selectItems.innerHTML='';
    shuffledItems = [];
    let divs =[];

    //Ajout du titre 'select'variant
    let divTitle = document.createElement('div');
    divTitle.classList.add('div-title', 'row','col-1');
    let title = document.createElement('h3');
    title.classList.add('title');
    title.textContent='Select Items';
    divTitle.appendChild(title);
    selectItems.appendChild(divTitle);

    // container for items
    let itemsContainer=document.createElement('div');
    itemsContainer.classList.add('div-items','row','col-1');
    selectItems.appendChild(itemsContainer);

    // create each items according to variantCount
    for (let j=0; j<variantCount; j++){
       let newItem = document.createElement('div');
       newItem.classList.add('item-btn', `item-${j}`,'cell',`col-${variantCount}`);
       newItem.setAttribute('id',`item-${j}`);
       newItem.setAttribute('value',`${j}`);

    // I don't appendChild the <div>  yet
    // I shuffle them after loop
    // selectItems.appendChild(newItem);
    // newItem.addEventListener('click', (e)=> console.log(e));

       divs.push(newItem);
    }

    // I shuffle the <div> display order
    // with Fisher Yates Shuffle
    shuffledItems = shuffle(divs);

    shuffledItems.forEach(elem => {
        itemsContainer.appendChild(elem);
    // I add the event listener;
    //    elem.addEventListener('click', (e)=> console.log(e));
        elem.addEventListener('click', (e)=> play(e));
    });

    // I empty the divs array
    divs=[];
    
    // return for the code generator
    itemsValue = variantCount;

    return itemsValue;
}



// C O D E _ G E N E R A T O R
function codeGen(codeValue, itemsValue){

// console.log(codeValue, itemsValue, 'code gen bien re??ue');

let i = codeValue;
let x = itemsValue;
for(let j=0; j<i; j++){
    arrayCode.push(Math.floor(Math.random()*x));
}
    console.log(arrayCode,'le code g??n??r??');
    return arrayCode
}

// S T A R T _ G A M E
startBtn.addEventListener('click',()=> {
    // if(codeValue && itemsValue){
        let i = codeValue;
        let x = itemsValue;
        // console.log(i, x, 'ouais c\'est bon');
        startGame(i,x);

} );

function startGame(codeCount, variantCount){
//    console.log(i, x, 'de startgame');
    if(startBtn.classList.contains('start')){
        itemsBoardValue(variantCount);
        createBoard(codeCount);

        settingsPanel.style.display='none';
        startBtn.textContent='RESET';
        startBtn.classList.remove('start')
        startBtn.classList.add('reset');
        codeGen(codeCount, variantCount);
    } else{
        settingsPanel.style.display='contents';
        startBtn.textContent='START GAME';
        startBtn.classList.remove('reset')
        startBtn.classList.add('start');

        rowReset();
        resetBtn();
        reset();

        // console.log(arrayCode, 'tableau vid??');

    }
}

// P L A Y E R _ C O D E

function play(e){
    let btn = e;
    let btnValue = btn.target.attributes.value.textContent;

    // console.log(clickCounter, 'avant exec');
    // console.log(maxClickAllowed, 'click max');
    
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

        // console.log(clickCounter, 'compteur click actuel');

        console.log(arrayToCheck, 'check this array');
        console.log(arrayCode, 'avec ce code');

    }
       
        // Call the check
        if(clickCounter === maxClickAllowed){
            // Effacer playerCode
            for(let i=0; i<codeValue; i++){
                for(let j=0; j<itemsValue; j++){

                    playerCode.children[i].classList.remove(`item-${j}`);
                }
            }

            //augmenter le compteur d'essai
            tryCounter++;
            // console.log(tryCounter, 'compteur row essai');

            // Appel du checker
            checker(arrayToCheck);

           
        } 
}

// C R E A T E _ C H E C K E R

function checker(arrayToCheck){
    // console.log('Appel checker ok !');
    //security :p
    if((arrayToCheck.length !== arrayCode.length) || !arrayToCheck || !arrayCode){
        return
    }
    //
    let copyCheck=[...arrayToCheck];
    let copyRealCode=[...arrayCode];

    // console.log(tryCounter, 'trycounter');

    let lesDiodes = document.querySelectorAll(`#playerTry${tryCounter-1} .diode`);
    // console.log(lesDiodes);
    let countPerfect = 0;
    let countExist = 0;
    let countNone = 0;

    // 1. P E R F E C T - Does it exist at the right place? 
    
    copyRealCode.forEach((elem, i) => {
        // console.log('tour:', i, '1ere boucle');

        if(elem === copyCheck[i]){
            countPerfect++;
            copyCheck.splice(i,1,'!');
            copyRealCode.splice(i,1,'!');

            // console.log('BINGO', elem, 'correct', arrayCode,' :code', copyCheck,' :copyCheck');        
        }
    });

    // 2. E X I S T ? - Wrong place but exist.

    // Sort the arrays
    copyCheck.sort();
    copyRealCode.sort();
    console.log(copyCheck, 'copycheck sorted');
    console.log(copyRealCode, 'copyRealCode sorted');

    copyRealCode.forEach((elem, i) => {
        // Compare the existing pair 'exist'
      
        if(typeof(elem)==='number' && elem === copyCheck[i]){ 
            countExist++;

            copyCheck.splice(i,1,'?');
            copyRealCode.splice(i,1,'?');

            console.log('Pair Existing ?', countExist);
        }
        
    });
    // check if item is included and occurances
   copyRealCode.forEach( (elem,i) =>{
        if(!copyCheck.includes(elem) && typeof(elem)==='number'){
            copyRealCode.splice(i,1,elem) 
            countNone++
        }
        console.log(copyRealCode, 'splice copyRealcode, non inclus');
        console.log(copyCheck, 'splice copyCheck, non inclus');
        if(typeof(elem)==='number'){
            let occurRealCode = copyRealCode.filter(x=>x===elem).length;
            let occurCopyCheck = copyCheck.filter(x=>x===elem).length;
            console.log(occurRealCode, 'OCCUR REAL CODE', occurCopyCheck, 'Occur copyCheck');
            
            if(occurRealCode===occurCopyCheck){
                countExist+=occurRealCode;
            }else if(occurRealCode > occurCopyCheck) {
                countExist += occurCopyCheck;
            }else if(occurRealCode < occurCopyCheck){
                countExist+= occurRealCode;
            }else{
                return; // bug
            }
        }   
        
   })

   console.log('AVANT AJOUT CLASSES',countPerfect, ': perfect', countExist, ' :exist', countNone, ':none');

    // A D D I N G _ C L A S S E S _ T O _ D I O D E

    // Add 'perfect' class to diodes
     for(let a=0; a<countPerfect; a++){
        lesDiodes[a].classList.add('perfect');
    }
    // console.log(copyCheck, 'copycheck apr??s PERFECT');
    // console.log(copyRealCode, 'copyRealCode apr??s PERFECT');
    // console.log(lesDiodes, 'les diodes avec classes');

    // Add 'exist' class to diode
    // countNone = arrayCode.length - (countPerfect+countExist);

    for(let a=countPerfect; a<(arrayCode.length-countNone); a++){
        lesDiodes[a].classList.add('exist');
    }
    
    // console.log(countNone, 'countNone class');
    // Add 'none'. class to be fixed
     for(let a=(countPerfect+countExist); a<arrayCode.length; a++){
        lesDiodes[a].classList.add('none');
    }
    
    // IF GOOD => set checker cell diode => Win()
    if(countPerfect === arrayCode.length){
        currentRow.classList.remove('hidden');

        // let winGame = ()=> window.alert('YOU A CRACK ! ACCESS GRANTED !');
       setTimeout(()=> window.alert('YOU A CRACK ! ACCESS GRANTED !'), 500);
    
        // console.log('YOU A CRACK ! ACCESS GRANTED !');
        // win();
        //reset
    }else{   
    // IF WRONG => set checker cell diode => createRowTry()
    // console.log(currentRow, 'current row');

        currentRow.classList.remove('hidden');
        previousRow = currentRow;
        currentRow = createTryRow();
        //reset for new row
        rowReset();
    }
}

