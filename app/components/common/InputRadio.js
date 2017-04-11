
import React from 'react';

class InputRadio extends React.Component {
   constructor(props) {
      super(props);
      this.state = {inputs: this.props.inputs}
   }
   onClick(ev) {
      let e = ev.target;
        let $inputs = this.state.inputs;
        let $index = $(e).data("index");
        $inputs.map((input, i) => {
          if(i == $index) {
            input.isChecked = true;
          } else {
            input.isChecked = false;
          }
          return input;
        })
        this.setState({inputs: $inputs});
   }
   onChange() {
      //this.setState({isChecked: !this.state.isChecked});
   }
   render() {
      return <div>
      {
        this.state.inputs.map((input, index) => {
          if(input.isChecked) {$("#"+this.props.ID).val(input.val)}
          return   <div key={input.val} styles="display: inline-block; width: 200px; height: 100px; margin: 1em;"> 
            <input className="mdl-js-radio__button" data-index={index} type="radio" name={input.name} id={input.id} checked={input.isChecked} defaultValue={input.val} onChange={this.onChange.bind(this)} onClick={this.onClick.bind(this)} />
            <label className="mdl-js-radio__label" htmlFor={input.id}>{input.show}</label>
          </div>
        })
      }
      <input id={this.props.ID} name={this.props.ID} type="hidden" defaultValue={this.props.default} />
      </div>
   }
}

export default InputRadio