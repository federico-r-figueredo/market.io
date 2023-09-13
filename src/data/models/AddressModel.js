const { model, Schema } = require('mongoose');
const Joi = require('joi');

const AddressModel = model(
    'address',
    new Schema({
        street: {
            type: String,
            minLength: 5,
            maxLength: 50,
            required: true,
            unique: true
        },
        postalCode: {
            type: String,
            minLength: 3,
            maxLength: 10,
            required: true
        },
        city: {
            type: String,
            minLength: 5,
            maxLength: 50,
            required: true
        },
        country: {
            type: String,
            minLength: 5,
            maxLength: 50,
            required: true
        }
    })
);

function validateAddressModel(address) {
    const schema = {
        street: Joi.string().min(5).max(50).required(),
        postalCode: Joi.string().min(2).max(5).required(),
        city: Joi.string().min(5).max(50).required(),
        country: Joi.string().min(5).max(50).required()
    };

    return Joi.validate(address, schema);
}

module.exports = {
    Address: AddressModel,
    validateAddress: validateAddressModel
};
