import { Env, Living, Player, Enemy, Rock, Land, Water, Item, Equipment, Tome, Exit, Static } from './../js/rpg.js'

$(document).ready(function() {
  let the_game = new Env(9);
  let board = "";
    let x = 0;
    for(let row = 0; row < 9; row++) {
      board += "<div class='row'>";
      for(let col = 0; col < 9; col++){
        board += `<div class='col'><div class='tile' id="[${row},${col}]"></div></div>`;
        x += 1;
      }
      board += "</div>";
    }

  $('#game_map').append(board);



});
