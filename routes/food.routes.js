const {Router} = require('express')
const {check, query} = require('express-validator')
const router = Router()
const FoodConroller = require('../controllers/foodController')

router.get(
    '/',
    FoodConroller.getAll
)

router.post(
    '/',
    [
        check('title', 'Отсутствует заголовок').exists(),
        check('description', 'Отсутствует описание').exists(),
        check('price', 'Некорректная цена').isNumeric()
    ],
    FoodConroller.add
)

router.delete(
    '/',
    [
        check('_id', 'Отсутствует блюдо').exists()
    ],
    FoodConroller.deleteOne
)

router.get(
    '/few',
    [
        query('id').exists().isJSON()
    ],
    FoodConroller.getFew
)


module.exports = router