tdd_sales_tax
=============

Running examples using jasmine:
http://troygdaniel.com/sales_tax_kata/jasmine/spec_runner.html

There are 3 main classes.  
- __Item__ has product description, price and a boolean flag identifying if it's an imported product
- __TaxRate__ configures the sales tax rate, import tax rate and lists exemptions from sales tax
- __PurchasedItems__ has the __TaxRate__ and an array of Items

Here is how you would implement the above classes:
```javascript

// Define an item (product)
var book = new Item({desc: "book", type: "book", imported: false, price: 12.49});

// TaxRate configured with import tax rates, sales tax rates and exceptions from sales taxes
var taxRate = new TaxRate({salesTaxRate: 0.1, importTaxRate: 0.05, exemptions: ["book", "food", "medical"]});

// Create a shopping cart
var purchases = new PurchasedItems(taxRate);

// Add items 
purchases.addItem(book);

// Display running totals
purchases.salesTax() // gets sales tax
purchases.totalAmount() // gets total cost
purchases.receipt() // prints receipt
```

The __Item__ class was created to describe the product witout any understanding of taxes.   The __TaxRate__ class was created to seperate concerns from the __Item__ and the __PurchasedItems__

```javascript
var book = new Item({desc: "book", type: "book", imported: false, price: 12.49});
var musicCD = new Item({desc: "music CD", type: "music", imported: false, price: 14.99});
var taxRate = new TaxRate({salesTaxRate: 0.1, importTaxRate: 0.05, exemptions: ["book", "food", "medical"]});

// TaxRate can identify if an item is exempt from taxes.
taxRate.isExempt(book); // returns true
taxRate.isExempt(musicCD) // return false

// TaxRate can also provide how much tax an item would be charged
taxRate.taxForItem(book);  // returns 0
taxRate.taxForItem(musicCD);  // returns 1.5
```

This allows the __PurchasedItems__ class to use an instance of a __TaxRate__ to calculate taxes.

```javascript
var taxRate = new TaxRate({salesTaxRate: 0.1, importTaxRate: 0.05, exemptions: ["book", "food", "medical"]});

var purchases = new PurchasedItems(taxRate);
purchases.addItem(book); 
purchases.addItem(musicCD); 
purchases.subTotal(); //  27.48
purchases.salesTax(); // 1.5
purchases.totalAmount() // 28.98

```

The classes and instance variable names were intentionally lifted from the requirements to maintain the same shared understanding of the problem.

## Relevant test cases:
	https://github.com/troygdaniel/tdd_sales_tax/blob/master/jasmine/purchased_items_spec.js
	https://github.com/troygdaniel/tdd_sales_tax/blob/master/jasmine/tax_rate_spec.js
	https://github.com/troygdaniel/tdd_sales_tax/blob/master/jasmine/item_spec.js

## Running example:
	http://troygdaniel.com/sales_tax_kata/jasmine/spec_runner.html

## JS source code:
	https://github.com/troygdaniel/tdd_sales_tax/blob/master/js/item.js
	https://github.com/troygdaniel/tdd_sales_tax/blob/master/js/purchased_items.js
	https://github.com/troygdaniel/tdd_sales_tax/blob/master/js/tax_rate.js
