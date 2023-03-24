//npm i mongoose
const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
//connect to mongoose server
mongoose.connect('mongodb://127.0.0.1:27017/videoshistory');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AccountShema = new Schema({
	username: { type: String, required: true, unique: true, min: 5, max: 15 },
	password: { type: String, required: true, min: 8, max: 16 },
	fullname: { type: String, min: 2 },
	description: { type: String },
	favorites: {
		type: [String]
	}
},
	{
		collection: 'accounts',
		timestamps: true
	})

AccountShema.pre('save', function (next) {
	bcrypt.hash(this.password, 10)
		.then(hash => {
			this.password = hash
			next()
		})
		.catch(error => {
			console.log(`Error in hashing password: ${error.message}`);
			next(error);
		});
})

const AccountModel = mongoose.model('accounts', AccountShema)

module.exports = AccountModel