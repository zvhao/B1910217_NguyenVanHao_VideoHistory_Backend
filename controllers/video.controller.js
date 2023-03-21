const VideoModel = require("../models/video.model")
const jwt = require('jsonwebtoken')
const AccountModel = require("../models/account.model")

const getVideos = (req, res, next) => {
	try {
		var documents = []
		const { title } = req.query
		if (title) {
			documents = VideoModel.findByTitle({ title: { $regex: new RegExp(title), $options: "i" } })
				.then(data => {
					res.json(data);
				})
				.catch(err => {
					res.json(err)
				})
		} else {
			documents = VideoModel.find({})
				.then(data => {
					res.json(data);
				})
				.catch(err => {
					res.json(err)
				})
		}
	} catch (error) {
		res.json(error)
	}
}

const getVideoChanel = (req, res, next) => {
	const id = req.params.id
	VideoModel.find({ accountId: id })
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			res.json(err)
		})
}

const getVideo = (req, res, next) => {
	const slug = req.params.slug
	VideoModel.findOne({ slug: slug })
		.then(data => {
			res.json(data)
		})
		.catch(err => {
			res.json(err)
		})
}

const postVideo = (req, res, next) => {
	const title = req.body.title
	const videoId = req.body.videoId
	const description = req.body.description
	const content = req.body.content
	const token = req.body.token
	try {
		var accountId = jwt.verify(token, 'videoshistory');
		VideoModel.create({
			title: title,
			videoId: videoId,
			description: description,
			content: content,
			accountId: accountId
		})
			.then(data => {
				res.json(data);
			})
			.catch(err => {
				res.json({ messageErr: "Không thể tạo video, thử lại sau!" })
			})

	} catch (err) {
		res.json({ messageErr: 'Bạn vui lòng đăng nhập lại và thử lại sau!' })
	}

}

const updateVideo = (req, res, next) => {
	const slug = req.params.slug
	const title = req.body.title
	const videoId = req.body.videoId
	const description = req.body.description
	const content = req.body.content
	VideoModel.findOneAndUpdate({ slug: slug }, {
		title: title,
		videoId: videoId,
		description: description,
		content: content
	}, { returnDocument: 'after' })
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			res.json('loi')
		})
}

const checkOwnVideo = (req, res, next) => {
	const token = req.body.token
	const accountId = req.body.accountId
	console.log(req.body);
	var idToken = jwt.verify(token, 'videoshistory')
		// res.json({ errMessage: token})

	if(idToken._id == accountId) {
		return next()
	} else {
		res.json({ errMessage: 'Bạn không sở hữu video'})
	}

}

const deleteVideo = (req, res) => {

	VideoModel.findOneAndDelete({ slug: req.params.slug })
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			res.json('loi')
		})
}



module.exports = { getVideos, getVideoChanel, getVideo, postVideo, updateVideo, checkOwnVideo, deleteVideo }