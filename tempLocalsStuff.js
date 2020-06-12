// app.use(async (req, res, next) => {
// 	let loggedIn = await SessionModel.hasSession(req.sessionID);
// 	res.locals.loggedIn = loggedIn;
// 	if (loggedIn) {
// 		res.locals.userName = req.session.userName;
// 	}
// 	return next();
// });
// session.statics.hasSession = async (sessionID) => {
// 	let session = await this.findById(sessionID);
// 	if (session) {
// 		return true;
// 	}
// 	return false;
// }