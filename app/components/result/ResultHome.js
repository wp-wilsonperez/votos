import React from 'react';

class ResultHome extends React.Component {
   constructor(props) {
      super(props);
      this.state = {total: 0, candidateState: false, share: false, msg: "Cargando..."};
   }
   componentWillMount() {
      if(!this.state.candidateState) {
         $.get('/candidatesTotal', (total) => {
            this.setState({total: total, candidateState: true});
         });
      }      
   }
   render() {
      console.log(this.state.total);
      if(this.state.total > 0) {
         
         return <div className="row no-m-t no-m-b">
                        <div className="col s12 m12 l4">
                            <div className="card stats-card">
                                <div className="card-content">
                                    <span className="card-title">Opening</span>
                                    <span className="stats-counter"><span className="counter">{this.state.total}</span><small>Candidatas</small></span>
                                </div>
                                <div className="progress stats-card-progress">
                                    <div className="determinate" styles="width: 70%"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m12 l4">
                            <div className="card stats-card">
                                <div className="card-content">
                                    <span className="card-title">Casual</span>
                                    <span className="stats-counter"><span className="counter">{this.state.total}</span><small>Candidatas</small></span>
                                </div>
                                <div className="progress stats-card-progress">
                                    <div className="determinate" styles="width: 70%"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m12 l4">
                            <div className="card stats-card">
                                <div className="card-content">
                                    <span className="card-title">Gala</span>
                                    <span className="stats-counter"><span className="counter">{this.state.total}</span><small>Candidatas</small></span>
                                    
                                </div>
                                <div className="progress stats-card-progress">
                                    <div className="determinate" styles="width: 70%"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m12 l4">
                            <div className="card stats-card">
                                <div className="card-content">
                                    <span className="card-title">Pregunta</span>
                                    <span className="stats-counter"><span className="counter">{this.state.total}</span><small>Candidatas</small></span>
                                    
                                </div>
                                <div className="progress stats-card-progress">
                                    <div className="determinate" styles="width: 70%"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m12 l4">
                            <div className="card stats-card">
                                <div className="card-content">
                                    <span className="card-title">Público</span>
                                    <span className="stats-counter"><span className="counter">{this.state.total}</span><small>Candidatas</small></span>
                                   
                                </div>
                                <div className="progress stats-card-progress">
                                    <div className="determinate" styles="width: 70%"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m12 l4">
                            <div className="card stats-card">
                                <div className="card-content">
                                    <span className="card-title">Resultado</span>
                                    <span className="stats-counter"><span className="counter">{this.state.total}</span><small>Candidatas</small></span>
                                    
                                </div>
                                <div className="progress stats-card-progress">
                                    <div className="determinate" styles="width: 70%"></div>
                                </div>
                            </div>
                        </div>
                                            </div>
      } else {
         return <p> {this.state.msg} </p>
      }
   }
}
export default ResultHome
