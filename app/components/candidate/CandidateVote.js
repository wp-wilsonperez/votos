
import React from 'react';

class CandidateVote extends React.Component {
   constructor(props) {
      super(props);
      let params= {
         title: "Votacion Gala",
         fields: [
            {"title": "Cedula", "field": "document"},
            {"title": "Nombre", "field": "name"},
            {"title": "Apellido", "field": "lastname"},
            {"title": "Fecha Nacimiento", "field": "birthdate"}
         ]
      }
      this.state = {data: [], params: params, candidateState: false, msg: "Cargando..."};
   }
   componentWillMount() {
      if(!this.state.candidateState) {
         $.get('/candidates', (data) => {
            this.setState({data: data, candidateState: true, msg: "No hay datos"});
         });
      }      
   }
   onSave(ev) {
      let $component = this;
      let $data={
         vote:[]
      };
      $(".row input").each(function(){
         let $id = $(this).data('idcandidate');
         let $fullname = $(this).data('fullname');
         $data.vote.push({"candidate_id": $id, "fullname": $fullname, "points": $(this).val(), "kind": $component.props.type});
      });
      console.log($data);

      $.ajax({
         method: "POST",
         url: '/vote',
         dataType: "json",
         data: $data,
         cache: false,
         timeout: 2000,
         success: function(data) {
            alert("Guardado Exitoso");
         },
         error: function(jqXHR, textStatus, errorThrown) {
            //var $json = $.parseJSON(jqXHR.responseText);
            alert("Guardado Fallido");
         }
      });
   }
   render() {
      if(this.state.data.length) {
         return <div className="row">
           <div className="col s12">
               <div className="page-title">{this.props.title}</div>
           </div>
           <div className="col s12 m12 l12">
               <div className="card">
                   <div className="card-content">
                       <span className="card-title">Listado de Candidatas</span><br/>
                       {
                        this.state.data.map((candidate) =>{
                           let fullname = `${candidate.name} ${candidate.lastname}`
                           return <div className="row">
                           <form className="col s12" method="POST">
                               <div className="row">
                                   <div className="input-field col s6">
                                       <label for="first_name">{fullname}</label>
                                   </div>
                                   <div className="input-field col s4">
                                       <input type="text" className="masked" data-idcandidate={candidate._id} data-fullname={fullname} data-inputmask="'numericInput': true, 'mask': '99.9', 'rightAlignNumerics':false" required=""/>                                
                                       <p for="last_name">Voto de 5.0 a 10</p>
                                   </div>
                               </div>
                               
                               
                           </form>
                       </div>
                        })
                       }
                       <div className="row">
                                   <div className="input-field col s12">

                                       <button onClick={this.onSave.bind(this)} className="waves-effect waves-light btn orange"><i className="material-icons right">cloud</i>Guardar</button>
                                       <span className="btn-flat waves-green">Nota: Al pulsar guardar, la puntuación no se podrá editar..</span>
                                   </div>
                                   
                               </div>
                   </div>
               </div>
           </div>
       </div>
      } else {
         return <p> {this.state.msg} </p>
      }
   }
}
export default CandidateVote
