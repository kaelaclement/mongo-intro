const express = require('express');
require('dotenv').config();
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
mongoose.connect(process.env.DATABASE_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
const port = process.env.PORT || 3000;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const userRouter = require('./routes/user');
// const User = require('./models/userModel');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'supersecuresecret',
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	resave: false,
	saveUninitialized: false
}));

// app.use(async (req, res) => {
// 	let loggedIn = req.session.user;

// 	if (loggedIn) {
// 		res.locals.loggedIn = true;
// 		res.locals.userName = req.session.user;
// 	} else {
// 		res.locals.loggedIn = false;
// 	}
// })

app.engine('.hbs', hbs({
	defaultLayout: 'layout',
	extname: 'hbs'
}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => {
	res.render('index');
});

app.use('/', userRouter);

app.listen(port, () => console.log(`listening on port ${port}`));