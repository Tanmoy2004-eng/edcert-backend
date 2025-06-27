const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.placeOrder);
router.get('/:orderId', orderController.trackOrder);
router.put('/:orderId', orderController.updateStatus);

module.exports = router;