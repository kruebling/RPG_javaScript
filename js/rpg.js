export class Env  {
  constructor(size) {
    this.size = size;
    this.map = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      this.map[i] = [0,0,0,0,0];
    }
  }


}

export class Living  {
  constructor(name,lvl,health,mana,strength,x,y) {
    this.name = name;
    this.lvl = lvl;
    this.exp = 0;
    this.health = health;
    this.mana = mana;
    this.strength = strength;
    this.pos_y = x;
    this.pos_x = y;
    this.satchel = [];
    // this.spellbook = [];
  }

  move(y, x, an_env){
    if ((y < an_env.size && y >= 0) && (x < an_env.size && x >= 0)){
      if ((y === this.pos_y) && (x === (this.pos_x + 1)) || (y === this.pos_y) && (x === (this.pos_x - 1)) || (x === this.pos_x) && (y === (this.pos_y + 1)) || (x === this.pos_x) && (y === (this.pos_y - 1))) {
        // Transistion position on map in an_env object
        an_env.map[this.pos_y][this.pos_x] = 0;
        an_env.map[y][x] = this;
        // Updates the position of the living object
        this.pos_y = y;
        this.pos_x = x;
        return true;
      }
    }
    return false;
  }
}

export class Player extends Living {
  constructor(name) {
    super(name,1,100,50,10,0,0);
  }
}

export class Enemy extends Living {
  constructor(name,lvl,health,strength,x,y) {
    super(name,lvl,health,0,strength,x,y);
  }
}

export class Static {
  constructor(name, x, y, passable) {
    this.name = name
    this.x = x
    this.y = y
    this.passable = passable
  }
}

export class Item extends Static {
  constructor(name, x, y, passable, exp, health, mana, strength) {
    super("item", x, y, true)
    this.exp = exp
    this.health = health
    this.mana = mana
    this.strength = strength
  }
}

// export class Tome extends Static {
//   constructor(name, x, y, passable, exp, health, mana, strength) {
//     super("spell", x, y, true)
//     this.exp = exp
//     this.health = health
//     this.mana = mana
//     this.strength = strength
//   }
// }

export class Rock extends Static {
  constructor(name, x, y, passable) {
    super("rock", x, y, false)
  }
}

export class Water extends Static {
  constructor(name, x, y, passable) {
    super("water", x, y, false)
  }
}

export class Land extends Static {
  constructor(name, x, y, passable) {
    super("land", x, y, true)
  }
}

export class Exit extends Static {
  constructor(name, x, y, passable) {
    super("exit", x, y, true)
  }
  //regen map here when we figure out how
}
