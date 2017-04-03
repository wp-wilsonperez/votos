
import React from 'react';
import TableApp from './../common/TableApp';
class UserList extends React.Component {
   constructor(props) {
      super(props);
      let params= {
         title: "Listado de Usuarios",
         fields: [
            {"title": "Nombre", "field": "name"},
            {"title": "Apellido", "field": "lastname"},
            {"title": "Usuario", "field": "username"},
            {"title": "Rol", "field": "role"}
         ]
      }
      this.state = {data: [], params: params, userState: false, msg: "Cargando..."};
   }
   componentWillMount() {
      if(!this.state.userState) {
         $.get('/users', (data) => {
            this.setState({data: data, userState: true, msg: "No hay datos"});
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
export default UserList
