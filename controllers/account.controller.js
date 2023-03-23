const AccountModel = require('../models/account.model')
const bcrypt = require("bcrypt")

const jwt = require('jsonwebtoken')

const getAccounts = (req, res, next) => {
	console.log(1);
	var confirm;
	AccountModel.find({})
		.then(data => {
			confirm = res.json(data);
		})
		.catch(err => {
			confirm = res.json(err)
		})
	return confirm
}

const createAccount = (req, res, next) => {
	const username = req.body.username
	const fullname = req.body.fullname
	const password = req.body.password
	const description = req.body.description
	AccountModel.create({
		username: username,
		password: password,
		fullname: fullname,
		description: description
	})
		.then(data => {
			res.json(data)
		})
		.catch(err => {
			console.log(err);
			res.json(err)
		})
}

const updateAccount = (req, res, next) => {
	const username = req.params.username
	const password = req.body.password
	AccountModel.findOne({
		username: username,
	})
		.then(data => {

			if (data) {
				bcrypt.hash(password, 10, function (err, hash) {
					res.json(hash)
					if (hash) {
						AccountModel.findOneAndUpdate({ username: username }, {
							password: hash
						}, { returnDocument: 'after' })
							.then(data => {
								res.json(data);
							})
							.catch(err => {
								res.json(err)
							})
					}
				});
			} else {
				res.json('Khong co tai khoan')
			}
		})
		.catch(err => {
			res.json(err)
		})
}

const addFavoriteVideo = (req, res, next) => {
	const accountId = req.params.id
	const videoId = req.body._id
	console.log('acc ' +accountId);
	console.log('video ' +videoId);
	AccountModel.findByIdAndUpdate(accountId, { "$push": { favorites: videoId } }, { returnDocument: 'after' })
		.then(data => {
			console.log('data' + data);
			res.json(data);
		})
		.catch(err => {
			res.json('loi')
		})
}

const deleteFavoriteVideo = (req, res, next) => {
	const accountId = req.params.id
	const videoId = req.body._id
	AccountModel.findByIdAndUpdate(accountId, { "$pull": { favorites: videoId } }, { returnDocument: 'after' })
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			res.json('loi')
		})
}

const loginAccount = (req, res, next) => {
	const username = req.body.username
	const password = req.body.password
	AccountModel.findOne({
		username: username,
	})
		.then(data => {
			if (data) {
				bcrypt.compare(password, data.password, function (err, result) {
					if (result) {
						var token = jwt.sign({
							_id: data._id
						}, 'videoshistory')
						res.cookie('token', token, { expires: new Date(Date.now() + 90000000000) });
						res.json({ message: 'dang nhap thanh cong', token: token, data })
					} else {
						res.json({ wrongPassword: 'Sai mật khẩu' })
					}
				})
			} else {
				res.json({ wrongUsername: 'Username không tồn tại' })
			}
		})
		.catch(err => {
			res.json({ message: 'co loi server' })
		})
	// console.log(req.body);
}

const getAccountByUsername = (req, res, next) => {
	const username = req.params.username
	AccountModel.findOne({ username: username })
		.then(data => {
			res.json(data)
		})
		.catch(err => {
			res, json(err)
		})
}
const getAccountById = (req, res, next) => {
	const id = req.params.id
	AccountModel.findById(id)
		.then(data => {
			res.json(data)
		})
		.catch(err => {
			res, json(err)
		})
}



module.exports = { getAccounts, createAccount, loginAccount, getAccountByUsername, getAccountById, updateAccount, addFavoriteVideo, deleteFavoriteVideo }