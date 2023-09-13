const { model, Schema } = require('mongoose');
const { ObjectId } = Schema.Types;
const Joi = require('joi');

const CustomerModel = model(
    'customer',
    new Schema(
        {
            firstName: {
                type: String,
                minLength: 5,
                maxLength: 50,
                required: true
            },
            lastName: {
                type: String,
                minLength: 5,
                maxLength: 50,
                required: true
            },
            email: {
                type: String,
                minLength: 5,
                maxLength: 255,
                required: true,
                unique: true
            },
            password: {
                type: String,
                minLength: 5,
                maxLength: 1024,
                required: true
            },
            phone: {
                type: String,
                minLength: 5,
                maxLength: 50,
                required: true,
                unique: true
            },
            addresses: [
                {
                    type: ObjectId,
                    ref: 'address',
                    required: true
                }
            ],
            cart: [
                {
                    product: {
                        type: ObjectId,
                        ref: 'product',
                        required: true
                    },
                    unit: {
                        type: Number,
                        required: true
                    }
                }
            ],
            wishlist: [
                {
                    type: ObjectId,
                    ref: 'product',
                    required: true
                }
            ],
            orders: [
                {
                    type: ObjectId,
                    ref: 'order',
                    required: true
                }
            ]
        },
        {
            toJSON: {
                transform(doc, ret) {
                    delete ret.password;
                    delete ret.salt;
                    delete ret.__v;
                }
            },
            timestamps: true
        }
    )
);

function validateCustomerModel(customer) {
    const schema = {
        firstName: Joi.string().min(5).max(50).required(),
        lastName: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(1024).required(),
        phone: Joi.string().min(5).max(50),
        addresses: Joi.array().items(Joi.objectId()),
        cart: Joi.array().items(
            Joi.object({
                product: Joi.objectId().required(),
                unit: Joi.number().required()
            })
        ),
        wishlist: Joi.array().items(Joi.objectId()),
        orders: Joi.array().items(Joi.objectId())
    };

    return Joi.validate(customer, schema);
}

function validateLogin(input) {
    const schema = {
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(1024).required()
    };

    return Joi.validate(input, schema);
}

module.exports = {
    Customer: CustomerModel,
    validateCustomer: validateCustomerModel,
    validateLogin: validateLogin
};
