/*
TaxRate
- 'salesTaxRate' is the salesTaxRate tax for items (excluding exemptions)
- 'exemptions' is an array of items that are except from salesTaxRate tax
- 'importTaxRate' is the importTaxRate salesTaxRate tax (no item exemptions)

Example use:
  > taxRate =  new TaxRate({salesTaxRate: 0.1, importTaxRate: 0.05, exemptions: [book, food, medical]});
*/
var TaxRate = function (options) {
  var salesTaxRate, importTaxRate, exemptions = [];
  initialize(options);


  /*
    Public Methods
    ---
  */
  function isExempt(item) {
    for (var i = 0; i < exemptions.length; i++) {
      if (item.type === exemptions[i]) {
        return true;
      }
    }
    return false;
  }

  function isNotExempt(item) {
    return !isExempt(item);
  }

  // TODO: Clean up - painful to read
  function taxForItem(item) {
    var salesTax = 0, importTax = 0;
    var n;
    if (isNotExempt(item) === true) {      
      n = item.price * salesTaxRate;
      salesTax = parseFloat((Math.ceil(n*20)/20).toFixed(2));
    }
    if (item.isImported === true) {
      n = item.price * importTaxRate;      
      importTax = parseFloat((Math.ceil(n*20)/20).toFixed(2));
    }
    return parseFloat(salesTax + importTax);
  }

  function costWithTax(item) {
    return parseFloat( item.price + taxForItem(item) );
  }

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
    exemptions: exemptions,
    isExempt: isExempt,
    isNotExempt: isNotExempt, 
    taxForItem: taxForItem,
    costWithTax: costWithTax    
  };
};