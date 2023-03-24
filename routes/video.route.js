const express = require('express');
const router = express.Router();

const VideoController = require('../controllers/video.controller')
const jwt = require('jsonwebtoken')


router.get("/channel/:id", VideoController.getVideoChanel)
router.get("/id/:id", VideoController.getVideoById)
router.patch("/favorites/:slug", VideoController.favoriteVideo)
router.patch("/favorites/remove/:slug", VideoController.deleteFavoriteVideo)

router.get("/", VideoController.getVideos)
router.post("/", VideoController.postVideo)
router.get("/:slug", VideoController.getVideo)
router.patch("/:slug", VideoController.checkOwnVideo, VideoController.updateVideo)
router.delete("/:slug", VideoController.deleteVideo)

module.exports = router
