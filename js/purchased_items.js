/*
Purchased Items
- requires a taxRate 
*/
PurchasedItems = function (_taxRate) {
  var _items = [], taxRate = _taxRate;
  /*
    Public Methods
    ---
  */

  function addItem(item) {
    _items.push(item);
  }

  function subTotal() {
    var _subTotal = 0;
    for (var i = 0; i < _items.length; i++) {
      _subTotal += _items[i].price;
    };
    return parseFloat(_subTotal);
  }

  function salesTax() {
    var _salesTax = 0;
    for (var i = 0; i < _items.length; i++) {
      _salesTax += taxRate.taxForItem(_items[i]);  
    };
    return parseFloat(_salesTax);
  }

  function totalAmount() {
    return parseFloat(subTotal() + salesTax());
  }

  // TODO: Identify quantity for multiple items
  // 1.  clone the _items array
  // 2a. iterate, scan and pop all items (single or multiple)
  // 3.  itemize to include qty and continue
  function receipt() {
    var itemizedList = "";
    var quantifiedItems = buildQuantifiedItems();

    // new below    
    for (var key in quantifiedItems) {
      var qty = quantifiedItems[key].qty
      var item = quantifiedItems[key].product
      itemizedList += "" + qty + " " + item.description + " : " + taxRate.costWithTax(item).toFixed(2) + "\n";
    }
    return itemizedList + salesTaxLine() + "\n" + totalLine();
  }

  function items() {
    return _items;
  }

  /*
    Private Methods
    ---
  */

  function salesTaxLine() {
    return "Sales Taxes: " + salesTax().toFixed(2);
  }

  function totalLine() {
    return "Total: " + totalAmount().toFixed(2);
  }

  function buildQuantifiedItems() {
    var quantifiedItems = {};
    for (var i = 0; i < _items.length; i++) {      
      if (typeof quantifiedItems[_items[i].description] === "undefined") {
        quantifiedItems[_items[i].description] = {description: _items[i].description, product: _items[i]};
      }
      // setup the count to zero if first time
      if (typeof quantifiedItems[_items[i].description].qty === "undefined") {
        quantifiedItems[_items[i].description].qty=0;      
      }       
      quantifiedItems[_items[i].description].qty++;
    }
    return quantifiedItems;
  }

  return {
    addItem: addItem,
    items: items,
    subTotal: subTotal,
    salesTax: salesTax,
    totalAmount: totalAmount,
    receipt: receipt
  };
};