const { ProductRepository } = require('../data/repositories');

module.exports = class ProductService {
    constructor() {
        this.repository = new ProductRepository();
    }

    async createProduct(product) {
        return this.repository.createProduct(product);
    }

    async getProductsByCategory(category) {
        return this.repository.getProductsByCategory(category);
    }

    async getProductsById(ids) {
        return this.repository.getProductsById(ids);
    }

    async getProductById(id) {
        return this.repository.getProductById(id);
    }
};
