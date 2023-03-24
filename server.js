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



app.use("/api/videos/", videoRouter)
app.use("/api/auth/", accountRouter)


app.listen('3000', () => {
	console.log('server listening on http://localhost:3000');
})