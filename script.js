


const uiFlow = (function (){

    if(document.getElementById("gameModeSelection")){
        // ui
        const multiplayerButton = document.querySelector("#multiplayer");
        const singleplayerButton = document.querySelector("#singleplayer");
        const dialog = document.querySelector("#dialog");
        const singlePlayerDialog = document.querySelector("#single-mode");

        
        let mode;
        let playerTwo;
        let playerOne;

        singleplayerButton.addEventListener("click",()=>{
            mode = "Single Player";

            singlePlayerDialog.showModal();

            const playerOneInput = singlePlayerDialog.querySelector("#single-mode-player-name");
            const close = document.querySelector("#Cancel");
            const submit = singlePlayerDialog.querySelector("#submit");
            let playerOneMarker;
            let computerMarker;

            close.addEventListener("click",()=>{
                playerOneInput.value = "";
                singlePlayerDialog.close();
            })

 
            submit.addEventListener("click",()=>{

                playerOneName = playerOneInput.value;
                playerTwoName = "Computer";
                playerOneInput.value = "";
                // getting the input from the selector
                sides = document.getElementsByName("single-player-side-selection");
                if(sides[0].checked){
                    playerOneMarker = "x";
                    computerMarker = "o";
                }
                else{
                    playerOneMarker = "o";
                    computerMarker = "x";
                }

                playerOne = {"name":playerOneName , "marker":playerOneMarker}
                playerTwo = {"name":"Computer" , "marker":computerMarker}

                console.log(playerOne,playerTwo);
                // redirect to new page 
                window.open("/pages/game.html","_self")
                singlePlayerDialog.close()
                gameRounds(mode,playerOne,playerTwo)
                
                
                })


        })
            
        multiplayerButton.addEventListener("click",()=>{

            mode = "Multi Player";
            
            dialog.showModal();

            const close = dialog.querySelector("#Cancel");
            close.addEventListener("click",()=>{
                playerOneInput.value = "";
                playerTwoInput.value = "";
                dialog.close();
            })

            const submit = dialog.querySelector("#submit");
            submit.addEventListener("click",()=>{
                const playerOneInput = dialog.querySelector("#player-one-name");
                const playerTwoInput = dialog.querySelector("#player-two-name");

                const playerXName = playerOneInput.value;
                const playerOName = playerTwoInput.value;

                playerOne = {"name":playerXName , "marker":"x"};
                playerTwo = {"name":playerOName , "marker":"o"};

                playerOneInput.value = "";
                playerTwoInput.value = "";

                // redirect to new page 
                dialog.close();
                
                
                gameRounds(mode,playerOne,playerTwo);

                

                
                })

            })
    } 



    
})();





function computerguess(array,cpSide){
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
    for(i=0;i<8;i++){
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

        }
        
     }
    for(let i = 0 ; i<8; i++){
        if( (y.includes(array[wincases[i][0]]) && y.includes(array[wincases[i][1]]) )||( y.includes(array[wincases[i][0]]) && y.includes(array[wincases[i][2]]) ) || ( y.includes(array[wincases[i][2]]) && y.includes(array[wincases[i][1]]) ) ) {

            if(y.includes(array[wincases[i][0]]) && y.includes(array[wincases[i][1]]) && y.includes(array[wincases[i][2]])){
                continue;
            }

            else if( (pSide == array[wincases[i][0]] && pSide == array[wincases[i][1]] )|| (pSide == array[wincases[i][0]] && pSide == array[wincases[i][2]] ) || (pSide == array[wincases[i][2]] && pSide == array[wincases[i][1]] ) ){
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




function gameRounds(mode, playerOne, playerTwo){
    window.open("/pages/game.html","_self");
    
    const playerOneMarker= playerOne.marker;  // whether 1st player is x or o
    const playerTwoMarker= playerTwo.marker;  // whether 2nd player is x or o
    console.log(playerOneMarker,playerTwoMarker)

    let gameboard = [];
    for(let i = 0 ; i<= 8 ; i++){
        gameboard[i] = i;
    }
    
    let gameBoardNodeList = document.querySelectorAll(".box");
    
    let gameEndMessage = "";
    
    
    let roundNumber = 0;

    input(roundNumber)
    function input(round){
        if(gameEndMessage.includes("wins") | gameEndMessage.includes("draw")){
            round = 0;
            // return alert(gameEndMessage);
        }
        if(round%2 == 0){
            if(mode == "Single Player"){
                let inputTwo = computerguess(gameboard,playerTwoMarker);
                if(gameboard[inputTwo]==="x" | gameboard[inputTwo] === "o"){
                    return input(round);
                }
                else{
                    gameBoardNodeList[inputTwo].innerHTML = playerTwoMarker;
                    gameboard[inputTwo]= playerTwoMarker;
                    round++;
                    gameEndMessage = isWin(round,gameboard , gameEndMessage);
                    return input(round);
                }
            }
            // else if(mode == "Multiplayer"){
                
            //     for(let i = 0; i<= 8 ; i++){
            //         if(gameboard[i]==="x" | gameboard[i] === "o"){
            //             i++;
            //             continue;
            //         }
            //         gameBoardNodeList[i].addEventListener("click", (e)=>{
                        
            //             gameBoardNodeList[i].innerHTML = playerTwoSide;
            //             gameboard[i]= playerTwoSide;
            //             round++;
            //             gameEndMessage = isWin(round,gameboard , gameEndMessage)
            //             return input(round);
            //         })
            //     }
            // }   

        }
        else if(round === 9){
            isWin(round,gameboard , gameEndMessage)
        }
        
        else if(round%2 === 1){
            let inputOne = prompt("enter the number");
            gameBoardNodeList[inputOne].innerHTML = playerOneMarker;
            gameboard[inputOne] = playerOneMarker;
            round++;
            gameEndMessage = isWin(round,gameboard , gameEndMessage)
            return input(round)
            
            // for(let i = 0; i<= 8 ; i++){
            //     if(gameboard[i]==="x" | gameboard[i] === "o"){
            //         continue;
            //     }
            //     gameBoardNodeList[i].addEventListener("click",(e)=>{
            //         console.log(e)
            //         console.log(`click ${round}`)
            //         gameBoardNodeList[i].innerHTML = playerOneSide;
            //         gameboard[i]= playerOneSide;
            //         gameEndMessage = isWin(round,gameboard , gameEndMessage)
            //         round++;
            //         return input(round);

            //     })


            // } 

        }
    }

}


function isWin (k , gameboard , gameEndMessage) {
 
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
    return gameEndMessage;
    }
    else{
        return gameEndMessage="";
    }
}


function changeDisplay(message){
    console.log(message);
    let rollingDisplay = document.querySelector("#marqee-display");
    rollingDisplay.innerHTML = message ;

}


