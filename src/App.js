import logo from './logo.svg';
import './App.css';

import { parse as LParser } from './lsystem';
import { Levolve, LexportAsString } from './L';

function move(args) {
    console.log("move");
    console.log(args);
}

function rotate(args) {
    console.log("rotate");
    console.log(args);
}

var handles = {
    move: move,
    rotate: rotate
}

function test(a) { a.hej = "hej" }

function App() {
    var LSystem = "L(g=0,a=0,c=0) -> mov(2,22/(g+1),2)rot(40)[L(g=g+1,a=a,c=c)]rot(-40)L(g=g+1, a=a, c=c)";
    var LString = "mov(2,22/(g+1),2)rot(40)[L(g+1)]rot(-40)L(g+1 )";

    var a = {"hej": "test"};
    test(a);

    var result = "";
    var lstring = LString;
    try {
	result = LParser(LSystem);
	lstring = result["rules"] ;
    } catch (error) {
	result = error;
    }
    console.log(result);
    var lsystem = { state: {g:0, a:0, c:0}, lstring: lstring, stack: null };
    Levolve(lsystem, handles, 2) ;
    console.log(lsystem);
    var lsystemExpanded = LexportAsString(lsystem);

    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
<pre style={{textAlign:"left"}}>
{JSON.stringify(lsystem,null," ")}
</pre>
	<p style={{textAlign:"left"}}>
{lsystemExpanded}
	</p>

	</header>
    </div>
  );
}

export default App;
