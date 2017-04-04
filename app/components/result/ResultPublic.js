import React from 'react';
import TableApp from './../common/TableApp';
class ResultPublic extends React.Component {
   constructor(props) {
      super(props);
      let params= {
         title: "RESULTADO VOTACIÓN PÚBLICO 208550 VALOR MÁXIMO 10% EVENTO",
         fields: [
            {"title": "Candidata", "field": "name", "mix": ["name", "lastname"]},
            {"title": "Votos Candidata", "field": "votes"},
            {"title": "10% Evento", "field": "percentage"}
         ]
      }
      this.state = {data: [], params: params, candidateState: false, msg: "Cargando..."};
   }
   componentWillMount() {
      if(!this.state.candidateState) {
         $.get('/candidates?result=true', (data) => {
            console.log(data);
            this.setState({data: data.candidates, candidateState: true, msg: "No hay datos"});
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
export default ResultPublic
