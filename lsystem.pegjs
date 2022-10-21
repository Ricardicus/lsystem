{
  function makeInteger(o) {
    return parseInt(o.join(""), 10);
  }
}

lsystem
    = AxiomToken _ "(" _ state:states _ ")" _ "->" _ rules:symbols {
	return { "type" : "lsystem", "state" : state, "rules" : rules };
    } / string:symbols {
	return { "type" : "lstring", "value" : string };
    }

states
    = first:state _ rest:("," _ state)* {
	return [first].concat(rest.map(function(v){ if ( v ) {return v[2];} }));
    }

state
    = id:identifier _ "=" _ value:expression {
	return { "id" : id.value, "value" : value.value };
    }

symbols
    = first:symbol _ rest:(symbol)* {
	return [first].concat(rest.map(function(v){ return v; }));
    }

symbol
    = _ RotateToken "(" _ args:arguments _ ")" {
	return { "type" : "rotate", "arguments" : args };
    } /
      _ MoveToken "(" _ args:arguments _ ")" {
	return { "type" : "move", "arguments" : args };
    } /
     _ AxiomToken "(" _ state:states _ ")" {
	return { "type" : "axiom", "state" : state };
    } /
      _ StackPushToken {
	return { "type" : "push" };
    } /
      _ StackPopToken {
	return { "type" : "pop" };  
    }

arguments
    = first:argument _ rest:("," _ argument)* {
	return [first].concat(rest.map(function(v){ if ( v ) {return v[2];} }));
    }

argument
    = expression

expression
    = left:multiplicative _ "+" _ right:expression {
	return { "type" : "add" , "left": left, "right" : right };
    }
    / left:multiplicative _ "-" _ right:expression {
	return { "type" : "sub" , "left": left, "right" : right };
    } 
    / multiplicative

multiplicative
    = left:primary _ "*" _ right:multiplicative {
	return { "type" : "mul", "left" : left, "right" : right };
    }
    / primary

primary
  = integer
  / id:identifier {
    return id;  
  }
  / "(" _ expr:expression _ ")" {
    return {
	"type" : "integer" , "value" : expr};
    }

identifier
    = id:[a-zA-Z]+ {
	return {
	    "type" : "id", "value" : id[0]
	};
    }

integer 
  = digits:[0-9]+ {
    return { "type" : "int", "value" : makeInteger(digits) };
  } /
    "-" int:integer {
    int.value *= -1;
    return int;
  }

// optional whitespace
_  = [ \t\r\n]*

RotateToken     = "rot" 
MoveToken       = "mov"
AxiomToken      = "L" 
StackPushToken  = "["
StackPopToken   = "]"
