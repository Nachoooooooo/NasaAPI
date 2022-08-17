const express = require ("express");
const router = express.Router();
const userController = require ("../controllers/UserApiController");


router.get("/", userController.getPorEmailUser,userController.getUsers);
router.post("/create", userController.createUser);
router.put("/edit", userController.updateUser);
router.delete("/delete/:email", userController.removeUser);


module.exports = router
