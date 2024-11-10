const { expect } = require("playwright/test");

class ProductPage {
    constructor(page) {
        this.page = page;
        this.listOfProducts = page.locator('.inventory_item');
        this.sortProducts = page.locator('.product_sort_container');
        this.addFirstProduct = page.locator('#add-to-cart-sauce-labs-backpack');
        this.removeProductBag = page.locator('#remove-sauce-labs-backpack');
        this.addSecondProduct = page.locator('#add-to-cart-sauce-labs-bike-light');
        this.shoppingCartIcon = page.locator('.shopping_cart_badge');
        this.shoppingCart = page.locator('.shopping_cart_link');
    }

    // validates the count of products to be 6
    async validateProductsCount() {
        const count = await this.listOfProducts.count();
        expect(count).toBe(6);
    }

    // helper function to validate product details such as name, description and price
    async validateProduct(product, expected) {
        const name = await product.locator('.inventory_item_name').innerText();
        const description = await product.locator('.inventory_item_desc').innerText();
        const price = await product.locator('.inventory_item_price').innerText();

        expect(name).toBe(expected.name);
        expect(description).toBe(expected.description);
        expect(price).toBe(expected.price);
    }

    // ensures products are displayed with correct name, description and price
    async validateProductSpecifications() {
        const expectedProducts = [
            { name: 'Sauce Labs Backpack', description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.', price: '$29.99' },
            { name: 'Sauce Labs Bike Light', description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.", price: '$9.99' },
            { name: 'Sauce Labs Bolt T-Shirt', description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.', price: '$15.99' },
            { name: 'Sauce Labs Fleece Jacket', description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.", price: '$49.99' },
            { name: 'Sauce Labs Onesie', description: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.", price: '$7.99' },
            { name: 'Test.allTheThings() T-Shirt (Red)', description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.', price: '$15.99' },
        ];
        // loop through the expected products and validate each product
        for (let i = 0; i < expectedProducts.length; i++) {
            const product = this.listOfProducts.nth(i);
            await this.validateProduct(product, expectedProducts[i]);
        }
    }

    // validates products are in order after sorting 
    async validateProductSorting() {
        const expectedProducts = [
            {name: 'Sauce Labs Onesie', description: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.", price: '$7.99' },
            {name: 'Sauce Labs Bike Light', description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.", price: '$9.99' },
            { name: 'Sauce Labs Bolt T-Shirt', description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.', price: '$15.99' },
            { name: 'Test.allTheThings() T-Shirt (Red)', description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.', price: '$15.99' },
            { name: 'Sauce Labs Backpack', description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.', price: '$29.99' },
            { name: 'Sauce Labs Fleece Jacket', description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.", price: '$49.99' },
        ];

        // loop through the expected products and validate each product
        for (let i = 0; i < expectedProducts.length; i++) {
            const product = this.listOfProducts.nth(i); // get the product at the current index
            await this.validateProduct(product, expectedProducts[i]); // validate the product
        }
    }
    //sorts the products by price
    async sortProductsByPrice(){
        await this.sortProducts.click();
        await this.page.selectOption('.product_sort_container', 'lohi');
    }

    //sorts products by name from A-Z
    async sortProductsByName(){
        await this.sortProducts.click();
        await this.page.selectOption('.product_sort_container', 'az');
    }



    // add 2 products to the cart and validates the count in the cart to be 2
    async addProductToCart(){
        await this.addFirstProduct.click();
        await this.addSecondProduct.click();
        const itemsNumInCart = await this.shoppingCartIcon.innerText();
        const itemCount = parseInt(itemsNumInCart, 10);
        expect(itemCount).toBe(2);
    }
    //removes 1 product from the cart and validates the count in the cart to be 1
    async removeProductFromCart(){
        await this.removeProductBag.click();
        const itemsNumInCart = await this.shoppingCartIcon.innerText();
        const totalItemsInCart = parseInt(itemsNumInCart, 10);
        expect(totalItemsInCart).toBe(1);;
    }
    //navigates to the cart page
    async navigateToCart(){
        await this.shoppingCart.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
    }


}

module.exports = { ProductPage };
