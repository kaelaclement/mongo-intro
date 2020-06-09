const { Schema, model } = require('mongoose');

let user = new Schema({
	name: { type: String, required: true },
	userName: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
},
	{
		toObject: {
			virtuals: true
		}
	})

module.exports = model('users', user);