import logo from './logo.svg';
import './App.css';

import { parse as LParser } from './lsystem';

function App() {
    var LSystem = "L(g=1,a=0,c=0) -> mov(2,22,2)rot(40)[L(g+1)]rot(-40)L(g+1)";
    var LString = "mov(2,22,2)rot(40)[L(g+1)]rot(-40)L(g+1)";

    var result = "";
    try {
	result = LParser(LString);
    } catch (error) {
	result = error;
    }
    console.log(result);

    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
	<pre style={{textAlign:"left"}}>
{JSON.stringify(result, null, '  ')}
	</pre>
	</header>
    </div>
  );
}

export default App;
