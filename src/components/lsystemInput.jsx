import React, { Component } from 'react';

class LSystemInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentText: this.props.lsystemstring,
			chosenDepth: this.props.depth
		};
      // Some presaved configurations:
      this.presavedConfigs = [{
         lsystem: `L(g=0) -> 
mov(random(100/(g+1)-10,100/(g+1)+10),5/(g+1))
rot((3/(g+1))*cos(context(0)))
[rot(random(-25,-15))L(g=g+1)] 
rot((3/(g+1))*cos(context(0)))
[rot(random(15,25))L(g=g+1)]
rot((3/(g+1))*sin(context(0)))`,
         depth: 12
      },{
         lsystem: `L(g=0) ->
rot(0.5 + 0.1*(0.5*sin(context(0)*7)),1)
mov(5,1)
L(g=0)
L(g=0)
rot(-22.5)
[
  rot(-22.5)
  L(g=0)
  rot(22.5)
  L(g=0)
  rot(22.5)
  L(g=0)
]
rot(22.5)
[
  rot(22.5)
  L(g=0)
  rot(-22.5)
  L(g=0)
  rot(-22.5)
  L(g=0)
]`,
         depth: 5
      }, {
         lsystem: `L(g=0) -> 
mov(35,2)
[rot(60)L(g=g+1)] 
[rot(-60)L(g=g+1)]`,
         depth: 10
      }
      ];

      this.newConfig = this.newConfig.bind(this);
      this.newDepth = this.newDepth.bind(this);
		this.handleNewInput = this.handleNewInput.bind(this);
	}

   newConfig(e) {
      var val = e.target.value;
      var config = this.presavedConfigs[val];
      this.setState({
         chosenDepth: config.depth,
         currentText: config.lsystem
      });
   }

   newDepth(val) {
      this.setState({chosenDepth: val});
   }

	handleNewInput(val) {
		this.setState({
			currentText: val.target.value
		});
	}

	render() {
      var depthNotice = "";

      if ( this.state.chosenDepth > 14 ) {
         depthNotice = <div><small style={{"color":"red", "font-size":"50%"}}>Higher depths take longer time to generate</small><br/></div>
      }
		return (
			<div>
				<p>L system rule:</p>
				<textarea style={{ width: "20%", minWidth:"200px" }}
					rows="12"
					id="LSystemTextArea"
					value={this.state.currentText}
					onChange={this.handleNewInput}
				></textarea><br />
				<small>depth: </small>
				<input type="number" style={{ width: "40px" }} value={this.state.chosenDepth} onChange={
					e => {this.newDepth(e.target.value);}
				}></input>
				{depthNotice}<br/>
         <small style={{"font-size":"50%"}}>Configurations</small><br/>
         <select onChange={(e) => {this.newConfig(e);}}>
         <option value={0}>Tree in wind</option>
         <option value={1}>Seaweed</option>
         <option value={2}>Honeycomb</option>
         </select>
         <br/>
				<button onClick={() => { this.props.onHandleNewLSystem(this.state.currentText, this.state.chosenDepth);}}>Generate</button>
         <br/>
			</div>);
	}

}

export default LSystemInput;
