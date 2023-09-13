const { Address } = require('../models/AddressModel');
const bcrypt = require('bcrypt');
const { Customer } = require('../models/CustomerModel');

class CustomerRepository {
    async getCustomerById(id) {
        return Customer.findById(id);
    }

    async getCustomerByEmail(email) {
        return Customer.findOne({ email });
    }

    async existsByEmail(email) {
        return Customer.exists({ email });
    }

    async createCustomer({
        firstName,
        lastName,
        email,
        password,
        salt,
        phone
    }) {
        const customer = new Customer({
            firstName,
            lastName,
            email,
            password,
            salt,
            phone
        });
        return customer.save();
    }

    async createAddress({ street, postalCode, city, country }) {
        const address = new Address({
            street,
            postalCode,
            city,
            country
        });

        return address.save();
    }

    async getWishlist(customerId) {
        return Customer.findById(customerId).populate('wishlist').wishlist;
    }

    async addToWishlist(customerId, product) {
        const customer = Customer.findById(customerId).populate('wishlist');
        if (!customer)
            throw new Error(`Customer w/ id = ${customerId} wasn't found.`);

        const wishlist = customer.wishlist;
        if (wishlist < 1) throw new Error(`Wishlist can't be empty.`);

        let exists = false;
        wishlist.map((item) => {
            if (item._id.toString() === product._id.toString()) {
                const index = wishlist.indexOf(item);
                wishlist.splice(index, 1);
                exists = true;
            }
        });

        if (!exists) wishlist.push(product);
    }
}

module.exports = CustomerRepository;
