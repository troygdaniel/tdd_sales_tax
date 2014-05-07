/**
 * PurchasedItems
 * 'taxRate' is a required paramater
 *
 * Example use:
 *  purchases = new PurchasedItems(taxRate);
 *  purchases.addItem(book);
 *  purchases.addItem(musicCD);
 *  purchases.receipt()
 */
var PurchasedItems = function (_taxRate) {
  var _items = [], taxRate = _taxRate;

  // Was a TaxRate configuration provided?
  if (typeof _taxRate === "undefined")
    throw new Error("Missing required 'TaxRate' when instantiating PurchasedItems"); 

  /*
   * Public Methods
   * --------------
   */

  // Add an item to the shopping cart
  function addItem(item) {
    _items.push(item);
  }

  // Calculate the sub total for the shopping cart
  function subTotal() {
    var _subTotal = 0;

    // Iterate through all the items
    for (var i = 0; i < _items.length; i++) {
      _subTotal += _items[i].price;
    }
    return parseFloat(_subTotal);
  }

  // Calculate the total taxes for the shopping cart
  function salesTax() {
    var _salesTax = 0;

    // Iterate through all the items
    for (var i = 0; i < _items.length; i++) {
      _salesTax += taxRate.taxForItem(_items[i]);  
    }
    return parseFloat(_salesTax);
  }

  // Calculate the total amount for the shopping cart
  function totalAmount() {
    return parseFloat(subTotal() + salesTax());
  }

  // Generate a human readable receipt
  function receipt() {
    return itemizedList() + salesTaxLine() + "\n" + totalLine();
  }

  function items() {
    return _items;
  }

  /*
   * Private Methods
   * ---------------
   */

  function itemizedList() {
    var _itemizedList = "";

    // Create a dictionary of items with quantities
    var simpleItems = buildSimpleItems();

    // Iterate through the quantified items dictionary
    for (var key in simpleItems) {      
      _itemizedList += lineItem(simpleItems[key]);
    }
    // Return the human readable line for the item
    return _itemizedList;
  }
  
  function lineItem(simpleItem) {
    var _lineItem = "##qty## ##description## : ##costWithTax##\n";

    _lineItem = parseTemplate(_lineItem, simpleItem, "qty");
    _lineItem = parseTemplate(_lineItem, simpleItem, "description");
    _lineItem = parseTemplate(_lineItem, simpleItem, "costWithTax");
    return _lineItem;
  }

  function parseTemplate(template, obj, key) {
    return template.replace("##"+key+"##", obj[key]);
  }

  function salesTaxLine() {
    return "Sales Taxes: " + salesTax().toFixed(2);
  }

  function totalLine() {
    return "Total: " + totalAmount().toFixed(2);
  }

  // Create a dictionary of items that have 
  //  'product' representing the item
  //  'quantity' of the similar items in the shopping cart
  function buildSimpleItems() {

    // Initialize with an empty object
    var quantifiedItems = {};

    // Iterate through the shopping cart items
    for (var i = 0; i < _items.length; i++) {
      var item = _items[i];

      // Setup the key using the item.description
      if (isNotDefined(quantifiedItems[item.sku])) {
        quantifiedItems[item.sku] = dictionaryForItem(item);
      }

      // Increment the quantity for every additional item
      quantifiedItems[item.sku].qty++;
    }
    return quantifiedItems;
  }

  function isNotDefined(sku) {
    return (typeof sku === "undefined");
  }

  function dictionaryForItem(item) {
    return {
          qty: 0, 
          description: item.description, 
          costWithTax: taxRate.costWithTax(item).toFixed(2)
    };
  }

  // Return the public methods and instance variables
  return {
    addItem: addItem,
    items: items,
    subTotal: subTotal,
    salesTax: salesTax,
    totalAmount: totalAmount,
    receipt: receipt
  };
};