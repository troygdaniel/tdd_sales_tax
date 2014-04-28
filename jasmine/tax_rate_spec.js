//  Specs for Take.NoteView
describe("Tax Rate spec", function() {
  var options = {salesTaxRate: 0.1, importTaxRate: 0.05, exemptions: ["book", "food", "medical"]};

  describe("Constructor", function() {
    
    it("instantiate a TaxRate", function () {
        var taxRate =  new TaxRate(options);
        expect(taxRate).toEqual(taxRate);
    });
  });
  describe("Tax Rates", function() {

    it("has access the importTaxRate rate", function () {
        var taxRate =  new TaxRate(options);
        expect(taxRate.importTaxRate).toEqual(0.05);
    });

    it("has access the salesTaxRate rate", function () {
        var taxRate =  new TaxRate(options);
        expect(taxRate.salesTaxRate).toEqual(0.1);
    });

    it("rejects tax rates without sales tax", function () {
        expect(function () {
                new TaxRate({importTaxRate: 0.05, exemptions: ["book", "food", "medical"]});
            }).toThrow(new Error("Missing required attribute 'salesTaxRate'"));
    });

    it("rejects tax rates without import tax", function () {
        expect(function () {
        new TaxRate({salesTaxRate: 0.1, exemptions: ["book", "food", "medical"]});
        }).toThrow(new Error("Missing required attribute 'importTaxRate'"));
    });    
  });
  describe("Exceptions", function() {

    it("has access the exceptions", function () {
        var taxRate =  new TaxRate(options);
        expect(taxRate.exemptions).toEqual(["book", "food", "medical"]);
    });

    it("returns an empty array if there are no excemptions provided", function () {
        var taxRate =  new TaxRate({salesTaxRate: 0.1, importTaxRate: 0.05});
        expect(taxRate.exemptions).toEqual([]);
    });
  });
  describe("#taxForItem", function() {

    it("...pending", function () {
    });
  });
  describe("#costWithTax", function() {

    it("...pending", function () {
    });
  });
});