const mongoose = require("mongoose");
const { Schema } = mongoose
const userSchema = new Schema(
    {
        name: { type: String, required: true },
        nickname: { type: String },
        email: { type: String },
        picture: { type: String },
        affiliatedNumber: { type: Number, unique: true, required: true },
        affiliationDate: { type: Date },
        occupation: { type: String },
        birthdate: { type: Date },
        neas_discovered: [{ type: mongoose.Types.ObjectId, ref: 'neas' }]
    }
)

const User = mongoose.model("User", userSchema, "users");

module.exports = User