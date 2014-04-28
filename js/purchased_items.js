/*
  + initialize ( t <TaxRates> )
  - items (Array of <Item>)    
  - tax_rate (describes sales and import tax)
    { import: 0.05, sales: 0.10 }
  + addItem ( i <Item> )
  + items() returns the array of items
  + sub_total
  + total_tax
  + total_amount
  + receipt 

  Example:
  > purchases =  new PurchasedItems(taxRate)
  > purchases.addItem(item)
  > purchases.receipt
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
    var salesTaxLine = "Sales Taxes: " + salesTax().toFixed(2);
    var totalLine = "Total: " + totalAmount().toFixed(2);

    for (var i = 0; i < _items.length; i++) {
      var item = _items[i];
      itemizedList += "1 " + item.description + " : " + taxRate.costWithTax(item).toFixed(2) + "\n";
    };
    return itemizedList + salesTaxLine + "\n" + totalLine;
  }

  function items() {
    return _items;
  }

  /*
    Private Methods
    ---
  */
  return {
    addItem: addItem,
    items: items,
    subTotal: subTotal,
    salesTax: salesTax,
    totalAmount: totalAmount,
    receipt: receipt
  };
};