const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
    try {
        const { name, email, phone, whatsapp, paymentMethod, certificateType } = req.body;
        const orderId = 'ED2023' + Math.floor(Math.random() * 1000);
        const newOrder = new Order({ name, email, phone, whatsapp, paymentMethod, certificateType, orderId });
        await newOrder.save();
        res.status(201).json({ message: 'Order placed', orderId });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.trackOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOne({ orderId });
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findOneAndUpdate({ orderId }, { status }, { new: true });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};