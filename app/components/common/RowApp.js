
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
        console.log(this.props.data);
        return <div>
        {
          this.props.data.map((data) => {
            return <tr>
              {
                this.props.fields.map((field) => {
                  return <td>{data[field.field]}</td>
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
