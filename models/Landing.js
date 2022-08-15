const mongoose = require("mongoose");
const { Schema } = mongoose

const landingSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true,
            unique: true
        },
        nametype: {
            type: String,
            required: true
        },
        recclass: {
            type: String,
            required: true
        },
        mass: {
            type: String,
            required: true
        },
        fall: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        reclat: {
            type: String,
            required: true
        },
        reclong: {
            type: String,
            required: true
        },
        geolocation: {
            latitude: {
                type: String,
                required: true
            },
            longitude: {
                type: String,
                required: true
            }
        }
    });

const Landing = mongoose.model("Landing", landingSchema, "landings")

module.exports = Landing