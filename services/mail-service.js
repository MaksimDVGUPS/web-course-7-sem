const nodemailer = require('nodemailer')
const config = require('config')

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.get('smtp_host'),
            port: config.get('smtp_port'),
            secure: false,
            auth: {
                user: config.get('smtp_user'),
                pass: config.get('smtp_password'),
            }
        })
    }

    async sendOrderMail (username, phone, address, message, cart) {
        let cartHtml = ''

        if (cart) {
            cart.forEach(food => {
                cartHtml += `
                <hr>
                <strong>${food.title}</strong>
                <p>Количество: ${food.quantity}</p>
                <p>Стоимость: ${food.quantity * food.price}</p>
            `
            })
        }

        const response = await this.transporter.sendMail({
            from: config.get('smtp_user'),
            to: config.get('smtp_user'),
            subject: 'Заявка с сайта Тайжгуч',
            text: '',
            html: `
                <h1>Новая заявка с сайта Тайжгуч</h1>
                <p>Имя: ${username}</p>
                <p>Номер телефона: ${phone}</p>
                <p>Адрес: ${address}</p>
                <p>Комметарий: ${message}</p>
                ${cartHtml ?
                    `<hr>
                    <strong>Блюда в заказе:</strong>
                    ${cartHtml}`
                    : '' 
                }
            `
        }, (err, info) => {
            if (err) {
                console.log(err)
                return false
            } else {
                console.log(`Email sent: ${JSON.stringify(info)}`)
                return true
            }
        })

        return response
    }
}

module.exports = new MailService()