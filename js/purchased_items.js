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
    return 0;
  }
  function salesTax() {
    var _salesTax = 0;
    for (var i = 0; i < _items.length; i++) {
      _salesTax += (_items[i].price * taxRate.salesTaxRate);
    };
    return parseFloat(_salesTax.toFixed(2));
  }
  function totalAmount() {
    return 0;
  }
  function receipt() {
    return "";
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