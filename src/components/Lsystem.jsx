import React, { Component } from 'react';

import { parse as LParser } from '../lsystem';
import { Levolve, LexportAsString } from '../L';
import { Stack } from '../stack.js';
import Turtle from './turtle.jsx';

class LSystem extends Component {

	constructor(props) {
		super(props);
		this.state = {
			LSystemString : this.props.lsystemstring,
            currentText : this.props.lsystemstring,
            lsystemExpanded : null
		};
		this.stack = new Stack();
        this.handleNewLSystem = this.handleNewLSystem.bind(this);
        this.handleNewInput = this.handleNewInput.bind(this);
	}

    componentDidMount() {
		var LSystemString = this.state.LSystemString;
		var result = LParser(LSystemString);
		var lsystem = { state: { g: 0, a: 0, c: 0 }, lstring: result["rules"], stack: null };
		Levolve(lsystem, this.props.depth);
		var lsystemExpanded = LexportAsString(lsystem);
        this.setState({lsystemExpanded:lsystemExpanded});
    }

    handleNewLSystem() {
        var newLsystem = document.getElementById("LSystemTextArea").value;
		var LSystemString = newLsystem;
		var result = LParser(LSystemString);
		var lsystem = { state: { g: 0, a: 0, c: 0 }, lstring: result["rules"], stack: null };
		Levolve(lsystem, this.props.depth);
		var lsystemExpanded = LexportAsString(lsystem);

        this.setState({
            lsystemExpanded: lsystemExpanded,
            LSystemString: newLsystem
        });
        console.log("new system, computed", newLsystem);
    }

    handleNewInput(val) {
        this.setState({
            currentText: val.target.value
        });
    }

	render() {
        if ( this.state.lsystemExpanded == null ) {
            return "<p>Loading...</p>";
        }
		return (
		  <div>
            <Turtle lstring={this.state.lsystemExpanded} />
            <p>L system rule:</p>
            <textarea style={{width:"20%"}}
                rows="12"
                id = "LSystemTextArea"
                value={this.state.currentText}
                onChange={this.handleNewInput} 
            ></textarea><br/>
            <button onClick={this.handleNewLSystem}>Generate</button>
            <br/><br/>
		  </div>);
	}

}

export default LSystem;
