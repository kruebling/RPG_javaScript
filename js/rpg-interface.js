import { Env, Living, Player, Enemy, Rock, Land, Water, Item, Equipment, Tome, Exit, Static } from './../js/rpg.js'

$(document).ready(function() {
  let the_game = new Env(9);
  let board = "";
    let x = 0;
    for(let row = 0; row < 9; row++) {
      board += "<div class='row'>";
      for(let col = 0; col < 9; col++){
        if(col === 0 && row === 0){
          board += `<div class='col'><div class='tile player ${the_game.map[row][col].name}' id="[${row},${col}]"></div></div>`;
        } else {
            board += `<div class='col'><div class='tile ${the_game.map[row][col].name}' id="[${row},${col}]"></div></div>`;
        }
        x += 1;
      }
      board += "</div>";
    }
  let my_rock = new Static("rock",1,1,false);
  the_game.map[1][1] = my_rock;
  // $(`#\\[1\\,1\\]`).addClass("rock")
  // $(`#\\[${player.pos_y}\\,${player.pos_x}\\]`).addClass("player")
  $('#game_map').append(board);
  $(`#\\[1\\,1\\]`).removeClass("land");
  $(`#\\[1\\,1\\]`).addClass("rock");
  let player = new Player("Dan");
  // player.move(0,0,the_game);



  $(document).keydown(function(event){
    console.log(the_game.map);
    if(event.key === "ArrowDown"){
      if(player.move((player.pos_y + 1),player.pos_x,the_game)){
        $(`#\\[${player.pos_y - 1}\\,${player.pos_x}\\]`).removeClass("player")
        $(`#\\[${player.pos_y}\\,${player.pos_x}\\]`).addClass("player")
      }
    }
    if(event.key === "ArrowUp"){
      if(player.move((player.pos_y - 1),player.pos_x,the_game)){
        $(`#\\[${player.pos_y + 1}\\,${player.pos_x}\\]`).removeClass("player")
        $(`#\\[${player.pos_y}\\,${player.pos_x}\\]`).addClass("player")
      }
    }
    if(event.key === "ArrowRight"){
      if(player.move((player.pos_y),(player.pos_x + 1),the_game)){
        $(`#\\[${player.pos_y}\\,${player.pos_x - 1}\\]`).removeClass("player")
        $(`#\\[${player.pos_y}\\,${player.pos_x}\\]`).addClass("player")
      }
    }
    if(event.key === "ArrowLeft"){
      if(player.move((player.pos_y),(player.pos_x - 1),the_game)){
        $(`#\\[${player.pos_y}\\,${player.pos_x + 1}\\]`).removeClass("player")
        $(`#\\[${player.pos_y}\\,${player.pos_x}\\]`).addClass("player")
      }
    }
  });


});
