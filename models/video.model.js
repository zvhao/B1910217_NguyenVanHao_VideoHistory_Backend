//npm i mongoose
const mongoose = require('mongoose');

//import slug
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug)

//connect to mongoose server
mongoose.connect('mongodb://127.0.0.1:27017/videoshistory');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const VideoShema = new Schema({
	title: { type: String, required: true },
	videoId: { type: String, required: true },
	slug: { type: String, slug: 'title', unique: true },
	description: { type: String },
	content: { type: String },
	deleted: { type: Boolean, default: false },
	accountId: { type: ObjectId },
	favorites: {
		type: [String]
	}
},
	{
		timestamps: true
	})

const VideoModel = mongoose.model('video', VideoShema)

module.exports = VideoModel


