const express = require ("express");
const router = express.Router();
const neaController = require ("../controllers/NeaApiController")

router.post("/create", neaController.createNea);
router.put("/edit", neaController.updateNea);
router.delete("/delete", neaController.deleteNea);