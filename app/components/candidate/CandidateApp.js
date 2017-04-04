import React from 'react';
import CandidateTable from './CandidateTable';
class CandidateApp extends React.Component {
   constructor(props) {
      super(props);
      this.state = {candidates: [], candidateState: false, share: false};
   }
   componentWillMount() {
      if(!this.state.candidateState) {
         $.get('/candidates', (candidates) => {
            console.log(candidates);
            this.setState({candidates: candidates, candidateState: true});
         });
      }      
   }
   render() {
      console.log(this.state.candidates);
      if(this.state.candidates.length) {
         
         return <div className="gallery row">
            <CandidateTable candidates={this.state.candidates}/>
         </div>
      } else {
         return <p> Cargando... </p>
      }
   }
}
export default CandidateApp
