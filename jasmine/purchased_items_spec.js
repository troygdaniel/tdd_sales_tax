//  Specs for Take.NoteView
describe("Purchased Items spec", function() {

  // input 1
  var book = new Item({desc: "just a book", type: "book", imported: false, price: 12.49});
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

  var taxRate = new TaxRate({salesTaxRate: 0.1, importTaxRate: 0.05, exemptions: ["book", "food", "medical"]});
  describe("Constructor", function() {
    
    it("can instaniate PurchasedItems", function () {
        purchases = new PurchasedItems(taxRate);
        expect(purchases).toEqual(purchases);
    });

    // it("can generate a receipt for scenario input #1", function () {
      
    //   var purchases = new PurchasedItems(taxRate);
    //   purchases.addItem(book);
    //   purchases.addItem(musicCD);
    //   purchases.addItem(chocolateBar);

    //   expect(purchases.salesTax).toEqual(1.50);
    //   expect(purchases.totalAmount).toEqual(29.83);
    // });

    it("adds items to the array", function () {
        var purchases = new PurchasedItems(taxRate);
        purchases.addItem(book);
        expect(purchases.items()).toEqual([book]);
    });

    it("calculates taxes on an item", function () {
        var purchases = new PurchasedItems(taxRate);
        purchases.addItem(book);
        expect(purchases.salesTax()).toEqual(1.25);
    });

  });


});