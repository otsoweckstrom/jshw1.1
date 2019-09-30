const TicTacToeGame = new TicTacToe();
TicTacToeGame.start();

function TicTacToe(){
  const board = new Board();
  const player1 = new Player1(board);
  const player2 = new Player2(board);
  let turn = 1;

  const restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("mousedown", event => {
  buttonActivities();
  event.stopPropagation();
  });
  function buttonActivities() {
    console.log("Game restarted");
    turn = 1;
    var x = document.getElementsByTagName("td");
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].innerHTML = "";
    }
  }
  
  this.start = function(){
    const config = {childList: true};
    const observer = new MutationObserver(() => takeTurn());
    board.positions.forEach((el) => observer.observe(el, config));
    takeTurn();
  }
  function takeTurn(){
    checkForWinner(board);

    if(turn % 2 === 0){
      player1.takeTurn();
      turn++;
    }else{
      player2.takeTurn();
      turn++;
    }
    
  }
}

function checkForWinner(board){
}

function Player1(board){
  this.takeTurn = function(){
    board.positions.forEach(el => el.addEventListener('click', handleTurnTaken));
  }
  function handleTurnTaken(event){
      event.target.innerText = 'X';
      board.positions.forEach(el => el.removeEventListener('click', handleTurnTaken));
  }
}
function Player2(board){
  this.takeTurn = function(){
    board.positions.forEach(el => el.addEventListener('click', handleTurnTaken));
  }
  function handleTurnTaken(event){
    event.target.innerText = 'O';
    board.positions.forEach(el => el.removeEventListener('click', handleTurnTaken));
  }

}


function Board(){
    for(var j = 0; j<5; j++){
      var tr = document.createElement('tr');
      for(var i = 0; i<5; i++){
        var td = tr.appendChild(document.createElement('td'));
        td.className = "cell"
        document.getElementById("board").appendChild(tr);
      }
    }
    this.positions = Array.from(document.querySelectorAll('.cell'));
  }