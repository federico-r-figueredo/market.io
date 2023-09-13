const { model, Schema } = require('mongoose');
const { ObjectId } = Schema.Types;
const Joi = require('joi');

const OrderModel = model(
    'order',
    new Schema(
        {
            customerId: {
                type: ObjectId,
                ref: 'customer',
                required: true
            },
            transactionId: {
                type: String,
                minLength: 5,
                maxLength: 50,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            status: {
                type: String,
                required: true
            },
            items: [
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
            ]
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

function validateOrderModel(order) {
    const schema = {
        customer: Joi.objectId().required(),
        amount: Joi.number().required(),
        transaction: Joi.string().min(5).max(50).required(),
        items: Joi.array().items(
            Joi.object({
                product: Joi.objectId().required(),
                unit: Joi.number().required()
            })
        )
    };

    return Joi.validate(order, schema);
}

module.exports = {
    Order: OrderModel,
    validateOrder: validateOrderModel
};
