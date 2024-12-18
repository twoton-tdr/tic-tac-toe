


const uiFlow = (function (){

    if(document.getElementById("gameModeSelection")){
        // ui
        const multiplayerButton = document.querySelector("#multiplayer");
        const singleplayerButton = document.querySelector("#singleplayer");
        const dialog = document.querySelector("#dialog");
        const singlePlayerDialog = document.querySelector("#single-mode");
        const backButton = document.querySelector("#back");
        
        let mode;
        let playerTwo;
        let playerOne;

        singleplayerButton.addEventListener("click",()=>{
            mode = "Single Player";
            const playerOne = {"name": "Player" , "marker":"x"}
            const playerTwo = {"name":"Computer" , "marker":"o"}
            gameRounds(mode,playerOne,playerTwo)
            singleplayerButton.classList.add("disabled");
            multiplayerButton.classList.add("disabled");
            backButton.classList.remove("disabled");
            restart.classList.remove("disabled")

        })
            
        multiplayerButton.addEventListener("click",()=>{

            mode = "Multi Player";
            const playerOneInput = dialog.querySelector("#player-one-name");
            const playerTwoInput = dialog.querySelector("#player-two-name");
            
            dialog.showModal();

            const close = dialog.querySelector("#Cancel");
            close.addEventListener("click",()=>{
                playerOneInput.value = "";
                playerTwoInput.value = "";
                console.log("close clicked")
                dialog.close();
            })

            const submit = dialog.querySelector("#submit");
            submit.addEventListener("click",()=>{


                const playerXName = playerOneInput.value;
                const playerOName = playerTwoInput.value;

                playerOne = {"name":playerXName , "marker":"x"};
                playerTwo = {"name":playerOName , "marker":"o"};

                playerOneInput.value = "";
                playerTwoInput.value = "";

                // redirect to new page 
                dialog.close();
                
                
                gameRounds(mode,playerOne,playerTwo);

                singleplayerButton.classList.add("disabled");
                multiplayerButton.classList.add("disabled");
                backButton.classList.remove("disabled");
                restart.classList.remove("disabled")
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

    function guessACell(){
        let number = Math.round(Math.random()*10);
        if(number > 8){
            return guessACell();
            }
        else{
            return number;
            }
        }
    
    return guessACell()
    


    

}




function gameRounds(mode, playerOne, playerTwo){
    
    
    const playerOneMarker= playerOne.marker;  // whether 1st player is x or o
    const playerTwoMarker= playerTwo.marker;  // whether 2nd player is x or o
    console.log(playerOneMarker,playerTwoMarker)

    let gameboard = [];
    let gameBoardNodeList = document.querySelectorAll(".box");
    for(let i = 0 ; i<= 8 ; i++){
        gameboard[i] = i;
        
    }
    
    
    
    let gameEndMessage = "";
    let gameCells = document.querySelector(".game-board");
    
    let restart = document.querySelector("#restart");
    restart.disabled = true;
    // restart.classList.add("disabled");

    let round = 0;
    if(mode === "Multi Player"){
        multiplayerMode()
    }
    else{
        singleplayerMode();
    }



    function multiplayerMode() {
        changeDisplay(`${playerTwo.name}'s Turn`);
        gameCells.addEventListener("click",(e)=>{
            
            if(round%2 == 0){
                if(e.target.dataset.number){
                    e.target.disabled = true;
                    const i = e.target.dataset.number;
                    gameBoardNodeList[i].innerHTML = playerTwoMarker;
                    gameboard[i]= playerTwoMarker;
                    round++;
                    changeDisplay(`${playerOne.name}'s Turn`);
                    gameEndMessage = isWin(round,gameboard)
                } 
            }
            else if(round === 9){
                
                gameEndMessage = isWin(round,gameboard);
            }
            
            else if(round%2 === 1){
                
                if(e.target.dataset.number){
                    e.target.disabled = true;
                    const i = e.target.dataset.number;
                    gameBoardNodeList[i].innerHTML = playerOneMarker;
                    gameboard[i]= playerOneMarker;
                    round++;
                    changeDisplay(`${playerTwo.name}'s Turn`);
                    gameEndMessage = isWin(round,gameboard)
                }
                
            }


        })

        gameCells.addEventListener("click",()=>{
            gameEndMessage = isWin(round,gameboard);
            let gameEnd = (gameEndMessage.includes("wins") | gameEndMessage.includes("draw"));
            let isWon = gameEndMessage.includes("wins")
            if(gameEnd){
                    changeDisplay(gameEndMessage)
                    round = 0;
                    if(isWon){
                        const winningCells = winingCells(gameboard);
                        winningCells.forEach(changeCellColor);
                    }

                    for(let i = 0 ; i<=8 ; i++){
                        gameBoardNodeList[i].disabled = true;
                    }
                    restart.classList.remove("disabled");
                    restart.disabled = false;
                }
        })

        restart.addEventListener("click",()=>{
            gameBoardNodeList.forEach((value)=>{
                value.innerHTML = "";
                value.style.backgroundColor = "white";
                value.style.color = "black";
                value.disabled = false;
            })
            
            for(let i = 0 ; i<= 8 ; i++){
                gameboard[i] = i;
                
            }
            gameRounds(mode,playerOne,playerTwo)
        })
    }

    function singleplayerMode(){

        firstMove();
        function firstMove(){
            // using to start the game with the computer move else it will wait for the player to click on the board to produce the first move
            let inputTwo = computerguess(gameboard,playerTwoMarker);
            gameBoardNodeList[inputTwo].innerHTML = playerTwoMarker;
            gameboard[inputTwo]= playerTwoMarker;
            round++;    
            gameEndMessage = isWin(round,gameboard);
        }

        
        gameCells.addEventListener("click",(e)=>{
            let status;
            if(!e.target.innerHTML){
                //e.target.innerHTML fetches what is inside the Cell("x" or "o")
                if(round != 9){
                    if(e.target.dataset.number){
                        console.log(` ${round} ${playerOneMarker}`)
                        e.target.disabled = true;
                        const i = e.target.dataset.number;
                        gameBoardNodeList[i].innerHTML = playerOneMarker;
                        gameboard[i]= playerOneMarker;
                        round++;
                        gameEndMessage = isWin(round,gameboard)
                        gameBoardNodeList.forEach((button)=>{
                        button.disabled = true;
                        })
                        status = gameWinCheckSinglePlayer(gameEndMessage);
                        if(!status){
                            setTimeout(getCinput,500)
                        }
                        
                    }

                    function getCinput(){
                        
                        console.log("fired")
                        console.log(round)
                        let inputTwo = computerguess(gameboard,playerTwoMarker);
                        if(gameboard[inputTwo]==="x" | gameboard[inputTwo] === "o"){
                            getCinput();
                        }
                        else{
                            gameBoardNodeList[inputTwo].innerHTML = playerTwoMarker;
                            gameboard[inputTwo]= playerTwoMarker;
                            round++;
                            gameEndMessage = isWin(round,gameboard);
    
                            status = gameWinCheckSinglePlayer(gameEndMessage);
                            if(!status){
                                gameBoardNodeList.forEach((button)=>{
                                    button.disabled = false;
                                })
                            }
                            else{
                                gameBoardNodeList.forEach((button)=>{
                                    button.disabled = true;
                                })
                            }
                        }

                    }

                    function gameWinCheckSinglePlayer(gameEndMessage){
                        // does the check after each inputs and updates the current status
                        let gameEnd = (gameEndMessage.includes("wins") | gameEndMessage.includes("draw"));
                        let isWon = gameEndMessage.includes("wins");
                        if(gameEnd){
                            round = 0;
                            if(isWon){
                                const winningCells = winingCells(gameboard);
                                winningCells.forEach(changeCellColor);
                            }
                            restart.classList.remove("disabled");
                            restart.disabled = false;
            
                            restart.addEventListener("click",()=>{
                                round = 0;
                                gameBoardNodeList.forEach((value)=>{
                                    value.innerHTML = "";
                                    value.style.backgroundColor = "white";
                                    value.style.color = "black";
                                    value.disabled = false;
                                })
                                restart.disabled = true;
                                for(let i = 0 ; i<= 8 ; i++){
                                    gameboard[i] = i;
                                }
                                singleplayerMode();
                            })
                        }
                        return gameEnd;
            
                    }
                };
            }
        })

        
        
    }
    function changeCellColor(i){
        gameBoardNodeList[i].style.backgroundColor = "black";
        gameBoardNodeList[i].style.color = "white";
    }
    
    const reloadButton = document.querySelector("#back");
    reloadButton.addEventListener("click",()=>{
        window.location.reload()
    })
 
}


function winingCells (gameboard) {
    
    if (gameboard[6] === gameboard[4] && gameboard[4] === gameboard[2]){
        return [6,4,2]

    }
    else if (gameboard[0] === gameboard[3] && gameboard[3] === gameboard[6]){
        return [0,3,6]
    }
    else if (gameboard[1] === gameboard[4] && gameboard[4] === gameboard[7]){
        return [1,4,7]
    }
    else if (gameboard[2] === gameboard[5] && gameboard[5] === gameboard[8]){
        return [2,5,8]
    }
    else if (gameboard[0] === gameboard[1] && gameboard[1] === gameboard[2]){
        return [0,1,2]
    }
    else if (gameboard[3] === gameboard[4] && gameboard[3] === gameboard[5]){
        return [3,4,5]
    }
    else if (gameboard[6] === gameboard[7] && gameboard[7] === gameboard[8]){
        return [6,7,8]
    }
    else if (gameboard[0] === gameboard[4] && gameboard[4] === gameboard[8]){
        return [0,4,8]
    }
    else{
        return 0;
    }
}

function isWin (k , gameboard) {
    
    if (gameboard[6] === gameboard[4] && gameboard[4] === gameboard[2]){
        gameEndMessage = `${gameboard[6]} wins`;

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
    else if(k === 9){
        gameEndMessage = `Ends in draw`
    }
    else{
        gameEndMessage = "";
    }

    if(gameEndMessage.includes("wins") || gameEndMessage.includes("draw")){
    return gameEndMessage;
    }
    else{
        return gameEndMessage="";
    }
}


function changeDisplay(message){
    let rollingDisplay = document.querySelector("#marqee-display");
    console.log(rollingDisplay)
    rollingDisplay.innerHTML = message ;
}


