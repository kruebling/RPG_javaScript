import { Env, Living, Player, Enemy, Rock, Land, Water, Item, Equipment, Tome, Exit, Static } from './../js/rpg.js'

describe('Env', () =>  {
  it('creates a map of x size', () => {
    let my_env = new Env(5);
    expect(my_env.map[2][2]).toEqual(0);
  });
});

describe('Player', () =>  {
  it('creates a living player', () => {
    let some_player = new Player("Bob", 20);
    expect(some_player.name).toEqual("Bob");
  });
  it('validates a valid move', () => {
    let dans_env = new Env(5);
    let some_player = new Player("Dan", 400);
    expect(some_player.move(1,0,dans_env)).toEqual(true);
  });
  it('validates an invalid move', () => {
    let dans_env = new Env(5);
    let some_player = new Player("Dan", 400);
    expect(some_player.move(1,4,dans_env)).toEqual(false);
  });
  it('can use items', () => {
    let dans_env = new Env(5);
    let some_player = new Player("Dan", 400);
    let potion = new Item("mana_potion",0,0,10,30,100,-2,3);
    some_player.pick_up_items(potion);
    some_player.item_use(some_player.satchel[0]);
    expect(some_player.mana).toEqual(500);
  });
  it('can equip items', () => {
    let dans_env = new Env(5);
    let some_player = new Player("Dan", 400);
    let sword = new Equipment("shiny_sword",0,0,0,0,8);
    let fireball = new Tome("fireball",0,0,-30,-10,0);
    some_player.pick_up_items(sword);
    some_player.equip_gear(sword);
    some_player.pick_up_items(fireball);
    some_player.add_tome(fireball);
    expect(some_player.spellbook[0].name).toEqual("fireball");
    expect(some_player.equipment[0].name).toEqual("shiny_sword");
  });
});

// describe('', () => {
//
// });
