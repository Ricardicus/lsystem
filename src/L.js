import { Stack } from './stack.js';

function evaluate_expression(state, expression) {
	if (typeof expression == "number") {
		return expression;
	} else if (typeof expression == "string") {
		return state[expression];
	} else {
		var type = expression.type;
		if (type == "id") {
			return state[expression.value];
		}
		if (type == "int") {
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
		} else if (op == "div") {
			return left / right;
		}
	}
	throw new Error("Invalid expression");
}

export function Levolve(lsystem, iterations) {
	var lstring = lsystem.lstring;
	if (lsystem.stack == null) {
		lsystem.stack = new Stack();
	}
	var stack = lsystem.stack;
	if (stack.isEmpty()) {
		var state = lsystem.state;
		var initialState = {};
		for (const [key, value] of Object.entries(state)) {
			initialState[key] = value;
		}
		stack.push(initialState);
	}
	var state = stack.pop();
	var newlString = [];
	for (var i = 0; i < lstring.length; i++) {
		var symbol = {};
		Object.assign(symbol, lstring[i]);
		var type = symbol["type"];
		if (type == "move" || type == "rotate") {
			var args = symbol["arguments"];
			var handle_args = [];

			for (var a = 0; a < args.length; a++) {
				var value = evaluate_expression(state, args[a]);
				handle_args.push(value);
			}

			symbol["arguments_computed"] = handle_args;
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
			if (iterations > 0) {
				stack.push(newStateS);
				var newlsystem = { lstring: lstringNew, stack: stack }

				Levolve(newlsystem, iterations - 1);
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

export function LexportAsString(lsystem) {
	var lstring = lsystem.lstring;
	var result = "";
	for (var i = 0; i < lstring.length; i++) {
		var isArr = Object.prototype.toString.call(lstring[i]) == '[object Array]';
		if (isArr) {
			var lsys = {}
			lsys.lstring = lstring[i];
			result += LexportAsString(lsys);
		} else {
			var type = lstring[i].type;
			if (type == "pop") {
				result += "]";
			} else if (type == "push") {
				result += "[";
			} else if (type == "move" || type == "rotate") {
				if (type == "move") {
					result += "mov";
				} else if (type == "rotate") {
					result += "rot";
				}
				result += "(";
				var args = lstring[i].arguments_computed;
				for (var q = 0; q < args.length; q++) {
					result += q > 0 ? "," : "";
					result += args[q];
				}
				result += ")"
			}
		}

	}
	return result;
}

export function Lexecute(lsystem, handles) {
	var lstring = lsystem.lstring;
	for (var i = 0; i < lstring.length; i++) {
		var symbol = {};
		Object.assign(symbol, lstring[i]);
		var isArr = Object.prototype.toString.call(lstring[i]) == '[object Array]';
		if (isArr) {
			var lsys = {}
			lsys.lstring = lstring[i];
			Lexecute(lsys, handles);
		} else {
			var type = symbol["type"];
			if (type == "move" || type == "rotate") {
				var args = symbol["arguments"];
				handles[type](args);
			}
		}
	}
}

