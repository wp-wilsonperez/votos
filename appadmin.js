
import React from 'react';
import UserNew from './app/components/user/UserNew';
import UserList from './app/components/user/UserList';

import CandidateNew from './app/components/candidate/CandidateNew';
import CandidateList from './app/components/candidate/CandidateList';
import CandidateVote from './app/components/candidate/CandidateVote';

import ResultHome from './app/components/result/ResultHome';
import ResultOpening from './app/components/result/ResultOpening';
import ResultCasual from './app/components/result/ResultCasual';
import ResultGala from './app/components/result/ResultGala';
import ResultQuestion from './app/components/result/ResultQuestion';
import ResultPublic from './app/components/result/ResultPublic';
import ResultGlobal from './app/components/result/ResultGlobal';

import SocialList from './app/components/social/SocialList';

import {default as Router, Route} from 'react-router';

let RouterHandler = Router.RouteHandler;

class CandidateOpening extends React.Component {
	render() {
		return <CandidateVote type="0" title="Votacion Opening" />
	}
}

class CandidateCasual extends React.Component {
	render() {
		return <CandidateVote type="1" title="Votacion Casual" />
	}
}

class CandidateGala extends React.Component {
	render() {
		return <CandidateVote type="2" title="Votacion Gala" />
	}
}

class CandidateQuestion extends React.Component {
	render() {
		return <CandidateVote type="3" title="Votacion Pregunta" />
	}
}

class AppRouter extends React.Component {

   render() {

      return <div>
      	<RouterHandler />
      </div>
   }
}

let routes = <Route handler={AppRouter}>
	  <Route path="home" handler={ResultHome} />
      <Route path="users" handler={UserList} />
      <Route path="user" handler={UserNew} />
      <Route path="candidates" handler={CandidateList} />
      <Route path="candidate" handler={CandidateNew} />
      <Route path="socials" handler={SocialList} />
      <Route path="opening" handler={CandidateOpening} />
      <Route path="casual" handler={CandidateCasual} />
      <Route path="gala" handler={CandidateGala} />
      <Route path="question" handler={CandidateQuestion} />
      <Route path="public" handler={CandidateOpening} />
      <Route path="result-opening" handler={ResultOpening} />
      <Route path="result-casual" handler={ResultCasual} />
      <Route path="result-gala" handler={ResultGala} />
      <Route path="result-question" handler={ResultQuestion} />
      <Route path="result-public" handler={ResultPublic} />
      <Route path="result-global" handler={ResultGlobal} />
   </Route>
Router.run(routes, Router.HashLocation, (Root) => {
   React.render(<Root />, document.getElementById('content'));
});

$(document).ready(function() {
   
});


