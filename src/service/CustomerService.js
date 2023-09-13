const CustomerRepository = require('../data/repositories/CustomerRepository');
const jwt = require('jsonwebtoken');
const {
    generateSalt,
    hashPassword,
    validatePassword
} = require('../utils/crypto');
const { format } = require('../utils/format');
const config = require('config');

module.exports = class CustomerService {
    constructor() {
        this.repository = new CustomerRepository();
    }

    async login({ email, password }) {
        const customer = await this.repository.getCustomerByEmail(email);
        if (!customer)
            return format(
                `A customer registered with email ${req.body.email} wasn't found.`,
                true
            );

        const valid = await validatePassword(password, customer.password);
        if (!valid) return format('Invalid password.', true);

        const token = jwt.sign(
            {
                id: customer.id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                role: 'customer'
            },
            config.get('jwt.privateKey'),
            { expiresIn: '30d' }
        );

        return formatSuccess(token);
    }

    async isRegistered(email) {
        return this.repository.existsByEmail(email);
    }

    async register({ firstName, lastName, email, password, phone }) {
        const salt = await generateSalt();
        const hashedPassword = await hashPassword(password, salt);
        const customer = await this.repository.createCustomer({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone
        });

        return customer;
    }

    async getProfile(id) {
        return this.repository.getCustomerById(id);
    }

    async getShoppingDetails(customerId) {
        return this.repository.getCustomerById(customerId);
    }

    async getWishlist(customerId) {
        return this.repository.getWishlist(customerId);
    }

    async addToWishlist(customerId, product) {
        return this.repository.addToWishlist(customerId, product);
    }

    async addAddress(id, address) {
        const customer = await this.repository.getCustomerById(id);
        if (customer) {
            const newAddress = await this.repository.createAddress(address);
            customer.addresses.push(newAddress);
        }

        return customer.save();
    }
};
