(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Env = exports.Env = function Env(size) {
  _classCallCheck(this, Env);

  this.size = size;
  this.map = new Array(this.size);
  for (var i = 0; i < this.size; i++) {
    this.map[i] = new Array(this.size);
    for (var j = 0; j < this.size; j++) {
      this.map[i][j] = 0;
    }
  }
};

var Living = exports.Living = function () {
  function Living(name, lvl, exp, health, strength, x, y) {
    _classCallCheck(this, Living);

    this.name = name;
    this.lvl = lvl;
    this.exp = exp;
    this.health = health;
    this.strength = strength;
    this.pos_y = x;
    this.pos_x = y;
    this.satchel = [];
  }

  _createClass(Living, [{
    key: "move",
    value: function move(y, x, an_env) {
      if (y < an_env.size && y >= 0 && x < an_env.size && x >= 0) {
        if (y === this.pos_y && x === this.pos_x + 1 || y === this.pos_y && x === this.pos_x - 1 || x === this.pos_x && y === this.pos_y + 1 || x === this.pos_x && y === this.pos_y - 1) {
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

    // Returns a number between 1 and max

  }, {
    key: "mod",
    value: function mod(max) {
      return Math.ceil(Math.random() * max); //1-5 && 1-10
    }
  }, {
    key: "attack",
    value: function attack(target) {
      var roll1 = this.mod(6);
      var roll2 = this.mod(10) / 10;
      if (roll1 === 1) {
        return false;
      } else if (roll1 < 6) {
        target.health -= Math.floor(this.strength + roll2 * this.strength);
      } else {
        target.health -= Math.floor((this.strength + roll2 * this.strength) * 1.25);
      }
    }
  }, {
    key: "death",
    value: function death(an_env) {
      if (this.health <= 0) {
        an_env.map[this.pos_y][this.pos_x] = 0;
        return true;
      }
      return false;
    }
  }, {
    key: "pick_up_items",
    value: function pick_up_items(loot) {
      this.satchel.push(loot);
    }
  }, {
    key: "add_tome",
    value: function add_tome(spell) {
      spell.usage_count = 0;
      this.spellbook.push(spell);
      this.satchel = this.satchel.filter(function (item) {
        return item.usage_count > 0;
      });
    }
  }, {
    key: "equip_gear",
    value: function equip_gear(gear) {
      gear.usage_count = 0;
      this.equipment.push(gear);
      this.satchel = this.satchel.filter(function (item) {
        return item.usage_count > 0;
      });
    }
  }]);

  return Living;
}();

var Player = exports.Player = function (_Living) {
  _inherits(Player, _Living);

  function Player(name) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, name, 1, 0, 100, 5, 0, 0));
    // name,lvl,exp,health,strength,x,y


    _this.mana = 50;
    _this.spellbook = [];
    _this.equipment = [];
    return _this;
  }

  _createClass(Player, [{
    key: "item_use",
    value: function item_use(an_item) {
      --an_item.usage_count;
      this.health += an_item.health;
      this.mana += an_item.mana;
      this.exp += an_item.exp;
      this.strength += an_item.strength;
      this.satchel = this.satchel.filter(function (item) {
        return item.usage_count > 0;
      });
    }
  }, {
    key: "flee",
    value: function flee() {
      var roll = mod(5);
      if (roll < 3) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "cast",
    value: function cast(spell, target) {
      target.health += spell.health + spell.health * (this.lvl * 0.1);
      this.mana += spell.mana;
    }
  }, {
    key: "lvl_up",
    value: function lvl_up() {
      if (this.exp >= this.lvl * 100) {
        this.exp -= this.lvl * 100;
        this.lvl += 1;
        this.health += 100;
        this.mana += 50;
        this.strength += 5;
        return true;
      }
    }
  }, {
    key: "death",
    value: function death(an_env) {
      if (_get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), "death", this).call(this, an_env)) {
        if (this.lvl > 1) {
          this.lvl -= 1;
        }
        this.exp = 0;
        this.satchel = [];
        this.health = 100 + 100 * this.lvl;
        this.mana = 50 + 50 * this.lvl;
        this.strength = 5 + 5 * this.lvl;
        return true;
      };
    }
  }]);

  return Player;
}(Living);

;

var Enemy = exports.Enemy = function (_Living2) {
  _inherits(Enemy, _Living2);

  function Enemy(name, lvl, x, y) {
    _classCallCheck(this, Enemy);

    // name,lvl,exp,health,strength,x,y
    return _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, name, lvl, lvl * 5, lvl * 30, lvl * 3, x, y));
  }

  _createClass(Enemy, [{
    key: "death",
    value: function death(player, an_env) {
      if (_get(Enemy.prototype.__proto__ || Object.getPrototypeOf(Enemy.prototype), "death", this).call(this, an_env)) {
        player.exp += this.exp;
        player.pick_up_items(this.satchel[0]);
        //player.health += 10 (bonus after combat)
        return true;
      }
    }
  }]);

  return Enemy;
}(Living);

var Static = exports.Static = function () {
  function Static(name, x, y, passable) {
    _classCallCheck(this, Static);

    this.name = name;
    this.x = x;
    this.y = y;
    this.passable = passable;
  }

  _createClass(Static, [{
    key: "placement",
    value: function placement(an_env) {
      an_env.map[this.y][this.x] = this;
    }
  }]);

  return Static;
}();

var Item = exports.Item = function (_Static) {
  _inherits(Item, _Static);

  function Item(name, x, y, exp, health, mana, strength, usage_count) {
    _classCallCheck(this, Item);

    var _this3 = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, name, x, y, true));

    _this3.exp = exp;
    _this3.health = health;
    _this3.mana = mana;
    _this3.strength = strength;
    _this3.usage_count = usage_count;
    return _this3;
  }

  return Item;
}(Static);

var Equipment = exports.Equipment = function (_Item) {
  _inherits(Equipment, _Item);

  function Equipment(name, x, y, health, mana, strength) {
    _classCallCheck(this, Equipment);

    var _this4 = _possibleConstructorReturn(this, (Equipment.__proto__ || Object.getPrototypeOf(Equipment)).call(this, name, x, y, 0, health, mana, strength, 1));

    _this4.equip = true;
    return _this4;
  }

  return Equipment;
}(Item);

var Tome = exports.Tome = function (_Item2) {
  _inherits(Tome, _Item2);

  function Tome(name, x, y, health, mana) {
    _classCallCheck(this, Tome);

    var _this5 = _possibleConstructorReturn(this, (Tome.__proto__ || Object.getPrototypeOf(Tome)).call(this, name, x, y, 0, health, mana, 0, 1));

    _this5.equip = true;
    return _this5;
  }

  return Tome;
}(Item);

// export class Exit extends Static {
//   constructor(name, x, y, passable) {
//     super("exit", x, y, true)
//   }
//   //regen map here when we figure out how
// }

},{}],2:[function(require,module,exports){
"use strict";

var _rpg = require("./../js/rpg.js");

$(document).ready(function () {
  var the_game = new _rpg.Env(9);
  var board = "";
  var x = 0;
  for (var row = 0; row < 9; row++) {
    board += "<div class='row'>";
    for (var col = 0; col < 9; col++) {
      board += "<div class='col'><div class='tile land' id=\"[" + row + "," + col + "]\"></div></div>";
      x += 1;
    }
    board += "</div>";
  }

  $('#game_map').append(board);
  // let player = new Player("Dan");
  // player.move(0,0,the_game);
  $("#[0,0]").removeClass("btn");
  // $(document).keydown(function(e){
  //
  // });

});

},{"./../js/rpg.js":1}]},{},[2]);
