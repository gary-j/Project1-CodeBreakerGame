// import rowPlayerTry from './index.js';
import { tryCounter, codeValue, gridPlayerTry } from './index.js';

function createTryRow(){

    console.log('APPEL CREATEROW OK');
    // create the row
   let rowPlayerTry=document.createElement('div');
   rowPlayerTry.setAttribute('id',`playerTry${tryCounter}`);
   rowPlayerTry.setAttribute('value',`${tryCounter}`);
   rowPlayerTry.classList.add('row','playerTry',`try-${tryCounter}`,'hidden');

   let i = codeValue;
  
    // create cells inside the row
    for (let j=0; j<=i; j++){

        if(j===+i){
            let diodeCell = document.createElement('div');
                diodeCell.classList.add('checker');
                diodeCell.setAttribute('id',`try-${tryCounter}`);
            // Pour les diodes insides checker cell
            for(let diodes=0; diodes<i; diodes++){
                let diode = document.createElement('div');
                diode.classList.add('diode', `diode-${diodes}`);
                diode.setAttribute('id',`diode-${diodes}`),
                diode.setAttribute('value',`${diodes}`); 
                diodeCell.appendChild(diode);    
            }
            allDiodesArray.push(diodeCell);
            rowPlayerTry.appendChild(diodeCell);

            } else{

                let newCell = document.createElement('div');
                newCell.setAttribute('value',`${j}`);
                newCell.classList.add('cell');
                rowPlayerTry.appendChild(newCell);
            }
    }

    // insert the row in the board. //css column-reverse
    gridPlayerTry.appendChild(rowPlayerTry);
    // console.log(rowPlayerTry, 'de create Row');

    return rowPlayerTry;
}

export{createTryRow};
