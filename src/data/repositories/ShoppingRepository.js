const { Customer } = require('../models/CustomerModel');
const { Product } = require('../models/ProductModel');
const { Order } = require('../models/OrderModel');

class ShoppingRepository {
    async getOrders(customerId) {
        return Order.find({ customerId }).populate('items.product');
    }

    async createOrder(customerId, transactionId) {
        const customer = Customer.findById(customerId).populate('cart.product');

        if (!customer)
            throw new Error(
                `A customer with ID ${req.body.email} wasn't found`
            );

        let amount = 0;
        let items = customer.cart;
        if (items < 1) throw new Error('Cart must have at least one item');

        items.map((item) => parseInt(item.product.price) * parseInt(item.unit));

        const order = new Order({
            customerId,
            transactionId,
            amount,
            status: 'received',
            items
        });

        customer.cart = [];

        order.populate('items.product').execPopulate();
        const orderResult = await order.save();

        customer.orders.push(orderResult);
        await customer.save();

        return orderResult;
    }
}

module.exports = ShoppingRepository;
