tdd_sales_tax
=============

Running examples using jasmine:
http://troygdaniel.com/sales_tax_kata/jasmine/spec_runner.html

There are 3 main classes.  
- Item has product description, price and a boolean flag identifying if it's an imported product
- TaxRate configures the sales tax rate, import tax rate and lists exemptions from sales tax
- PurchasedItems has the TaxRate and an array of Items

The Item class was created to describe the product witout any understanding of taxes.  

The TaxRate class can be configured with import tax rates, sales tax rates and exceptions from sales taxes.  TaxRate can identify if an item is exempt from taxes like so:
```javascript
// Define an item (product)
var book = new Item({desc: "book", type: "book", imported: false, price: 12.49});
```
dsds

The classes and instance variable names were intentionally lifted from the requirements to maintain the same shared understanding of the problem.  

```javascript
// Define an item (product)
var book = new Item({desc: "book", type: "book", imported: false, price: 12.49});

// Define a tax rate configuration
var taxRate = new TaxRate({salesTaxRate: 0.1, importTaxRate: 0.05, exemptions: ["book", "food", "medical"]});

// Create a shopping cart
var purchases = new PurchasedItems(taxRate);

// Add items 
purchases.addItem(book);

// Display running totals
purchases.salesTax() // gets sales tax
purchases.totalAmount() // gets total cost
purchases.receipt() // prints receipt

