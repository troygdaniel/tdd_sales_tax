//  Specs for Take.NoteView
describe("Tax Rate spec", function() {
  
  describe("Constructor", function() {
    
    it("can instantiate a TaxRate", function () {
        var taxRate =  new TaxRate({salesTax: 0.1, importTax: 0.05, exemptions: ["book", "food", "medical"]});
        expect(taxRate).toEqual(taxRate);
    });

    it("can access the importTax rate", function () {
        var taxRate =  new TaxRate({salesTax: 0.1, importTax: 0.05, exemptions: ["book", "food", "medical"]});
        expect(taxRate.importTax).toEqual(0.05);
    });

    it("can access the salesTax rate", function () {
        var taxRate =  new TaxRate({salesTax: 0.1, importTax: 0.05, exemptions: ["book", "food", "medical"]});
        expect(taxRate.salesTax).toEqual(0.1);
    });

    it("can access the exceptions", function () {
        var taxRate =  new TaxRate({salesTax: 0.1, importTax: 0.05, exemptions: ["book", "food", "medical"]});
        expect(taxRate.exemptions).toEqual(["book", "food", "medical"]);
    });

    it("rejects tax rates without sales tax", function () {
        expect(function () {
                new TaxRate({importTax: 0.05, exemptions: ["book", "food", "medical"]});
            }).toThrow(new Error("Missing required attribute 'salesTax'"));
    });

    it("rejects tax rates without import tax", function () {
        expect(function () {
				new TaxRate({salesTax: 0.1, exemptions: ["book", "food", "medical"]});
        }).toThrow(new Error("Missing required attribute 'importTax'"));
    });

    it("returns an empty array if there are no excemptions provided", function () {
        var taxRate =  new TaxRate({salesTax: 0.1, importTax: 0.05});
        expect(taxRate.exemptions).toEqual([]);
    });
  });
});