/*
  Item
  - 'price' is the cost of the product
  - 'type' must belong to a valid type (Item.validTypes) 
  - 'desc' describes the product
  - 'imported' is 'true' if the product is imported
*/
Item = function (options) {
  var type, price, description, isImporteds;
  
  initialize(options);

  /*
    Public Methods
    ---
  */
  function setType(itemType) {
    if (isValidType(itemType)) {
      type = itemType;
    }
    else {
      console.error("Attempted to set invalid type of '"+itemType+"'"); 
    }
  }

  /*
    Private Methods
    ---
  */
  function initialize(options) {
    if (typeof options.price === "undefined") {
      throw new Error("Missing required attribute 'price'"); 
    }
    price = options.price;  
    setType(options.type);
    description = options.desc;
    isImported = options.imported;
  }
  function isValidType(itemType) {
    if (Item.validTypes.indexOf(itemType) < 0)
      return false;
    return true;
  }

  return {
    setType: setType,
    type: type
  };
};
// GLOBAL item types
Item.validTypes = ["book", "food", "medical", "music", "perfume"];

