//  Specs for Take.NoteView
describe("Item spec", function() {
  
  // input 1
  var book = new Item({desc: "book", type: "book", imported: false, price: 12.49});
  var musicCD = new Item({desc: "music CD", type: "music", imported: false, price: 14.99});
  var chocolateBar = new Item({desc: "chocolate bar", type: "food", imported: false, price: 0.85});

  describe("Constructor", function() {
    
    it("will instantiate various Item", function () {        
        expect(book).toEqual(book);
        expect(musicCD).toEqual(musicCD);
        expect(chocolateBar).toEqual(chocolateBar);
    });
    it("will accept valid items", function () {
        var item = new Item({desc: "cd", type: "music", imported: false, price:12.34});
        expect(item.type).toEqual("music");
    });
    it("will reject invalid items ", function () {
        var item = new Item({desc: "imported cd", type: "musics", imported: true, price:12});
        expect(item.type).not.toEqual("musics");
    });

    it("requires a price to be initialized", function () {
        expect(function () {
                new Item({desc: "cd", type: "music", imported: false});
            }).toThrow(new Error("Missing required attribute 'price'"));
    });
  });
});