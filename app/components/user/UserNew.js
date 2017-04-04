
import React from 'react';

var DropDown = React.createClass(
{
    render: function () {
        var items = this.props.data;
        return (
        <select value={this.props.Selected} id={this.props.id}>
            {
                items.map(function (item) {
                    return <option value={item.value }>{item.name}</option>;
                })
            }
        </select>);
    }
});

class UserNew extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      options: [
        { value: 1, name: 'Administrador' },
        { value: 2, name: 'Juece' }
      ],
      value: 1
    }
  }

  onSave(ev) {

      let $data = {
          name: $("#name").val(),
          lastname: $("#lastname").val(),
          //document: $("#document").val(),
          username: $("#username").val(),
          password: $("#password").val(),
          role: $("#role").val(),
      };

      $.ajax({
         method: "POST",
         url: '/user',
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
      return <div className="row">
        <div className="col s12">
            <div className="page-title">Crear Usuarios</div>
        </div>
        <div className="col s12 m12 l12">
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Datos</span><br/>
                    <div className="row">
                        <form className="col s12" method="POST" name="cedulaInit">
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="name" type="text" className="validate" name="nombre" />
                                    <label for="name" className="">Nombre</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="lastname" type="text" className="validate" name="apellido" />
                                    <label for="lastname">Apellido</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="username" name="cedula" type="text" className="validate" />
                                    <label for="username">username</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="password" className="">Contraseña</label>
                                    <input id="password" type="password" className="password" name="password" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                  <div className="select-wrapper initialized" >
                                    <span className="caret">▼</span>
                                    <input type="text" className="select-dropdown" readonly="true" data-activates="select-options-d52fce94-f499-7c54-0e0e-3832b38d2463" value="Administrador" />
                                    <ul id="select-options-d52fce94-f499-7c54-0e0e-3832b38d2463" className="dropdown-content select-dropdown ">
                                    <li className=""><span>Administrador</span></li>
                                    <li className=""><span>Juece</span></li>
                                    </ul>
                                    <select id="role" className="initialized">
                                    <option value="1">Administrador</option>
                                    <option value="2">Juece</option>
                                    </select>
                                  </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <p id="erroCedula" className="s12 m12 invalid"></p>
                                   <a onClick={this.onSave.bind(this)} className="waves-effect waves-light btn orange col s12 m12 l12"><i className="material-icons right">cloud</i>Guardar</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
   }
}
export default UserNew
