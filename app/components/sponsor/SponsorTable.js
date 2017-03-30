import React from 'react';
class SponsorTable extends React.Component {

   render() {
      console.log(this.props.sponsors);
      return <div>
      {
         this.props.sponsors.map((sponsor) => {
            console.log(sponsor.name);
            let img = `images/sponsors/${sponsor.img}`;
            return <div className="col l4 m6 s12" styles="display:block !important;">
                <div className="gallery-curve-wrapper">
                  <a className="gallery-cover gray ">                
                    <img className="responsive-img" src={img} alt={sponsor.name} />
                  </a>
                  <div className="gallery-header">
                    <span><b>{sponsor.name}</b></span>
                  </div>
                </div>
              </div>
         })
      }
      </div>
      
   }
}
export default SponsorTable
