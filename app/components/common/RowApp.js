
import React from 'react';

class RowApp extends React.Component {

   render() {
      
      if(this.props.type == "th"){
        return <div>
        {
          this.props.fields.map((field) => {
            return <th>{field.title}</th>
          })
        }
        </div>
      }
      else {
        return <div>
        {
          this.props.data.map((data) => {
            return <tr>
              {
                this.props.fields.map((field) => {
                  let $index = field.field;
                  let $data = data[$index];
                  if(field.field2){
                    $data = $data[field.field2];
                  }
                  if(field.mix){
                    $data = data[field.mix[0]] +' '+ data[field.mix[1]];
                    
                  }
                  return <td>{$data}</td>
                })
              }
            </tr>
          })
        }
        </div>
      }
        
   }
}
export default RowApp
