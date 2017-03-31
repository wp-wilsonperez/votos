import express from 'express';
import http from 'http';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import passport from 'passport';
import sha1 from 'sha1';
//import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';

import config from './app/config';

import mongoose from 'mongoose';
import Candidate from './app/models/candidate';
import User from './app/models/user';

mongoose.connect('mongodb://localhost/votes');
import {Strategy as LocalStrategy} from 'passport-local';

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

app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static(__dirname + '/public'));

passport.serializeUser((user, done) => { done(null, user) });
passport.deserializeUser((user, done) => { done(null, user) });

let localStrategy = new LocalStrategy( (username, password, done) => {
	console.log(sha1(password));
   User.findOne({username: username, password: sha1(password)}, (err, docs) => {
      if(err) {
         done(null, false, {
            message: 'Error'
         });
      }
      if(docs) {
         return done(null, {
            _id: docs._id,
            username: docs.username,
            username: docs.username,
            role: docs.role
         });
      }else {
         done(null, false, {
            message: 'Unkown user'
         });
      }      
   });
   
});

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

passport.use(localStrategy);

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
		res.redirect('/votes');
	}
);


let server = http.createServer(app).listen(port, () => {
   console.log(`El servidor esta levantado en el puerto ${port}`);
});

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/votes', (req, res) => {
	res.render('votes');
   //res.send('Listado de candidatas');
});

app.get('/candidates', (req, res) => {

	Candidate.find({}, (err, docs) => {
      if(err) {
         res.json();
      }
      if(docs) {
         res.json(docs);
      }else {
         res.json({});
      }
   });
});

app.post('/candidate/vote', (req, res) => {

	let params = {
		_id: req.body.candidate_id
	}
	let update = {
		"$inc": {"votes":1}
	};
	Candidate.findOneAndUpdate(params, update, function (err, resp) {
		if(err){
			console.log(err);
			res.status(401).send({"save": false});
		} else {
			res.send({"save": true, "text": "Voto exitoso"});
		} 
	});
});

app.get('/login', (req, res) => {

	res.render('admin/login');
});

 app.post('/login', (req, res, next) => {
   passport.authenticate('local', (err, user) => {
      switch (req.accepts('html', 'json')) {
         case 'html':
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function(err) {
            if (err) { return next(err); }
               return res.redirect('/admin');
            });
            break;
         case 'json':
            if (err)  { return next(err); }
            if (!user) { return res.status(401).send({"login": false}); }
            req.logIn(user, function(err) {
            if (err) { return res.status(401).send({"login": false}); }
               return res.send({"login": true, "username": user.username});
            });
            break;
         default:
            res.status(406).send();
      }
   })(req, res, next);
});

app.get('/admin', (req, res) => {
	//res.send('LOGIN EXITOSO');
	res.render('admin/admin');
});











