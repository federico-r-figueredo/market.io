const { Product } = require('../models/ProductModel');

class ProductRepository {
    async createProduct({
        name,
        description,
        category,
        unit,
        price,
        available,
        suplier,
        banner
    }) {
        const product = new Product({
            name,
            description,
            category,
            unit,
            price,
            available,
            suplier,
            banner
        });
        return product.save();
    }

    async getProducts() {
        return Product.find().limit(10).sortBy({ name: 1 });
    }

    async getProductsById(ids) {
        return Product.find()
            .where('_id')
            .in(ids.map((x) => x))
            .exec();
    }

    async getProductById(id) {
        return Product.findById(id);
    }

    async getProductsByCategory(category) {
        return Product.find({ category }).limit(10).sort({ name: 1 });
    }
}

module.exports = ProductRepository;
