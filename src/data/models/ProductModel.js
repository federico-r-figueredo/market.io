const { model, Schema } = require('mongoose');
const Joi = require('joi');

const ProductModel = model(
    'product',
    new Schema(
        {
            name: {
                type: String,
                minLength: 5,
                maxLength: 50,
                required: true,
                unique: true
            },
            description: {
                type: String,
                minLength: 5,
                maxLength: 255,
                required: true
            },
            category: {
                type: String,
                minLength: 3,
                maxLength: 50,
                required: true
            },
            unit: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            available: {
                type: Boolean
            },
            suplier: {
                type: String,
                minLength: 5,
                maxLength: 50,
                required: true
            },
            banner: {
                type: String,
                minLength: 5,
                maxLength: 50
            }
        },
        {
            toJSON: {
                transform(doc, ret) {
                    delete ret.__v;
                }
            },
            timestamps: true
        }
    )
);

function validateProductModel(product) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(255).required(),
        category: Joi.string().min(3).max(50).required(),
        unit: Joi.number().required(),
        price: Joi.number().required(),
        available: Joi.boolean(),
        suplier: Joi.string().min(5).max(50).required(),
        banner: Joi.string().min(5).max(50)
    };

    return Joi.validate(product, schema);
}

module.exports = {
    Product: ProductModel,
    validateProduct: validateProductModel
};
