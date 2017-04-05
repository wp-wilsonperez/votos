import React from 'react';
//import CandidateRow from './CandidateRow';
class CandidateTable extends React.Component {

   onLike(candidate_id, ev) {
      //alert(candidate_id);

      let $data = {
         candidate_id: candidate_id
      };

      $.ajax({
         method: "POST",
         url: '/candidate/vote',
         dataType: "json",
         data: $data,
         cache: false,
         timeout: 2000,
         success: function(data) {
            alert("Voto Exitoso");
         },
         error: function(jqXHR, textStatus, errorThrown) {
              var $json = $.parseJSON(jqXHR.responseText);
              alert($json.text);
         }
      });
   }
   render() {
      return <div>
      {
         this.props.candidates.map((candidate) => {
            let img = `images/candidates/${candidate.img_main}`;
            return <div className="col l4 m6 s12 gallery-item  gallery-filter polygon">
               <div className="gallery-curve-wrapper gallery-expand">
                 <a className="gallery-cover gray ">                
                    <img className="responsive-img" src={img} alt="Carla Camila" />              </a>
                 <div className="gallery-header">
                   <span><b>{candidate.name} {candidate.lastname} </b> <br/> Ver más ... </span>
                 </div>
               </div>
               <div className="row row-candidata">
                 <div className="col s4 m4 l4">
                  <a onClick={this.onLike.bind(this, candidate._id)} className="btn-floating btn-small waves-effect waves-light btn-like">               
                     <i className="material-icons">thumb_up</i>
                  </a><br/>Votar
                                   
                 </div>
                 <div className="col s4 m4 l4">              
                   <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://www.cintanegra.net/morlaquita/" className="btn-floating btn-small waves-effect waves-light btn-face"><i className="material-icons">reply</i></a>
                   <br/>Compartir
                 </div>
                 <div className="col s4 m4 l4 likes">
                   <a className="btn-floating btn-small waves-effect waves-light btn-likes">
                     <img className="responsive-img logoCN" src="images/logoCN.png" />
                   </a>
                     <span><span>{candidate.votes}</span></span>
                   <br/>Total Votos
                 </div>
               </div>
             </div>
         })
      }
      </div>
      
   }
}
export default CandidateTable
