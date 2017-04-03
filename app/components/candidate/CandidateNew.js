
import React from 'react';

class CandidateNew extends React.Component {

   onSave(ev) {

      let $data = {
          name: $("#name").val(),
          lastname: $("#lastname").val(),
          document: $("#document").val(),
          birthdate: $("#birthdate").val(),
          votes: 0,
          img_main: "candidate.jpg"
      };
      console.log($data);

      $.ajax({
         method: "POST",
         url: '/candidate',
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
            <div className="page-title">Crear Candidatas</div>
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
                                    <label for="name">Nombre</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="lastname" type="text" className="validate" name="apellido" />
                                    <label for="lastname">Apellido</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="document" name="cedula" type="number" className="validate" />
                                    <label for="document">Cédula</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <label for="birthdate">Cumpleaños</label>
                                    <input id="birthdate" type="text" className="datepicker picker__input" name="cumpleanos" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <p id="erroCedula" className="s12 m12 invalid"></p>
                                   <a onClick={this.onSave.bind(this)} className="waves-effect waves-light btn orange col s12 m12 l12" onclick="validarCedula()"><i className="material-icons right">cloud</i>Guardar</a>
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
export default CandidateNew
