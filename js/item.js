/**
 * Item objects represent products that have:
 *  'price' - the cost of the item
 *  'isImported' - if the item is an imported product
 *  'description' - self describing
 *
 * Example usage:
 *  var options = {desc: "War and Peace", type: "book", imported: false, price: 12.49};
 *  var book = new Item(options);
 */
 
var Item = function (options) {
  var type, price, description, isImported, sku;
  
  if (typeof options === "undefined")
    throw new Error("Missing required options when instantiating Item"); 

  // setup the item with the given options
  initialize(options);

  /*
   * Public Methods
   * --------------
   */

  // Set the item type and quietly raise errors for invalid types
  function setType(itemType) {

    // Is the string supplied a valid type?
    if (isValidType(itemType)) {
      type = itemType;
    }
    else {
      // Continue processsing but raise an error in the javascript console    
      console.error("Attempted to set invalid type of '"+itemType+"'"); 
    }
  }

  /*
   * Private Methods
   * ---------------
   */
   
  function initialize(options) {

    // Was the "price" option provided?
    if (typeof options.price === "undefined") {      
      throw new Error("Missing required attribute 'price'");  // Halt processing and throw an exception
    }
    
    // setup the item using the options
    price = options.price;  
    setType(options.type);
    description = options.desc;
    isImported = options.imported;
    sku = options.sku;

    // Was the sku provided?
    if (typeof options.sku === "undefined") {
      sku = getGuid(); // NO - generate a GUID for the item
    }
  }

  // Is the provided itemType a valid type?
  function isValidType(itemType) {

    // Is the string found within the validTypes array?
    if (Item.validTypes.indexOf(itemType) < 0)
      return false; // NO
    
    return true; // YES
  }

  // random string
  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
           .toString(16)
           .substring(1);
  };

  // create a guid
  function getGuid() {
      return s4()+s4()+s4()+s4();
  }

  // Make available the public methods
  return {
    setType: setType,
    type: type,
    sku: sku,
    description: description,
    price: price,
    isImported: isImported
  };
};

// GLOBAL item types
Item.validTypes = ["book", "food", "medical", "music", "perfume"];