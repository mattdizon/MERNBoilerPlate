const mongoose = require(`mongoose`)
const objectSchema = new mongoose.Schema({
    //define the dif properties for schema
    name:{
        type: String,
        required: true
    }
})
//model function takes 2 propeties the name of model and the name of the schema
module.exports = mongoose.model(`object`, objectSchema)
