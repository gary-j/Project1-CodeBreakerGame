/* F I S H E R _ Y A T E S _ S H U F F L E - by Gary :p */

function shuffle(array){
    console.log('Array length of ',array, ' is ',array.length);

    if (!array.length){
        console.log('tableau vide, la fonction s\'arrete');
        return;
    }

    let arrayCopy = [...array];
    let result = [];
    let i=1
    while(arrayCopy.length){ // 1.
        // console.log('roll n° :', i);
        // console.log(arrayCopy, 'after splice');
        // 2.
        let pickShuffle = Math.floor(Math.random()* arrayCopy.length)
        // console.log('N° ', pickShuffle, ' is ', arrayCopy[pickShuffle]);
        // 3-4.a
        result.unshift(arrayCopy[pickShuffle]);
        // console.log(result, 'New shuffled array');
        // 4.b
        arrayCopy.splice(pickShuffle,1)
        i++;
    }
    console.log('The original array is ', array);
    console.log('The suffled array is ', result);
    return result;
    console.log('import shuffle ok');
}

export{shuffle};
