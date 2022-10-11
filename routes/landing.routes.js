const express = require ("express");
const router = express.Router();
const landingController = require ("../controllers/LandingApiController")

router.get("/",landingController.getNombreMasaPorMasaIgualSuperior,landingController.getNombreMasaFechaPorFecha);
router.get("/mass/:mass",landingController.getNombreMasaPorMasaIgual);
router.get("/class/:recclass", landingController.getNombreClasePorClase);
router.post("/create",landingController.createLanding);
router.put("/edit",landingController.updateLanding);
router.delete("/delete/:id",landingController.deleteLanding);


module.exports = router;