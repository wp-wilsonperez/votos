import express from 'express';
import http from 'http';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import passport from 'passport';
import sha1 from 'sha1';
import moment from 'moment';
var getIP = require('ipware')().get_ip;
//import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';

import config from './app/config';

import mongoose from 'mongoose';
import Candidate from './app/models/candidate';
import User from './app/models/user';
import Vote from './app/models/vote';
import Social from './app/models/social';

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

      console.log("FacebookStrategy");
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
      console.log(req.user);
		// Successful authentication, redirect home.
      console.log('/auth/facebook/callback');
      let ipInfo = getIP(req);
      console.log(ipInfo);
      Social.count({public_ip: ipInfo.clientIp, vote: moment().format('YYYY-MM-DD')}, (err, result) => {
         console.log("count: " + result);
         if(err) {
            return res.json();
         }
         if(result == 10) {
            res.status(401).send({"login": true, "msg": "Solo se permiten maximo 10 sesiones de votacion por PC"});
         }else {
            let query = {facebook_id: req.user.facebookId},
               update = { username: req.user.username, facebook_id: req.user.facebookId, public_ip: ipInfo.clientIp, date: moment().format('YYYY-MM-DD hh:mm:ss') },
               options = { upsert: true, new: true, setDefaultsOnInsert: true };
            // Find the document
            Social.findOneAndUpdate(query, update, options, function(error, result) {
               if (error) return;
               //console.log(result);
               res.redirect('/votes');
                // do something with the document
            });
         }
      });
		
	}
);


let server = http.createServer(app).listen(port, () => {
   console.log(`El servidor esta levantado en el puerto ${port}`);
});

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/socials', authLocal, (req, res) => {

   Social.find({}, (err, docs) => {
      if(err) {
         return res.json();
      }
      if(docs) {
         res.json(docs);
      }else {
         res.json([]);
      }
   });
});

app.get('/votes', authSocial, (req, res) => {
	res.render('votes');
   //res.send('Listado de candidatas');
});

app.post('/vote', authLocal, (req, res) => {
   let $vote= req.body.vote;
   let $points = [0,0,0,0]
   let params = {
      _id: $vote.candidate_id
   }
   let $votes = [];
   $vote.forEach(function(item) {
      $points[parseInt(item.kind)] = parseFloat(item.points);
      $votes.push({
         candidate_id: item.candidate_id,
         fullname: item.fullname,
         pointsO: $points[0],
         pointsC: $points[1],
         pointsG: $points[2],
         pointsQ: $points[3],
         kind: parseInt(item.kind)
      });
   });
   
   let vote = new Vote({
      user_id: req.user._id,
      votes: $votes
   });
   vote.save((err, resp) => {
      if(err){
         console.log(err);
         res.status(401).send({"save": false});
      } else {
         console.log(vote);   
         res.send({"save": true});
      }            
   });
});

app.get('/voteresult', authLocal, (req, res) => {
   
   let match = {
      kind: { $ne: null },
      user_id: { $ne: null }
   };

   if(req.body.kindIf){
      match.kind = req.body.kind;
   }
   if(req.body.userIf){
      match.kind = req.user._id;
   }

   Vote.aggregate([
      {"$unwind": "$votes" },
      { "$match": { "votes.kind": match.kind, "user_id": match.user_id}},
      { "$sort": { "votes.candidate_id": -1, "votes.kind": -1} },
      {"$group": {
         "_id": {
            "candidate_id": "$votes.candidate_id", "fullname": "$votes.fullname"
         },
         "totalO": { "$sum": "$votes.pointsO"},
         "totalC": { "$sum": "$votes.pointsC"},
         "totalG": { "$sum": "$votes.pointsG"},
         "totalQ": { "$sum": "$votes.pointsQ"}
         }
      }
   ], (err, docs) => {
      console.log(err)
      if(err) {
         res.json();
      }
      if(docs) {
         User.count({"role": 1}, (err1, jueces) => {
            if(err1) {
               res.json();
            }
            if(jueces) {
               docs.forEach(function(doc, index) {
                  console.log(docs[index]);
                  let total = {
                     O: docs[index]["totalO"] * 10 / (jueces*10),
                     C: docs[index]["totalC"] * 10 / (jueces*10),
                     G: docs[index]["totalG"] * 10 / (jueces*10),
                     Q: docs[index]["totalQ"] * 10 / (jueces*10)
                  }
                  docs[index]["totalOP"] = total.O + "%";
                  docs[index]["totalCP"] = total.C + "%";
                  docs[index]["totalGP"] = total.G + "%";
                  docs[index]["totalQP"] = total.Q + "%";
                  docs[index]["totalEP"] = (total.O+total.C+total.G+total.Q) + "%";
               });
               console.log(docs);
               res.json({candidates: docs, users: jueces});
            }else {
               res.json({});
            }
         });
      }else {
         res.json({});
      }
   });
});

app.get('/candidates', authLocal, (req, res) => {

	Candidate.find({}, (err, docs) => {
      if(err) {
         res.json();
      }
      if(docs) {
         if(req.query.result){
            User.count({"role": 1}, (err1, docs2) => {
               if(err1) {
                  res.json();
               }
               if(docs2) {
                  let candidates = [];
                  let $total=0;
                  docs.forEach(function(doc, index) {
                     console.log(doc);
                     console.log("--------------");
                     candidates[index]= doc;
                     candidates[index]["votesP"] = 10 + "%";
                     console.log("--------------")
                     $total += docs[index]["votes"];
                  });
                  res.json({candidates: candidates,total: $total, users: docs2});
               }else {
                  res.json({});
               }
            });
         } else {
            res.json(docs);
         }
      }else {
         res.json({});
      }
   });
});

app.get('/candidatesTotal', authLocal, (req, res) => {

   Candidate.count({}, (err, docs) => {
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

app.post('/candidate', authLocal, (req, res) => {

   let candidate = new Candidate({
      name: req.body.name,
      lastname: req.body.lastname,
      document: req.body.document,
      birthdate: "1990-10-10",
      votes: req.body.votes,
      img_main: req.body.img_main
   });
   candidate.save((err, resp) => {
      if(err){
         console.log(err);
         res.status(401).send({"save": false});
      } else {
         console.log(candidate);   
         res.send({"save": true});
      }            
   });
});


app.get('/users', authLocal, (req, res) => {

   User.find({}, (err, docs) => {
      if(err) {
         return res.json();
      }
      if(docs) {
         res.json(docs);
      }else {
         res.json({});
      }
   });
});

app.post('/user', authLocal, (req, res) => {

   let user = new User({
      name: req.body.name,
      lastname: req.body.lastname,
      username: req.body.username,
      password: sha1(req.body.password),
      role: req.body.role,
      img: "user.jpg"
   });
   user.save((err, resp) => {
      if(err){
         console.log(err);
         res.status(401).send({"save": false});
      } else {
         console.log(user);   
         res.send({"save": true});
      }            
   });
});


app.post('/candidate/vote', authSocial, (req, res) => {

   console.log(req.user.facebookId);

   let params = {
      facebook_id: req.user.facebookId,
      vote: { $ne: moment().format("YYYY-MM-DD") }
   }
   let update = {
      vote: moment().format("YYYY-MM-DD")
   };

   Social.findOneAndUpdate(params, update, function (err, resp) {
      console.log(resp);
      if(err){
         console.log(err);
         return res.status(401).send({"save": false});
      }
      if(resp) {
         params = {
            _id: req.body.candidate_id
         }
         update = {
            "$inc": {"votes":1}
         };
         Candidate.findOneAndUpdate(params, update, function (err2, resp2) {
            if(err2){
               console.log(err2);
               res.status(401).send({"save": false});
            } else {
               res.send({"save": true, "text": "Voto exitoso"});
            } 
         });
      }else {
         res.status(401).send({"save": false, "text": "Solo puede realizar un voto al dia"});
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
               return res.redirect('/admin#/home');
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

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
});

app.get('/admin', authLocal, (req, res) => {
	//res.send('LOGIN EXITOSO');

	res.render('admin/admin', {user: req.user});
});

app.get('/*', (req, res) => {
  res.redirect('/')
});
//middleware authenticate
function authLocal(req, res, next) {
   if(req.isAuthenticated()) {
      console.log("LOGIN YES");
      return next();
   }
   console.log("LOGIN NO");
   //return next();
   return res.status(401).send({"login": false, "msg": "No ha inciado sesion con su usuario"});
   //res.redirect('/login');
}
function authSocial(req, res, next) {
   if(req.isAuthenticated()) {
      console.log("LOGIN YES");
      return next();
   }
   console.log("LOGIN NO");
   //return next();
   return res.status(401).send({"login": false, "msg": "No ha iniciado sesion con su Facebook"});
   //res.redirect('/login');
}










