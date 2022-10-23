
class Stack {
	constructor() {
		this.items = [];
	}

	push(element) {
		return this.items.push(element);
	}

	pop() {
		if (this.items.length > 0) {
			return this.items.pop();
		}
	}

	peek() {
		return this.items[this.items.length - 1];
	}

	isEmpty() {
		return this.items.length == 0;
	}

	// the size of the stack
	size() {
		return this.items.length;
	}

	// empty the stack
	clear() {
		this.items = [];
	}
}

function evaluate_expression(state, expression) {
	if (typeof expression == "number") {
		return expression;
	} else if (typeof expression == "string") {
		return state[expression];
	} else {
		var type = expression.type;
		if ( type == "id" ) {
		    return state[expression.value];
		}
		if ( type == "int" ) {
		    return expression.value;
		}
		var op = type;
		var left = evaluate_expression(state, expression.left.value);
		var right = evaluate_expression(state, expression.right.value);
		if (op == "add") {
			return left + right;
		} else if (op == "sub") {
			return left - right;
		} else if (op == "mul") {
			return left * right;
		}
	}
	throw new Error("Invalid expression");
}

function evolve(lsystem, handles, iterations) {
	var lstring = lsystem.lstring;
	if (lsystem.stack == null) {
	    lsystem.stack = new Stack();
	}
	var stack = lsystem.stack;
	if (stack.isEmpty()) {
		console.log("EMPTY STACK!!!");
		var state = lsystem.state;
		var initialState = {};
		for (const [key,value] of Object.entries(state)) {
			initialState[key] = value;
		}
		stack.push(initialState);
	}
	var state = stack.pop();
	var newlString = [];
	for (var i = 0; i < lstring.length; i++) {
		var symbol = lstring[i];
		var type = symbol["type"];
		if (type == "move" || type == "rotate") {
			var args = symbol["arguments"];
			var handle_args = [];

			for (var a = 0; a < args.length; a++) {
				var value = evaluate_expression(state, args[a].value);
				handle_args.push(value);
			}
			handles[type](handle_args);
			newlString.push(symbol);
		} else if (type == "axiom") {
			var newState = symbol["state"];
			var newStateS = {}
			var lstringNew = [...lstring];
		
			for (var q = 0; q < newState.length; q++) {
			    var key = newState[q].id;
			    var value = newState[q].value;
			    newStateS[key] = evaluate_expression(state, value);
			}
			if ( iterations > 0 ) {
			    stack.push(newStateS);
			    var newlsystem = {lstring: lstringNew, stack: stack}
	
			    console.log("Going in.. iterations: ", iterations);
			    evolve(newlsystem, handles, iterations-1);
			    newlString.push(newlsystem.lstring);
			}
		} else if (type == "push") {
			lsystem.stack.push(state);
			newlString.push(symbol);
		} else if (type == "pop") {
			state = lsystem.stack.pop();
			newlString.push(symbol);
		}
	}

	lsystem.lstring = newlString;
}

function exportAsString(lsystem) {
    var lstring = lsystem.lstring;

}

module.exports = {
	Levolve: evolve,
	LexportAsString: exportAsString
};
