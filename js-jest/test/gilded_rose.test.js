const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
});

describe("Normal item tests", function() {
  it("quality and sellIn should go down by 1", function() {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(0)
  });
  it("quality should degrade twice as fast if sellIn date is passed", function() {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  });
  it("quality should not go below 0", function() {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});

describe("Aged Brie tests", function() {
  it("quality should go up and sellIn should go down", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
    expect(items[0].sellIn).toBe(0)
  });
  it("quality should not go over 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(0)
  });
});

describe("Sulfuras tests", function() {
  it("quality and sellIn should not change", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(1)
  });
});

describe("Backstage passes tests", function() {
  it("quality goes up by 3 when sellIn is <= 5", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
  });
  it("quality goes up by 2 when sellIn is <= 10", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });
  it("quality goes to 0 when sellIn date is passed", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});

describe("Conjured items tests", function() {
  it("Conjured item should degrade by -2 if sellIn date is > 0", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 1, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  });
  it("Conjured item should degrade by -4 if sellIn date passed", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 0, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
  it("Conjured item quality should not go below 0", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});