
import React from 'react';
import TableApp from './../common/TableApp';
class CandidateList extends React.Component {
   constructor(props) {
      super(props);
      let params= {
         title: "Listado de Candidatas",
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
   render() {
      if(this.state.data.length) {
         console.log("render data");
         return <main>
            <TableApp data={this.state.data} params={this.state.params} />
         </main>
      } else {
         return <p> {this.state.msg} </p>
      }
   }
}
export default CandidateList
