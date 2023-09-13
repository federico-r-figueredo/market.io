const router = require('express').Router();
const { validateAddress } = require('../data/models/AddressModel');
const {
    validateCustomer,
    validateLogin
} = require('../data/models/CustomerModel');
const { async, authenticate } = require('../middleware');
const { format } = require('../utils/format');
const CustomerService = require('../service/CustomerService');
const service = new CustomerService();

router.post(
    '/register',
    async(async (req, res) => {
        const { error } = validateCustomer(req.body);
        if (error)
            return res.status(400).send(format(error.details[0].message, true));

        const isRegistered = await service.isRegistered(req.body.email);
        if (isRegistered)
            return res
                .status(400)
                .send(
                    format(
                        `Customer with email ${req.body.email} has been already registered`,
                        true
                    )
                );

        const customer = await service.register(req.body);

        return res.send(format(customer));
    })
);

router.post(
    '/login',
    async(async (req, res) => {
        const { error } = validateLogin(req.body);
        if (error)
            return res.status(400).send(format(error.details[0].message, true));

        const isRegistered = await service.isRegistered(req.body.email);
        if (!isRegistered)
            return res
                .status(404)
                .send(
                    format(
                        `A customer registered with email ${req.body.email} wasn't found`,
                        true
                    )
                );

        const result = await service.login(req.body);
        if (!result.success) return res.status(400).send(format(result));

        return res.status(200).send(format(result));
    })
);

router.post(
    '/address',
    authenticate,
    async(async (req, res) => {
        const { error } = validateAddress(req.body);
        if (error)
            return res.status(400).send(format(error.details[0].message, true));

        const { id } = req.user;
        const address = await service.addAddress(id, req.body);

        return res.status(200).send(format(address));
    })
);

router.get(
    '/profile',
    authenticate,
    async(async (req, res, next) => {
        const { id } = req.user;
        const customer = await service.getProfile(id);
        if (!customer)
            return res
                .status(404)
                .send(
                    format(
                        `A customer registered with email ${req.body.email} wasn't found`,
                        true
                    )
                );

        return res.send(format(customer));
    })
);

router.get(
    '/shopping-details',
    authenticate,
    async(async (req, res, next) => {
        const { id } = req.user;
        const shoppingDetails = (await service.getShoppingDetails(id)) || {};

        return res.send(format(shoppingDetails));
    })
);

router.get(
    '/wishlist',
    authenticate,
    async(async (req, res, next) => {
        const { id } = req.user;
        const wishlist = (await service.getWishlist(id)) || [];

        return res.send(format(wishlist));
    })
);

module.exports = router;
