const {validationResult} = require("express-validator");
const FoodCategory = require('../models/FoodCategory')

class AuthController {
    async getAll (req, res) {
        try {
            const categories = await FoodCategory.find()

            res.status(200).json(categories)
        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова. Ошибка: ${e}`})
        }
    }


    async getAllWithFoods (req, res) {
        try {
            const categories = await FoodCategory.find().populate('foods')

            res.status(200).json(categories)
        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова. Ошибка: ${e}`})
        }
    }


    async add (req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при создании категории блюд'
                })
            }

            const { title } = req.body

            const category = new FoodCategory({ title })

            await category.save()

            const categories = await FoodCategory.find()

            res.status(201).json({message: 'Категория блюд создана', categories})
        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова. Ошибка: ${e}`})
        }
    }


    async deleteOne (req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный ID'
                })
            }

            const { _id } = req.query

            const category = await FoodCategory.findOne({_id})

            if (!category) {
                return res.status(400).json({ message: 'Указанная категория отсутствует' })
            }

            await category.remove()

            const categories = await FoodCategory.find()

            res.json({ message: "Категория успешно удалена", categories })
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
}

module.exports = new AuthController()