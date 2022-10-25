import './App.css';

import LSystem from './components/Lsystem';
function App() {
   var LSystemString =  "L(g=0) -> mov(random(0,20)+80/(g+1),7/(g+1))[rot(20)L(g=g+1)][rot(-20)L(g=g+1)]" 
   return (
      <div className="App">
         <header className="App-header">
	    <LSystem lsystemstring={LSystemString} lstring={LSystemString} depth={10} />
         </header>
      </div>
   );
}

export default App;
