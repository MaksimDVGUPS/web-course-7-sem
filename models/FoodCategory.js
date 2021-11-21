const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    foods: [{type: Types.ObjectId, ref: 'Food'}]
})

module.exports = model('FoodCategory', schema)