import React from 'react';
import SponsorTable from './SponsorTable';
import sponsors from './../../sponsors';

class SponsorApp extends React.Component {
   constructor(props) {
      super(props);
      this.state = {sponsors: sponsors, candidateState: false, share: false};
   }
   render() {
      console.log(this.state.sponsors);
      if(this.state.sponsors.length) {
         
         return <div className="gallery row">
            <SponsorTable sponsors={this.state.sponsors}/>
         </div>
      } else {
         return <p> Cargando... </p>
      }
   }
}
export default SponsorApp
