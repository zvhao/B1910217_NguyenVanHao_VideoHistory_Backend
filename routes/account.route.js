const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/account.controller')

router.get("/", AccountController.getAccounts)


//create a new video
router.post("/register", AccountController.createAccount)
router.post("/login", AccountController.loginAccount)
router.get("/account/id/:id", AccountController.getAccountById)
router.get("/account/:username", AccountController.getAccountByUsername)
router.post("/account/:username", AccountController.updateAccount)

router.patch("/favorites/:id", AccountController.addFavoriteVideo)
router.patch("/favorites/remove/:id", AccountController.deleteFavoriteVideo)

// router.delete("/:id", AccountController.deleteVideo)

module.exports = router