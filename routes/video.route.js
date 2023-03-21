const express = require('express');
const router = express.Router();

const VideoController = require('../controllers/video.controller')
const jwt = require('jsonwebtoken')

router.get("/", VideoController.getVideos)

router.get("/channel/:id", VideoController.getVideoChanel)

//create a new video
router.post("/", VideoController.postVideo)

router.get("/:slug", VideoController.getVideo)
router.patch("/:slug", VideoController.checkOwnVideo, VideoController.updateVideo)

router.delete("/:slug", VideoController.deleteVideo)

module.exports = router