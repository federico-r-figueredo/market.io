const bcrypt = require('bcrypt');

module.exports = {
    generateSalt: async (rounds = 10) => await bcrypt.genSalt(rounds),
    hashPassword: async (password, salt) => await bcrypt.hash(password, salt),
    validatePassword: async (inputPassword, userPassword) =>
        await bcrypt.compare(inputPassword, userPassword)
};
