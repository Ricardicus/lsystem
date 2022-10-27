import React, { Component } from 'react';

import { parse as LParser } from '../lsystem';
import { Levolve, LexportAsString } from '../L';
import Turtle from './turtle.jsx';
import LSystemInput from './lsystemInput.jsx';

class LSystem extends Component {

	constructor(props) {
		super(props);
		this.state = {
			LSystemString: this.props.lsystemstring,
         lstring: null,
         error: <div></div>
		};
		this.handleNewLSystem = this.handleNewLSystem.bind(this);
		this.handleNewInput = this.handleNewInput.bind(this);
	}

	componentDidMount() {
		var LSystemString = this.state.LSystemString;
		var result = LParser(LSystemString);
		var lsystem = { state: { g: 0, a: 0, c: 0 }, lstring: result["rules"], stack: null };
		Levolve(lsystem, this.props.depth);
		var lsystemExpanded = LexportAsString(lsystem);
		this.setState({
         lsystemExpanded: lsystemExpanded,
         lstring: lsystem.lstring
      });
	}

	handleNewLSystem(newLsystem, depth) {
		var LSystemString = newLsystem;
      try {
		var result = LParser(LSystemString);
      } catch(e) {
        this.setState({
           error: (<small style={{color: "red"}}>Parsing error:<br/> {"" + e}</small>)
        });
        return;
      }
		var lsystem = { state: { g: 0, a: 0, c: 0 }, lstring: result["rules"], stack: null };
		Levolve(lsystem, depth);
		this.setState({
			LSystemString: newLsystem,
         lstring: lsystem.lstring,
		   error: ""
      });
	}

	handleNewInput(val) {
		this.setState({
			currentText: val.target.value
		});
	}

	render() {
		if (this.state.lstring == null) {
			return "<p>Loading...</p>";
		}
		return (
			<div>
				<Turtle lstring={this.state.lstring} />
         {this.state.error}
            <LSystemInput
               depth={this.props.depth}
					lsystemstring={this.state.LSystemString}
					onHandleNewLSystem={this.handleNewLSystem} />
			</div>);
	}

}

export default LSystem;
