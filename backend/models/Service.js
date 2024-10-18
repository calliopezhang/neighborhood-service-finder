const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Service', ServiceSchema);
