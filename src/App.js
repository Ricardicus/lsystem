import logo from './logo.svg';
import './App.css';

import { parse as LParser } from './lsystem';
import { Levolve, LexportAsString, Lexecute } from './L';
import LSystem from './components/Lsystem';

function move(args) {
   console.log("move");
   console.log(args);
}

function rotate(args) {
   console.log("rotate");
   console.log(args);
}

function push() {
   console.log("push");
}

function pop() {
   console.log("pop");
}

var handles = {
   move: move,
   rotate: rotate,
   pop: pop,
   push: push
}

function test(a) { a.hej = "hej" }

function App() {
   var LSystemString = "L(g=0,a=0,c=0) -> mov(2,22/(g+1),2)rot(40)[L(g=g+1,a=a,c=c)]rot(-40)L(g=g+1, a=a, c=c)";
   var LString = "mov(2,22/(g+1),2)rot(40)[L(g+1)]rot(-40)L(g+1)";

   var a = { "hej": "test" };
   test(a);

   var result = "";
   var lstring = LString;
   try {
      result = LParser(LSystemString);
      lstring = result["rules"];
   } catch (error) {
      result = error;
   }
   console.log(result);
   var lsystem = { state: { g: 0, a: 0, c: 0 }, lstring: lstring, stack: null };
   Levolve(lsystem, 2);
   console.log(lsystem);
   Lexecute(lsystem, handles);
   console.log(lsystem);
   var lsystemExpanded = LexportAsString(lsystem);


   // Test expanded string
   var result2 = LParser(lsystemExpanded);
   Lexecute({lstring:result2.value}, handles);

   return (
      <div className="App">
         <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <pre style={{ textAlign: "left" }}>
               {JSON.stringify(lsystem, null, " ")}
            </pre>
            <p style={{ textAlign: "left" }}>
               {lsystemExpanded}
            </p>

	    <LSystem lstring={lsystemExpanded} />
         </header>
      </div>
   );
}

export default App;
