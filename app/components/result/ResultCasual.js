import React from 'react';
import TableApp from './../common/TableApp';
class ResultCasual extends React.Component {
   constructor(props) {
      super(props);
      let params= {
         title: "RESULTADO CASUAL VALOR MÁXIMO 10 Y 10%",
         fields: [
            {"title": "Candidata", "field": "_id", "field2": "fullname"},
            {"title": "Puntos Totales", "field": "totalC"},
            {"title": "10% Evento", "field": "totalCP"}
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
export default ResultCasual