function playerSelection ( playerOne) {
    //function to select the side (x/o) of the player
    //returns the side of the 2nd player automaticlly
    playerOne = playerOne.toLowerCase();
    if(playerOne === 'x' || playerOne === 'o' ){
        let player1 = playerOne;
        let player2;
            if(player1 === 'x')
                {
                    player2 = 'o';
                }
            else  player2 = 'x';

        return {player1 , player2}
    }

    else{
        alert("wrong selection")
        return;
    }
    
}

function gamemode (){
    //function to select the mode multiplayer/ single player
    let mode;
    mode = prompt("Select game mode \n 1.Single Player \n 2.Multi Player")
    if(mode == 1){
        mode = "Single Player"
        return mode;
    }
    else if(mode == 2){
        mode = "Multi Player"
        return mode;
    }
    else{
        alert("Invalid Choice of Mode try again")
            return gamemode();
        
    }
}

function computerguess(k,array,cpSide){
    let wincases = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    let wincase;


    let pSide ; 
    if(cpSide == "o"){
        pSide = "x";
    }
    else{
        pSide = "o";
    }

    y = ['x','o']
    for(i=0;i<wincases.length;i++){
        if( (y.includes(array[wincases[i][0]]) && y.includes(array[wincases[i][1]]) )||( y.includes(array[wincases[i][0]]) && y.includes(array[wincases[i][2]]) ) || ( y.includes(array[wincases[i][2]]) && y.includes(array[wincases[i][1]]) ) ) {

            if(y.includes(array[wincases[i][0]]) && y.includes(array[wincases[i][1]]) && y.includes(array[wincases[i][2]])){
                continue;
            }
            else if ( (cpSide == array[wincases[i][0]] && cpSide == array[wincases[i][1]] )|| (cpSide == array[wincases[i][0]] && cpSide == array[wincases[i][2]] ) || (cpSide == array[wincases[i][2]] && cpSide == array[wincases[i][1]] ) ){
                //this else is checking if there is a chance of computer winning
                wincase = wincases[i];
                for(let j = 0 ; j<= 3 ; j++){
                    if ( array[wincase[j]] == cpSide ){
                        continue;
                    }
                    else{
                        return wincase[j];
                    }
                }
            }
            else if ( (pSide == array[wincases[i][0]] && pSide == array[wincases[i][1]] )|| (pSide == array[wincases[i][0]] && pSide == array[wincases[i][2]] ) || (pSide == array[wincases[i][2]] && pSide == array[wincases[i][1]] ) ){
                //this else is checking if there is a chance of player winning and blocking it
                wincase = wincases[i];
                for(let j = 0 ; j<= 3 ; j++){
                    if ( array[wincase[j]] == pSide ){
                        continue;
                    }
                    else{
                        return wincase[j];
                    }
                }
            }
            // else{
            //     wincase = wincases[i];
            //     for(let j = 0 ; j<= 3 ; j++){
            //         cases = y.includes(array[wincase[j]]);
            //         if ( cases ){
            //             continue;
            //         }
            //         else{
            //             return wincase[j];
            //         }
            //     }
            // }
        }
        
     }

    
        
    
                let arrayFilled = [];
                for(let f = 0; f<=8; f++){
                    //entering all the available filled cells (only of the computer)
                    if(array[f] == cpSide){
                        arrayFilled.push(f);
                    }
                }
                if(arrayFilled.length){
                    let arrayFilledWinCases = [];
        
                    for(let g = 0 ; g<wincases.length ; g++){
                        wincase = wincases[g]
                        for(let h = 0; h<3; h++){
                            
                            if( (arrayFilled[0] === wincase[h] ) || (arrayFilled[1]  === wincase[h]) || (arrayFilled[2] === wincase[h] ) ){
                                arrayFilledWinCases.push(wincase)
                            }
                        }
                    }
            
                    for(let i = 0; i<arrayFilledWinCases.length ; i++ ){
                        let possibleCellsArray = arrayFilledWinCases[i];
                        if( !pSide.includes(array[possibleCellsArray[0]])  && !pSide.includes(array[possibleCellsArray[1]]) && !pSide.includes(array[possibleCellsArray[2]])){
                            
                            for(let f = 0 ; f<3 ; f++){
                                if(array[possibleCellsArray[f]] != cpSide ){ 
                                    //this if will check whether there exist a comp icon else it will return the cell number to fill
                                    //there will be two possible cells to fill so find a way to choose a random cell from those !!!!!!!!!!
                                    return possibleCellsArray[f];
                                }
            
                            }
                        }
                    }
            
                }

    
    
    return guessACell()
    
    function guessACell(){
        let number = Math.round(Math.random()*10);
        if(number > 8){
            return guessACell();
        }
        else{
            return number;
        }
    }

    

}


const gameFlow = (function (){
    let mode = gamemode();  //to select the mode multiplayer/singleplayer
    console.log(mode);
    playerSides = playerSelection (prompt("choose player side for player one"),mode);
    
    let gameboard = [];
    for(let i = 0 ; i<= 8 ; i++){
        gameboard[i] = i;
    }

    console.log(gameboard)
    
    const playerOneSide = playerSides.player1;
    const playerTwoSide = playerSides.player2;
    let gameEndMessage = "";
    let k;

    for(k = 0 ; k<=9 ; ++k){



        if(k%2 == 0){
            let inputTwo;
            if(mode == "Single Player"){
                inputTwo = computerguess(k,gameboard,playerTwoSide); //computer returns the number of the array which needed to be filled
            }
            else{
                inputTwo = prompt(`enter the number of the array for the player ${playerTwoSide}`);
            }

            //checking whether the input is on a cell which is already filled


            if(gameboard[inputTwo]==="x" | gameboard[inputTwo] === "o"){
                --k;
                continue;
            }
            gameboard[inputTwo]= playerTwoSide;
            console.log(gameboard);
            isWin();
        }
        else if(k == 9){
            isWin(k)
        }
        else if (k%2 != 0){


            let inputOne = prompt(`enter the number of the array for the player ${playerOneSide}`);

            //checking whether the input is on a cell which is already filled


            if(gameboard[inputOne]==="x" | gameboard[inputOne] === "o"){
                alert("duplicate input");
                --k;
                continue;
            }
            gameboard[inputOne]= playerOneSide;
            console.log(gameboard);
            isWin();
        }
        

        //to stop the iteration after winning
        if(gameEndMessage.includes("wins") | gameEndMessage.includes("draw")){
            break;
        }
    }

    function isWin (k) {
 
        if (gameboard[6] === gameboard[4] && gameboard[4] === gameboard[2]){
            gameEndMessage = `${gameboard[6]} wins`
        }
        else if (gameboard[0] === gameboard[3] && gameboard[3] === gameboard[6]){
            gameEndMessage = `${gameboard[6]} wins`
        }
        else if (gameboard[1] === gameboard[4] && gameboard[4] === gameboard[7]){
            gameEndMessage = `${gameboard[7]} wins`
        }
        else if (gameboard[2] === gameboard[5] && gameboard[5] === gameboard[8]){
            gameEndMessage = `${gameboard[2]} wins`
        }
        else if (gameboard[0] === gameboard[1] && gameboard[1] === gameboard[2]){
            gameEndMessage = `${gameboard[1]} wins`
        }
        else if (gameboard[3] === gameboard[4] && gameboard[3] === gameboard[5]){
            gameEndMessage = `${gameboard[4]} wins`
        }
        else if (gameboard[6] === gameboard[7] && gameboard[7] === gameboard[8]){
            gameEndMessage = `${gameboard[6]} wins`
        }
        else if (gameboard[0] === gameboard[4] && gameboard[4] === gameboard[8]){
            gameEndMessage = `${gameboard[4]} wins`
        }
        else if(k == 9){
            gameEndMessage = `Ends in draw`
        }

        if(gameEndMessage.includes("wins") || gameEndMessage.includes("draw")){
        return alert(gameEndMessage);
        }
    }

})();




