export default class Game {
constructor(codeLength, variants){

    this.codeLength= codeLength;
    this.variants= variants;
    this.moves=[];
    this.secretCode=null;
    
}

createBoard();
codeGenerator();
checker();
}