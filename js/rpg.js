export class Env  {
  constructor() {
    this.map = new Array(5);
    for (let i = 0; i < 5; i++) {
      this.map[i] = [0,0,0,0,0];
    }
  }

  moveValidator(y, x, player_y, player_x){
    if((y === (player_y + 1)) || (y === (player_y - 1)) || (x === (player_x + 1)) || (x === (player_x - 1))) {
      return true;
    }
    return false;
  }
}

export class Living  {
  constructor(lvl,health,mana,strength,x,y) {
    this.lvl = lvl;
    this.exp = 0;
    this.health = health;
    this.mana = mana;
    this.strength = strength;
    this.pos_y = x;
    this.pos_x = y;
    // this.items = [];
    // this.spells = [];
  }

}

export class Player extends Living {
  constructor() {
    super(1,100,50,10,0,0);
  }
}

export class Enemy extends Living {
  constructor(lvl,health,strength,x,y) {
    super(lvl,health,0,strength,x,y);
  }
}
