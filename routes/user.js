const { Router } = require('express');
const router = Router();

const User = require('../models/userModel');

router.get('/signup', (req, res) => {
	res.render('signup');
});

router.post('/signup', async (req, res) => {
	let { name, userName, email, password } = req.body;
	if (!name || !userName || !email || !password) {
		res.render('signup', { err: 'Please provide all credentials' });
		return;
	}

	const user = new User({
		name: name,
		userName: userName,
		email: email,
		password: password
	});

	// await user.save()
	user.save()
		.then(success => res.redirect(`/profile/${userName}`))
		.catch(error => {
			res.render('signup', { err: 'A user with that username or email already exists' });
		});

	// res.redirect(`/profile/${req.body.userName}`);
});

router.get('/login', (req, res) => {
	res.render('login');
});

router.post('/login', async (req, res) => {
	let { userName, password } = req.body;
	if (!userName || !password) {
		res.render('login', { err: 'Please fill out all fields' });
		return;
	}

	let user = await User.findOne({ userName: userName });
	if (user && password == user.password) {
		req.session.user = user.id;
		res.redirect(`/profile/${userName}`);
	} else if (user) {
		res.render('login', { err: 'Incorrect password' });
	} else {
		res.render('login', { err: 'User not found' });
	}
});

router.get('/profile/:username', async (req, res) => {
	let user = await User.findOne({ userName: req.params.username });
	if (user) {
		res.render('profile', { user: user.toObject() });
	} else {
		res.render('index', { err: 'User not found' });
	}
});

module.exports = router;