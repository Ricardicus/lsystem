import React, { Component } from 'react';

import { parse as LParser } from '../lsystem';
import { Levolve, LexportAsString, Lexecute } from '../L';
import { Stack } from '../stack.js';

class LSystem extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isFetching: false,
			latest: null
		};
	  console.log("props", props);
		this.stack = new Stack();
		this.handles = {
			pop: () => { this.pop(); },
			push: () => { this.push(); },
			rotate: (args) => { this.rotate(args); },
			move: (args) => { this.move(args); }
		};
	}

	render() {
		var LSystemString = this.props.lsystemstring;
		var result = LParser(LSystemString);
		var lsystem = { state: { g: 0, a: 0, c: 0 }, lstring: result["rules"], stack: null };
		Levolve(lsystem, this.props.depth);
		var lsystemExpanded = LexportAsString(lsystem);

		// Generating the instructions
		var res = LParser(lsystemExpanded);
		// Executing
		Lexecute({ lstring: res.value }, this.handles);
		return (
		  <div>
		    <pre style={{ textAlign: "left"}}>
		      {JSON.stringify(lsystem, null, " ")}
		    </pre>
		    <p>
		      {lsystemExpanded}
		    </p>
		  </div>);
	}

	push() {
		console.log("my push");
	};

	pop() {
		console.log("my pop");
	};

	rotate(args) {
		console.log("rotate", args);
	};

	move(args) {
		console.log("move", args);
	};
}

export default LSystem;
