
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
		console.log(expression);
		var op = expression.type;
		var left = evaluate_expression(expression.left);
		var right = evaluate_expression(expression.right);
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
		var state = lsystem.state;
		var initialState = {};
		for (var i = 0; i < state.length; i++) {
			var id = state.id;
			var value = state.value;
			initialState[id] = value;
		}
		stack.push(initialState);
	}
	var state = stack.pop();
	var newlString = [];
	console.log(lstring);
	for (var i = 0; i < lstring.length; i++) {
		var symbol = lstring[i];
		var type = symbol["type"]
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
			
			for (var s = 0; s < newState.length; s++) {
				var ns = newState[s];
				newStateS[ns.id] = 0;
			}
			for (var s = 0; s < newState.length; s++) {
				var ns = newState[s];
				var value = evaluate_expression(newStateS, ns.value);
				newStateS[ns.id] = value;
			}

			stack.push(newStateS);
			var newlsystem = {lstring: lstringNew, stack: stack}
			if ( iterations > 0 ) {
			    console.log("axiom..");
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
    
}

module.exports = {
	Levolve: evolve,
	LexportAsString: exportAsString
};
