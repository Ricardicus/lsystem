import React, { Component } from 'react';

import { parse as LParser } from '../lsystem';
import { Levolve, LexportAsString } from '../L';
import Turtle from './turtle.jsx';

class LSystemInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentText: this.props.lsystemstring,
			chosenDepth: 10
		};
      this.newDepth = this.newDepth.bind(this);
		this.handleNewInput = this.handleNewInput.bind(this);
	}

   newDepth(val) {
      this.setState({chosenDepth: val});
   }

	handleNewInput(val) {
		this.setState({
			currentText: val.target.value
		});
	}

	render() {
      var depthNotice = "";

      if ( this.state.chosenDepth > 14 ) {
         depthNotice = <div><small style={{"color":"red", "font-size":"50%"}}>Higher depths take longer time to generate</small><br/></div>
      }
		return (
			<div>
				<p>L system rule:</p>
				<textarea style={{ width: "20%" }}
					rows="12"
					id="LSystemTextArea"
					value={this.state.currentText}
					onChange={this.handleNewInput}
				></textarea><br />
				<small>depth: </small>
				<input type="number" style={{ width: "40px" }} value={this.state.chosenDepth} onChange={
					e => {this.newDepth(e.target.value);}
				}></input><br/>
				<button onClick={() => { this.props.onHandleNewLSystem(this.state.currentText, this.state.chosenDepth);}}>Generate</button>
				<br />{depthNotice}<br />
			</div>);
	}

}

export default LSystemInput;
