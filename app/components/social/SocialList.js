
import React from 'react';
import TableApp from './../common/TableApp';
class SocialList extends React.Component {
   constructor(props) {
      super(props);
      let params= {
         title: "Listado de Sessiones de Facebook",
         fields: [
            {"title": "Facebook id", "field": "facebook_id"},
            {"title": "Usuario", "field": "username"},
            {"title": "Ultima Sesion", "field": "date"}
         ]
      }
      this.state = {data: [], params: params, dataState: false, msg: "Cargando..."};
   }
   componentWillMount() {
      if(!this.state.dataState) {
         $.get('/socials', (data) => {
            this.setState({data: data, dataState: true, msg: "No hay datos"});
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
export default SocialList
