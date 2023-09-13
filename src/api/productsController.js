const router = require('express').Router();
const { validateProduct } = require('../data/models/ProductModel');
const { authenticate, async } = require('../middleware');
const { format } = require('../utils/format');
const ProductService = require('../service/ProductService');
const CustomerService = require('../service/CustomerService');

const productService = new ProductService();
const customerService = new CustomerService();

router.get(
    '/:id',
    authenticate,
    async(async (req, res) => {
        const id = req.params.id;
        if (!id)
            return res
                .status(400)
                .send(format('Route parameter id is required', true));

        const product = await productService.getProductById(id);
        if (!product)
            return res.status(404).send(format('Product not found', true));

        return res.status(200).send(format(product));
    })
);

router.get(
    '/',
    authenticate,
    async(async (req, res) => {
        const { ids } = req.body;
        if (!ids)
            return res
                .status(400)
                .send(format('Route parameter ids is required', true));

        const products = await productService.getProductsById(ids);

        return res.status(200).send(format(products));
    })
);

router.get(
    '/category/:category',
    authenticate,
    async(async (req, res) => {
        const category = req.params.category.toLowerCase();
        if (!category)
            return res
                .status(400)
                .send(format('Route parameter category is required', true));

        const products = await productService.getProductsByCategory(category);
        if (!products)
            return res.status(404).send(format('Product not found', true));

        return res.status(200).send(format(products));
    })
);

router.post(
    '/create',
    authenticate,
    async(async (req, res) => {
        const { error } = validateProduct(req.body);
        if (error)
            return res.status(400).send(format(error.details[0].message, true));

        const product = await productService.createProduct(req.body);
        return res.status(200).send(format(product));
    })
);

router.post(
    '/wishlist',
    authenticate,
    async(async (req, res) => {
        const product = await productService.getProductById(req.body.id);
        const wishlist = await customerService.addToWishlist(
            req.user.id,
            product
        );

        return res.status(200).send(format(wishlist));
    })
);

module.exports = router;
