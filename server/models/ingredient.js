const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'recipe'
    },
    name: { type: String },
    measurement: { type: String}
})

module.exports = mongoose.model('ingredient', IngredientSchema)