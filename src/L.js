import { Stack } from './stack.js';

function print_expression(expression) {
   if (typeof expression == "number") {
      return "" + expression;
   } else if (typeof expression == "string") {
      return "" + expression;
   } else {
      var type = expression.type;
      if (type == "id") {
         return "" + expression.value;
      }
      if (type == "int") {
         return "" + expression.value;
      }
      if (type == "function") {
         var result = "" + expression.id + "(";
         var args = expression.args;
         for (var i = 0; i < args.length; i++) {
            if (i > 0) {
               result += ",";
            }
            result += print_expression(args[i]);
         }
         result += ")";
         return result;
      } else if (type == "paranthesis") {
         var result = "(";
         result += print_expression(expression.value);
         result += ")";
         return result;
      }

      var op = type;
      var left = print_expression(expression.left);
      var right = print_expression(expression.right);

      if (op == "add") {
         return "(" + left + "+" + right + ")";
      } else if (op == "sub") {
         return "(" + left + "-" + right + ")";
      } else if (op == "mul") {
         return "(" + left + "*" + right + ")";
      } else if (op == "div") {
         return "(" + left + "/" + right + ")";
      }
   }
   throw new Error("Invalid expression");
}


function evaluate_expression(state, expression, handles) {
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
         return evaluate_expression(state, expression.value, handles);
      }
      if (type == "function") {
         var funcID = expression.id;
         var args = expression.args;
         if (funcID == "random") {
            if (args.length == 1) {
               return evaluate_expression(state, args[0], handles) * Math.random();
            } else if (args.length == 2) {
               var arg1 = evaluate_expression(state, args[0], handles);
               var arg2 = evaluate_expression(state, args[1], handles);
               return arg1 + (arg2 - arg1) * Math.random();
            }
         } else if (funcID == "context") {
            if (handles != null) {
               var r = handles[funcID](args);
               return r;
            } else {
               return expression;
            }
         } else if (funcID == "sin") {
            var arg = evaluate_expression(state, args[0], handles);
            if ( typeof arg == "number" ) {
               return Math.sin(arg * Math.PI * 2 / 360.0);
            } else {
               return expression;
            }
         } else if (funcID == "cos") {

            var arg = evaluate_expression(state, args[0], handles);
            if ( typeof arg == "number" ) {
               return Math.sin(arg * Math.PI * 2 / 360.0);
            } else {
               return expression;
            }
 
         }
         return 0;
      }
      if (type == "paranthesis") {
         return evaluate_expression(state, expression.value, handles);
      }

      var op = type;
      var left = evaluate_expression(state, expression.left, handles);
      var right = evaluate_expression(state, expression.right, handles);

      if (typeof left == "number" && typeof right == "number") {
         if (op == "add") {
            return left + right;
         } else if (op == "sub") {
            return left - right;
         } else if (op == "mul") {
            return left * right;
         } else if (op == "div") {
            return left / right;
         }
      } else if ( typeof left == "number" ) {
         expression.left = left;
         return expression;
      } else if ( typeof right == "number" ) {
         expression.right = right;
         return expression;
      } else {
         return expression
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
            var value = evaluate_expression(state, args[a], null);
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
            newStateS[key] = evaluate_expression(state, value, null);
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
               if (typeof args[q] == "number") {
                  result += args[q];
               } else {
                  var argp = print_expression(args[q]);
                  result += argp;
               }
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
            var args = symbol["arguments_computed"];
            var evaluated_args = [];
            for (var q = 0; q < args.length; q++) {
               var arg = evaluate_expression({}, args[q], handles);
               if ( isNaN(arg) ) {
                  console.log("Nan found!", args, symbol);
                  console.log("arg:",args[q]);
                  throw Error("Noo!");
               }
               evaluated_args.push(arg);
            }
            handles[type](evaluated_args);
         } else if (type == "push" || type == "pop") {
            handles[type]();
         }
      }
   }
}

