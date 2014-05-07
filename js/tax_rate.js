/**
 * TaxRate
 *  'salesTaxRate' - the salesTaxRate tax for items (excluding exemptions)
 *  'exemptions' - an array of items that are except from salesTaxRate tax
 *  'importTaxRate' - the importTaxRate salesTaxRate tax (no item exemptions)
 *
 *  Example use:
 *    var options = {salesTaxRate: 0.1, importTaxRate: 0.05, exemptions: [book, food, medical]};
 *    var taxRate =  new TaxRate(options);
 */

var TaxRate = function (options) {
  var salesTaxRate, importTaxRate, exemptions = [];

  // Were options provided?
  if (typeof options === "undefined")
    throw new Error("Missing required options when instantiating TaxRate"); 
  initialize(options);

  /*
   * Public Methods
   * --------------
   */

  // Is the provided item except from sales tax?
  function isExempt(item) {

    // Iterate through the exemptions array
    for (var i = 0; i < exemptions.length; i++) {

      // Is this item type found in the exceptions array?
      if (item.type === exemptions[i]) {
        return true; // YES
      }
    }
    return false; // NO
  }

  // Convenience method that negates isExempt(item)
  function isNotExempt(item) {
    return !isExempt(item);
  }

  // Calculate the total sales tax for an item
  function taxForItem(item) {

    var salesTax = 0, importTax = 0, calculatedTax;
    
    // Is this item not exempt from sales taxes?
    if (isNotExempt(item) === true) {
      
      calculatedTax = item.price * salesTaxRate; // Calculate the sales tax      
      salesTax = parseFloat((Math.ceil(calculatedTax*20)/20).toFixed(2)); // Round to the nearest nickel
    }
    
    // Is this item an imported item? 
    if (item.isImported === true) {
      
      calculatedTax = item.price * importTaxRate; // Calculate the sales tax      
      importTax = parseFloat((Math.ceil(calculatedTax*20)/20).toFixed(2)); // Round to the nearest nickel
    }
    
    return parseFloat(salesTax + importTax); // Return the total taxes (sales + import)
  }

  // Convenience method to return the item cost including tax
  function costWithTax(item) {
    return parseFloat( item.price + taxForItem(item) );
  }

  /*
   * Private Methods
   * ---------------
   */

  // Initialize the TaxRate object with the given options
  function initialize(options) {

    // Was an 'importTaxRate' option provided?
    if (typeof options.importTaxRate === "undefined") {
      throw new Error("Missing required attribute 'importTaxRate'"); 
    }

    // Was an 'salesTaxRate' option provided?
    if (typeof options.salesTaxRate === "undefined") {
      throw new Error("Missing required attribute 'salesTaxRate'"); 
    }

    // Safely set the tax rate configuration
    importTaxRate = options.importTaxRate;
    salesTaxRate = options.salesTaxRate;

    // Was an array of exemptions provided?
    if (typeof options.exemptions != "undefined") {
      exemptions = options.exemptions;
    }
  }

  // Return the public methods and instance variables
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