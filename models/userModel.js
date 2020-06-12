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
	}
);

user.statics.findUser = async function (body) {
	let user = await this.findOne({ userName: body.userName });
	if (!user) {
		return { success: false, err: "User not found" }
	} else if (user.password != body.password) {
		return { success: false, err: "Password is incorrect" };
	}
	return { success: true, user: user.toObject() };
}

module.exports = model('users', user);