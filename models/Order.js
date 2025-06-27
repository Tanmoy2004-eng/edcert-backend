const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    whatsapp: String,
    paymentMethod: String,
    certificateType: String,
    status: {
        type: String,
        default: 'Contacting Provider'
    },
    orderId: String
});

module.exports = mongoose.model('Order', OrderSchema);