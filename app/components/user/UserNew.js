
import React from 'react';
import InputRadio from './../common/InputRadio';

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
          role: $("#role").val()
      };
      console.log($data);
      $.ajax({
         method: "POST",
         url: '/user',
         dataType: "json",
         data: $data,
         cache: false,
         timeout: 2000,
         success: function(data) {
            alert("Guardado Exitoso");
            window.location.hash = "#users"
         },
         error: function(jqXHR, textStatus, errorThrown) {
            //var $json = $.parseJSON(jqXHR.responseText);
            alert("Guardado Fallido");
         }
      });
   }
   render() {
    let $inputs = [
        {id: "test1", val: 1, show: "Administrador", name: "role", isChecked: true},
        {id: "test2", val: 2, show: "Juez", name: "role", isChecked: false}
      ];
      return <div className="row">
        <div className="col s12">
            <div className="page-title">Crear Usuarios</div>
        </div>
        <div className="col s12 m12 l12">
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Datos</span>
                    <div className="row">
                        <form className="col s12" method="POST" name="cedulaInit">
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="name" type="text" className="validate" name="nombre" />
                                    <label htmlFor="name" className="">Nombre</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="lastname" type="text" className="validate" name="apellido" />
                                    <label htmlFor="lastname">Apellido</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="username" name="cedula" type="text" className="validate" />
                                    <label htmlFor="username">username</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="password" className="">Contraseña</label>
                                    <input id="password" type="password" className="password" name="password" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">

                                  
                                  <InputRadio inputs={$inputs} ID="role" default="1"/>
               
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
