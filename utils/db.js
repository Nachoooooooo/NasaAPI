const mongoose = require ("mongoose");
const URL = `mongodb+srv://${process.env.ENV_USER_MONGO_DB_ATLAS}:${process.env.ENV_SECRET_KEY_MONGO_DB_ATLAS}@${process.env.ENV_HOST_MONGO_DB_ATLAS}/${process.env.ENV_DATABASE_MONGO_DB_ATLAS}?retryWrites=true&w=majority`
const connection = async () => await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
module.exports = connection

