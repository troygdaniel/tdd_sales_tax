//  Specs for Take.NoteView
describe("Purchased Items spec", function() {

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

  var taxRate = new TaxRate({salesTaxRate: 0.1, importTaxRate: 0.05, exemptions: ["book", "food", "medical"]});
  describe("Constructor", function() {
    
    it("can instaniate PurchasedItems", function () {
        purchases = new PurchasedItems(taxRate);
        expect(purchases).toEqual(purchases);
    });
  });
  describe("Provided test scenarios", function() {

    it("can generate a receipt for scenario input #1", function () {
      
      var purchases = new PurchasedItems(taxRate);
      purchases.addItem(book);
      purchases.addItem(musicCD);
      purchases.addItem(chocolateBar);

      expect(purchases.salesTax().toFixed(2)).toEqual("1.50");
      expect(purchases.totalAmount().toFixed(2)).toEqual("29.83");
      expect(purchases.receipt()).toEqual("1 book : 12.49\n1 music CD : 16.49\n1 chocolate bar : 0.85\nSales Taxes: 1.50\nTotal: 29.83");
    });

    it("succesfully passes scenario for input #2", function () {
      
      var purchases = new PurchasedItems(taxRate);
      purchases.addItem(dietImportedChocolate);
      purchases.addItem(luxuryImportedPerfume);

      expect(purchases.salesTax().toFixed(2)).toEqual("7.65");
      expect(purchases.totalAmount().toFixed(2)).toEqual("65.15");
    });
    it("succesfully passes scenario for input #3", function () {
      
      var purchases = new PurchasedItems(taxRate);
      purchases.addItem(basicImportedPerfume);
      purchases.addItem(perfume);
      purchases.addItem(pills);
      purchases.addItem(importedChocolate);

      expect(purchases.salesTax().toFixed(2)).toEqual("6.70");
      expect(purchases.totalAmount().toFixed(2)).toEqual("74.68");
    });


  });

  describe("#addItem", function() {

    it("adds items to the array", function () {
        var purchases = new PurchasedItems(taxRate);
        purchases.addItem(book);
        expect(purchases.items()).toEqual([book]);
    });
  });
  describe("#salesTax", function() {

    it("calculates taxes on perfume", function () {
        var purchases = new PurchasedItems(taxRate);
        purchases.addItem(perfume);
        expect(purchases.salesTax().toFixed(2)).toEqual("1.90");
    });
    it("does not calculate taxes on book", function () {
        var purchases = new PurchasedItems(taxRate);
        purchases.addItem(book);
        expect(purchases.salesTax()).toEqual(0);
    });
  });
  describe("#subTotal", function() {

    it("calculates the subTotal", function () {
        var purchases = new PurchasedItems(taxRate);
        purchases.addItem(book);
        expect(purchases.subTotal()).toEqual(12.49);
        purchases.addItem(musicCD);
        expect(purchases.subTotal()).toEqual(27.48);
    });
  });

});