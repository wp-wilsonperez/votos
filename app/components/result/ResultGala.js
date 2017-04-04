import React from 'react';
import TableApp from './../common/TableApp';
class ResultGala extends React.Component {
   constructor(props) {
      super(props);
      let params= {
         title: "RESULTADO GALA VALOR MÁXIMO 10 Y 35%",
         fields: [
            {"title": "Candidata", "field": "_id", "field2": "fullname"},
            {"title": "Puntos Totales", "field": "totalG"},
            {"title": "10% Evento", "field": "totalGP"}
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
export default ResultGala