const express = require('express')
const app = express()
const videoRouter = require("./routes/video.route")
const accountRouter = require("./routes/account.route")
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')

app.use(cookieParser())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.get('/api/videos/add', (req, res, next) => {
// 	try {
// 		var token = req.cookies.token
// 		var result = jwt.verify(token, 'videoshistory')
// 		if (result) {
// 			next()
// 		}
// 	} catch (error) {
// 		return res.json('loi roi')
// 	}
// }, (req, res, next) => {
// 	res.json('private')
// })

app.use("/api/videos/", videoRouter)
app.use("/api/auth/", accountRouter)


// app.get('/', (req, res, next) => {
// 	res.json('home')
// 	console.log('Cookies: ', req.cookies)

// })

app.listen('3000', () => {
	console.log('server listening on http://localhost:3000');
})