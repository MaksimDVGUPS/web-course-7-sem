const MailService = require('../services/mail-service')
const Food = require("../models/Food");

class OrdersController {
    async sendMail (req, res) {
        try {
            const {username, phone, address, message, cart} = req.body
            let response

            if (cart) {
                const promises = []
                const cartObject = JSON.parse(cart)

                for (const food of cartObject) {
                    const foodInfo = Food.findOne({_id : food.id}).exec()

                    promises.push(foodInfo)
                }

                let cartData = await Promise.all(promises)

                cartData = cartData.map((value, index) => {
                    return {
                        title: value.title,
                        price: value.price,
                        quantity: cartObject[index].quantity
                    }
                })

                response = await MailService.sendOrderMail(username, phone, address, message, cartData)
            } else {
                response = await MailService.sendOrderMail(username, phone, address, message)
            }

            if (response) {
                throw new Error()
            }

            res.status(200).json({message: 'Заявка отправлена на почту'})
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
}

module.exports = new OrdersController()