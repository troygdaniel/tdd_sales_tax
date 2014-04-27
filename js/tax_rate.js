/*
TaxRate
- 'salesTax' is the salesTax tax for items (excluding exemptions)
- 'exemptions' is an array of items that are except from salesTax tax
- 'importTax' is the importTax salesTax tax (no item exemptions)

Example use:
  > taxRate =  new TaxRate({salesTax: 0.1, importTax: 0.05, exemptions: [book, food, medical]});
*/
TaxRate = function (options) {
  var salesTax, importTax, exemptions = [];
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
    if (typeof options.importTax === "undefined") {
      throw new Error("Missing required attribute 'importTax'"); 
    }
    if (typeof options.salesTax === "undefined") {
      throw new Error("Missing required attribute 'salesTax'"); 
    }
    importTax = options.importTax;
    salesTax = options.salesTax;

    if (typeof options.exemptions != "undefined") {
      exemptions = options.exemptions;
    }
  }

  return {
    importTax: importTax,
    salesTax: salesTax,
    exemptions: exemptions
  };
};