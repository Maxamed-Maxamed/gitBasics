export class Catalogue {
  constructor(title) {
    this.title = title;
    this.products = [];
  }

  /**
   * The function "findProductById" 
   * searches for a product in an array of products based on its ID and
   * returns the matching product.
   * @param id - The `id` parameter is the 
   * unique identifier of the product that you want to find.
   * @returns the product object that matches the given id.
   */
  findProductById(id) {
    const match = this.products.find((product) => id === product.id);
    return match;
  }

  /**
   * The addProduct function checks if a product with 
   * the same id already exists in the products array,
   * and if not, adds the product to the array and returns true, 
   * otherwise returns false.
   * @param product - The parameter "product" is an object that represents a product. 
   * It should have an
   * "id" property that uniquely identifies the product.
   * @returns The addProduct function returns a boolean value. 
   * It returns true if the product was
   * successfully added to the products array, 
   * and false if the product already exists in the array.
   */
  addProduct(product) {
    if (!this.findProductById(product.id)) {
      this.products.push(product);
      return true;
    }
    return false;
  }

  /**
   * The function removes a product from an array of 
   * products based on its ID and returns the removed
   * product.
   * @param id - The "id" parameter is the 
   * unique identifier of the product that needs to be removed.
   * @returns The removed product is being returned.
   */
  removeProductById(id) {
    const removedProduct = this.findProductById(id);
    if (removedProduct) {
      this.products = this.products.filter(
        (product) => product.id !== id // ***********
      );
    }
    return removedProduct;
  }



  /**
   * The function removes a product from an array of 
   * products based on its ID and returns the removed
   * product.
   * @param id - The "id" parameter 
   * is the unique identifier of the product that needs to be removed.
   * @returns The removed product is being returned.
   */
  removeProductById(id) {
    const removedProduct = this.findProductById(id);
    if (removedProduct) {
      this.products = this.products.filter(
        (product) => product.id !== id // ***********
      );
    }
    return removedProduct;
  }



  
 /**
  * The function "checkReorders" 
  * checks the stock quantity of products and returns 
  * a list of product
  * IDs that need to be reordered.
  * @returns an object with two properties: "type" and "productIds".
  */
  // checkReorders() {
  //   const result = { type: "Reorder", productIds: [] };
  //   this.products.forEach( (p) => {
  //     if (p.quantityInStock <= p.reorderLevel) {
  //       result.productIds.push(p.id);
  //     }
  //   });
  //   return result;
  // }

 /**
  * The function "checkReorders" returns an object containing 
  * the type "Reorder" and an array of
  * product IDs for products that need 
  * to be reordered based on their quantity in stock and reorder
  * level.
  * @returns The function `checkReorders()` 
  * returns an object with two properties: `type` and
  * `productIds`. The `type` property is 
  * set to the string value "Reorder", and the `productIds`
  * property is an array of product IDs.
  */
  checkReorders() {
    const result = { type: "Reorder", productIds: [] };
    result.productIds = this.products
      .filter((p) => p.quantityInStock <= p.reorderLevel)
      .map((p) => p.id);
    return result;
  }

  /**
   * The function `batchAddProducts` adds 
   * valid products from a batch to a collection and returns the
   * number of products added.
   * @param batch - The `batch` parameter 
   * is an object that contains information about a batch of
   * products. It has a property called `products`, 
   * which is an array of product objects. Each product
   * object has properties such as `id` (unique identifier for the product) and `quantityInStock` (the
   * quantity of
   * @returns the number of valid additions that were successfully added to the product inventory.
   */
  batchAddProducts(batch) {
    const invalidAdditions = batch.products.filter(
      (product) => this.findProductById(product.id) !== undefined
    );
    if (invalidAdditions.length > 0 ) {
      throw new Error('Bad Batch')
    }
    const validAdditions = batch.products.filter(
      (product) => product.quantityInStock > 0
    );
    validAdditions.forEach( (p) => this.addProduct(p) );
    return validAdditions.length;
  }



}