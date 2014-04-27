/*
TaxRate
- 'salesTaxRate' is the salesTaxRate tax for items (excluding exemptions)
- 'exemptions' is an array of items that are except from salesTaxRate tax
- 'importTaxRate' is the importTaxRate salesTaxRate tax (no item exemptions)

Example use:
  > taxRate =  new TaxRate({salesTaxRate: 0.1, importTaxRate: 0.05, exemptions: [book, food, medical]});
*/
TaxRate = function (options) {
  var salesTaxRate, importTaxRate, exemptions = [];
  initialize(options);


  /*
    Public Methods
    ---
  */

  // none

  /*
    Private Methods
    ---
  */

  function initialize(options) {
    if (typeof options.importTaxRate === "undefined") {
      throw new Error("Missing required attribute 'importTaxRate'"); 
    }
    if (typeof options.salesTaxRate === "undefined") {
      throw new Error("Missing required attribute 'salesTaxRate'"); 
    }
    importTaxRate = options.importTaxRate;
    salesTaxRate = options.salesTaxRate;

    if (typeof options.exemptions != "undefined") {
      exemptions = options.exemptions;
    }
  }

  return {
    importTaxRate: importTaxRate,
    salesTaxRate: salesTaxRate,
    exemptions: exemptions
  };
};