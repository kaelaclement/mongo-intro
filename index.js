const express = require('express');
require('dotenv').config();
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
mongoose.connect(`mongodb+srv://kaela:${process.env.MONGOPASS}@cluster0-lbqlb.azure.mongodb.net/users?retryWrites=true&w=majority`, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
const port = process.env.PORT || 3000;

const User = require('./models/userModel');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
	defaultLayout: 'layout',
	extname: 'hbs'
}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/signup', (req, res) => {
	res.render('signup');
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.get('/profile/:username', async (req, res) => {
	let user = await User.findOne({ userName: req.params.username });
	if (user) {
		res.render('profile', { user: user.toObject() });
	} else {
		res.render('index', { err: 'User not found' });
	}
});

app.post('/signup', async (req, res) => {
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

	await user.save()
		.then(success => res.redirect(`/profile/${req.body.userName}`))
		.catch(error => {
			res.render('signup', { err: 'A user with that username or email already exists' });
		});

	// res.redirect(`/profile/${req.body.userName}`);
});

app.listen(port, () => console.log(`listening on port ${port}`));