// import Game from "./classes/game";

// const game = new Game()

// EVENT LISTENER

// SETTINGS PANEL
const code3 = document.getElementById('code3');
const code4 = document.getElementById('code4');
const code5 = document.getElementById('code5');
const code6 = document.getElementById('code6');

const codeLength =[code3, code4, code5, code6];

const nbVar3 = document.getElementById('var3');
const nbVar4 = document.getElementById('var4');
const nbVar5 = document.getElementById('var5');
const nbVar6 = document.getElementById('var6');
const nbVar7 = document.getElementById('var7');

const chrono = document.getElementById('chrono');
// MOVE CONTROLS 
const startGame = document.getElementById('start');
const lastMove = document.getElementById('lastMove');

const selectItems = document.querySelector('.selectItems');

// GAME BOARD
const gameRows = document.querySelectorAll('#gameGrid .row')


// Create game board according to player selection
codeLength.forEach( button => {
    button.onclick = (e) => createBoard(e);
})
// codeLength.forEach( button => {
//     button.onclick = (e) => console.log(e);
// })
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
}