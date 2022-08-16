const mongoose = require("mongoose");
const { Schema } = mongoose
const neaSchema = new Schema(
    {
        designation: {
            type: String,
            required: true
        },
        discovery_date: {
            type: Date,
            required: true
        },
        h_mag: {
            type: Number,
            required: true
        },
        i_deg: {
            type: Number,
            required: true
        },
        moid_au: {
            type: Number,
            required: true
        },
        orbit_class: {
            type: String,
            required: true
        },
        period_yr: {
            type: Number,
            required: true
        },
        pha: {
            type: String,
            required: true
        },
        q_au_1: {
            type: Number,
            required: true
        },
        q_au_2: {
            type: Number,
            required: true
        }
    });


const Nea = mongoose.model("Nea", neaSchema, "neas");

module.exports = Nea;