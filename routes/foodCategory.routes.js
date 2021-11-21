const {Router} = require('express')
const {check} = require('express-validator')
const router = Router()
const FoodCategoryController = require('../controllers/foodCategoryController')


router.post(
    '/',
    [
        check('title', 'Отсутствует название').exists()
    ],
    FoodCategoryController.add
)

router.get(
    '/',
    FoodCategoryController.getAll
)

router.get(
    '/with-foods',
    FoodCategoryController.getAllWithFoods
)

router.delete(
    '/',
    [
        check('_id', 'Отсутствует категория').exists()
    ],
    FoodCategoryController.deleteOne
)


module.exports = router