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

function App() {
   var LSystemString = "L(g=0,a=0,c=0) -> mov(2,22/(g+1),2)rot(40)[L(g=g+1,a=a,c=c)]rot(-40)L(g=g+1, a=a, c=c)";
   return (
      <div className="App">
         <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
	    <LSystem lsystemstring={LSystemString} lstring={LSystemString} depth={2} />
         </header>
      </div>
   );
}

export default App;
