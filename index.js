import express from 'express';
import http from 'http';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';

import config from './app/config';

const port = process.env.PORT || 3000;
const app = express();

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');
//app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
	secret: 'SECRET-KEY',
	resave: false,
	saveUninitialized: false
}));

passport.serializeUser((user, done) => { done(null, user) });
passport.deserializeUser((user, done) => { done(null, user) });

app.use(passport.initialize());
app.use(passport.session());
app.use('/', express.static(__dirname + '/public'));


passport.use(new FacebookStrategy({
    clientID: config.face.clientID,
    clientSecret: config.face.clientSecret,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
	},
  function(accessToken, refreshToken, profile, done) {
	process.nextTick(function () {
		let user = {
			username: profile._json.name.split(' ').join('.'),
			facebookId: profile.id
		}
		console.log(user);
		return done(null, user);
	});
  }
));

app.get('/auth/facebook',
	passport.authenticate('facebook')
);

app.get('/auth/facebook/callback',
	passport.authenticate('facebook',
		{ failureRedirect: '/'}
	),
	function(req, res) {
		// Successful authentication, redirect home.
		console.log('/auth/facebook/callback');
		res.redirect('/candidates');
	}
);


let server = http.createServer(app).listen(port, () => {
   console.log(`El servidor esta levantado en el puerto ${port}`);
});

app.get('/', (req, res) => {
   res.render('home');
});

app.get('/candidates', (req, res) => {
   res.send('Listado de candidatas');
});






