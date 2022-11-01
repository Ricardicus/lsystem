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
         lsystem: `A(g=0) -> 
mov(random(100/(g+1)-10,100/(g+1)+10),5/(g+1))
rot((3/(g+1))*cos(context(0)))
[rot(random(-25,-15))A(g=g+1)] 
rot((3/(g+1))*cos(context(0)))
[rot(random(15,25))A(g=g+1)]
rot((3/(g+1))*sin(context(0)))`,
         depth: 12
      },{
         lsystem: `A(g=0) ->
rot(0.5 + 0.1*(0.5*sin(context(0)*7)),1)
mov(5,1)
A(g=0)
A(g=0)
rot(-22.5)
[
  rot(-22.5)
  A(g=0)
  rot(22.5)
  A(g=0)
  rot(22.5)
  A(g=0)
]
rot(22.5)
[
  rot(22.5)
  A(g=0)
  rot(-22.5)
  A(g=0)
  rot(-22.5)
  A(g=0)
]`,
         depth: 5
      }, {
         lsystem: `A(g=0) -> 
mov(35,2)
[rot(60)A(g=g+1)] 
[rot(-60)A(g=g+1)]`,
         depth: 10
      },
         {
         lsystem: `A(g=0) ->
B(g=0)
[rot(20)rot(sin(context(0)))A(g=0)]
B(g=0)
[rot(-20)rot(cos(context(0)*1.5))A(g=0)]
rot(20)
rot(sin(context(0)*1.5))
A(g=0),
B(g=0) ->
mov(1,1)
B(g=0)
B(g=0)
`, depth: 7
         },{
         lsystem: `A(g=0) ->
B(g=0)
rot(-22.5)
rot(sin(context(0)*1.2)*0.5)
[[A(g=0)]rot(22.5)rot(sin(context(0)*1.2)*0.5)A(g=0)]
rot(22.5)
B(g=0)
[rot(22.5)rot(sin(context(0)*1.2)*0.5)B(g=0)A(g=0)]
rot(-22.5)
A(g=0),
B(g=0) ->
mov(3,1)
B(g=0)
B(g=0)

`, depth: 5
         },
         {
         lsystem: `A(g=0) ->
mov(2,1)
rot(cos(context(0))*0.01)
A(g=0)
[rot(25.7)rot(cos(context(0)))A(g=0)]
A(g=0)
[rot(-25.7)rot(cos(context(0)))A(g=0)]
A(g=0)`, depth: 5
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
				<p>Lindenmayer system:</p>
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
         <option value={3}>Weeds 1</option>
         <option value={4}>Weeds 2</option>
         <option value={5}>Weeds 3</option>
         </select>
         <br/>
				<button onClick={() => { this.props.onHandleNewLSystem(this.state.currentText, this.state.chosenDepth);}}>Generate</button>
         <br/>
			</div>);
	}

}

export default LSystemInput;
