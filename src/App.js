import './App.css';

import LSystem from './components/Lsystem';
function App() {
   var LSystemString = 
`L(g=0) -> 
mov(random(100/(g+1)-10,100/(g+1)+10),5/(g+1))
rot((3/(g+1))*cos(context(0)))
[rot(random(-25,-15))L(g=g+1)] 
rot((3/(g+1))*cos(context(0)))
[rot(random(15,25))L(g=g+1)]
rot((3/(g+1))*sin(context(0)))`;

   return (
      <div className="App">
         <header className="App-header">
	    <LSystem lsystemstring={LSystemString} lstring={LSystemString} depth={12} />
         </header>
      </div>
   );
}

export default App;
