import React from 'react';
import TableApp from './../common/TableApp';
class ResultGlobal extends React.Component {
   constructor(props) {
      super(props);
      let params= {
         title: "RESULTADO GLOBALES VALOR MÁXIMO 100%",
         fields: [
            {"title": "Candidata", "field": "_id", "field2": "fullname"},
            {"title": "10% Opening", "field": "totalOP"},
            {"title": "10% Casual", "field": "totalCP"},
            {"title": "35% Gala", "field": "totalGP"},
            {"title": "35% Pregunta", "field": "totalQP"},
            {"title": "10% Público", "field": "totalQP"},
            {"title": "100 % Evento", "field": "totalEP"}
         ]
      }
      this.state = {data: [], params: params, candidateState: false, msg: "Cargando..."};
   }
   componentWillMount() {
      if(!this.state.candidateState) {
         $.get('/voteresult', (data) => {
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
export default ResultGlobal