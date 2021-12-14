const {validationResult} = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

class AuthController {
    async register (req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: `Некорректные данные при регистрации ${req.body}`
                })
            }

            const {email, password} = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: 'Такой пользователь уже существует'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})

            await user.save()

            const users = await User.find()

            users.map(user => {
                user.password = undefined
                return user
            })

            res.status(201).json(users)
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }

    async login (req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(401).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при авторизации'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(401).json({ message: 'Неверный логин и/или пароль' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(401).json({ message: 'Неверный логин и/или пароль' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.status(200).json({ token, userID: user.id, userRole: user.role })
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }

    async checkAuth (req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при проверке доступа'
                })
            }

            const { token } = req.body
            let decodedJWT

            await jwt.verify(token, config.get('jwtSecret'), async (err, decoded) => {
                if (err) {
                    res.status(401).json({ message: 'Некорректный JWT' })
                    return
                }
                decodedJWT = decoded

                const user = await User.findOne( { _id: decodedJWT.userId})

                res.status(200).json({ token, userID: user._id, userRole: user.role })
            })
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', e })
        }
    }

    async getUsers (req, res) {
        try {
            const users = await User.find()

            users.map(user => {
                user.password = undefined
                return user
            })

            res.json(users)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }

    async deleteUser (req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный ID'
                })
            }

            const { _id } = req.query

            const user = await User.findOne({_id})

            if (!user) {
                return res.status(400).json({ message: 'Указанный пользователь отсутствует' })
            }

            await user.remove()

            const users = await User.find()

            users.map(user => {
                user.password = undefined
                return user
            })

            res.json({ message: "Пользователь успешно удален", users })
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
}

module.exports = new AuthController()