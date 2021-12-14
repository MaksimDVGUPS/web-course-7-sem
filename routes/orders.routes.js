const {Router} = require('express')
const OrdersController = require('../controllers/ordersController');
const router = Router()

router.post(
    '/',
    OrdersController.sendMail)

module.exports = router