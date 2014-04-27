//  Specs for Take.NoteView
describe("Item spec", function() {
  // var tabJSON = [{"text":"This is a test.","children":[{"text":"This is a child","children":[]}]},{"text":"This is another parent","children":[{"text":"This is another child","children":[{"text":"This is a grandchild","children":[]}]}]}];
  
  // input 1
  var book = new Item({desc: "book", type: "book", imported: false, price: 12.49});
  var musicCD = new Item({desc: "music CD", type: "music", imported: false, price: 14.99});
  var chocolateBar = new Item({desc: "chocolate bar", type: "food", imported: false, price: 0.85});

  // input 2
  var dietImportedChocolate = new Item({desc: "imported box of chocolates", type: "food", imported: true, price: 10.00});
  var luxuryImportedPerfume = new Item({desc: "imported bottle of perfume", type: "perfume", imported: true, price: 47.50});
  
  // input 3
  var basicImportedPerfume = new Item({desc: "imported bottle of perfume", type: "perfume", imported: true, price: 27.99});
  var perfume = new Item({desc: "bottle of perfume", type: "perfume", imported: false, price: 18.99});
  var pills = new Item({desc: "packet of headache pills", type: "medical", imported: false, price: 9.75});
  var importedChocolate = new Item({desc: "box of imported chocolates", type: "food", imported: true, price: 11.25});


  describe("Constructor", function() {
    
    it("can instantiate various Item", function () {        
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