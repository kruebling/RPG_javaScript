import { Env, Living, Player, Enemy, Rock, Land, Water, Item, Equipment, Tome, Exit, Static } from './../js/rpg.js'

$(document).ready(function() {
  let the_game = new Env(9);
  let board = "";
    let x = 0;
    for(let row = 0; row < 9; row++) {
      board += "<div class='row'>";
      for(let col = 0; col < 9; col++){
        if(col === 0 && row === 0){
          board += `<div class='col'><div class='tile player land' id="[${row},${col}]"></div></div>`;
        } else {
            board += `<div class='col'><div class='tile land' id="[${row},${col}]"></div></div>`;
        }
        x += 1;
      }
      board += "</div>";
    }

  $('#game_map').append(board);
  let player = new Player("Dan");
  // player.move(0,0,the_game);



  $(document).keydown(function(event){
    if(event.key === "ArrowDown"){
      $(`#\\[${player.pos_y}\\,${player.pos_x}\\]`).removeClass("player")
      player.pos_y += 1;
      $(`#\\[${player.pos_y}\\,${player.pos_x}\\]`).addClass("player")
    }
    if(event.key === "ArrowUp"){
      $(`#\\[${player.pos_y}\\,${player.pos_x}\\]`).removeClass("player")
      player.pos_y -= 1;
      $(`#\\[${player.pos_y}\\,${player.pos_x}\\]`).addClass("player")
    }
    if(event.key === "ArrowRight"){
      $(`#\\[${player.pos_y}\\,${player.pos_x}\\]`).removeClass("player")
      player.pos_x += 1;
      $(`#\\[${player.pos_y}\\,${player.pos_x}\\]`).addClass("player")
    }
    if(event.key === "ArrowLeft"){
      $(`#\\[${player.pos_y}\\,${player.pos_x}\\]`).removeClass("player")
      player.pos_x -= 1;
      $(`#\\[${player.pos_y}\\,${player.pos_x}\\]`).addClass("player")
    }
  });


});
