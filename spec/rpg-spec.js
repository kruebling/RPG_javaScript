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
    let some_player = new Player("Dan");
    expect(some_player.move(1,0,dans_env)).toEqual(true);
  });
  it('validates an invalid move', () => {
    let dans_env = new Env(5);
    let some_player = new Player("Dan");
    expect(some_player.move(1,4,dans_env)).toEqual(false);
  });
  it('can use items', () => {
    let dans_env = new Env(5);
    let some_player = new Player("Dan");
    let potion = new Item("mana_potion",0,0,10,30,100,-2,3);
    some_player.pick_up_items(potion);
    some_player.item_use(some_player.satchel[0]);
    expect(some_player.mana).toEqual(150);
  });
  it('can equip items', () => {
    let dans_env = new Env(5);
    let some_player = new Player("Dan");
    let sword = new Equipment("shiny_sword",0,0,0,0,8);
    let fireball = new Tome("fireball",0,0,-30,-10,0);
    some_player.pick_up_items(sword);
    some_player.equip_gear(sword);
    some_player.pick_up_items(fireball);
    some_player.add_tome(fireball);
    expect(some_player.spellbook[0].name).toEqual("fireball");
    expect(some_player.equipment[0].name).toEqual("shiny_sword");
  });

  it('levels up a player', () => {
    let dan = new Player("Dan");
    dan.exp += 100;
    expect(dan.lvl_up()).toEqual(true);
    expect(dan.lvl).toEqual(2);
    expect(dan.exp).toEqual(0);
  });

  it('dies', () => {
    let javis_hut = new Env(5);
    let javi = new Player("Javi", 0);
    javi.health = 0
    expect(javi.death(javis_hut)).toEqual(true);
  });

  it('casts a spell' ,() => {
    let dan = new Player("Dan");
    let javi = new Enemy("Javi", 1, 0,0);
    let fireball = new Tome("fireball",0,0,-30,-10,0);
    dan.pick_up_items(fireball);
    dan.add_tome(fireball);
    dan.cast(fireball, javi);
    expect(javi.health).toEqual(-3); // (30 - (-30 + (-30 * (1*.1)))) = (30-33)
  });
});

// describe('', () => {
//
// });
