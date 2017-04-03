import React from 'react';
import UserNew from './app/components/user/UserNew';
import UserList from './app/components/user/UserList';

import CandidateNew from './app/components/candidate/CandidateNew';
import CandidateList from './app/components/candidate/CandidateList';

import {default as Router, Route} from 'react-router';

let RouterHandler = Router.RouteHandler;

class AppRouter extends React.Component {

   render() {

      return <div>
      	<RouterHandler />
      </div>
   }
}
let routes = <Route handler={AppRouter}>
      <Route path="users" handler={UserList} />
      <Route path="user" handler={UserNew} />
      <Route path="candidates" handler={CandidateList} />
      <Route path="candidate" handler={CandidateNew} />
   </Route>
Router.run(routes, Router.HashLocation, (Root) => {
   React.render(<Root />, document.getElementById('content'));
});

$(document).ready(function() {
   
});