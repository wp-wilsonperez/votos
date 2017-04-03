
import React from 'react';
import RowApp from './RowApp';

class TableApp extends React.Component {

   render() {
      console.log(this.props.data);
      return <div className="row">
              <div className="col s12">
                  <div className="page-title">{this.props.params.title}</div>
              </div>
              <div className="col s12 m12 l12">
                  <div className="card">
                      <div className="card-content">                    
                          <table id="example" className="display responsive-table datatable-example">
                              <thead>
                                  <tr>
                                    <RowApp fields={this.props.params.fields} type="th" />
                                  </tr>
                              </thead>
                              <tfoot>
                                  <tr>
                                    <RowApp fields={this.props.params.fields} type="th" />
                                  </tr>
                              </tfoot>
                              <tbody>
                                  <RowApp fields={this.props.params.fields} data={this.props.data} type="td" />
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
      </div>
   }
}
export default TableApp
