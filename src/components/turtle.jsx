import React, { Component } from 'react';

import { Lexecute } from '../L';
import { Stack } from '../stack.js';

class Turtle extends Component {

   constructor(props) {
      super(props);
      this.state = {
         isFetching: false,
         latest: null
      };
      this.stack = new Stack();
      this.handles = {
         pop: () => { this.pop(); },
         push: () => { this.push(); },
         rotate: (args) => { this.rotate(args); },
         move: (args) => { this.move(args); },
         context: (args) => { return this.contextFunc(args); }
      };
      this.canvas = React.createRef();
      this.ctx = false;
      this.x = 0;
      this.y = 0;
      this.omega = -90;
      this.lstringExe = "";
      this.drawThread = null;
      this.ticks = 0;

      this.draw = this.draw.bind(this);
   }

   draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.x = this.canvas.width / 2;
      this.y = this.canvas.height * 0.9;	// Executing
      this.omega = -90;
      Lexecute({ lstring: this.props.lstring}, this.handles);
      if (this.drawThread != null) {
         clearTimeout(this.drawThread);
      }
      this.ticks = (this.ticks + 1) % (360 * 1000);
      this.drawThread = setTimeout(this.draw, 0);
   }

   componentDidMount() {
      this.canvas = document.getElementById("canvas");
      if (this.canvas == null) {
         return;
      }
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.x = 0;
      this.y = 0;
      this.omega = -90;
      this.moveFactor = 0.001 * this.canvas.height;
      this.ctx = this.canvas.getContext("2d");
      this.ctx.strokeStyle = "white";
      if (this.drawThread != null) {
         clearTimeout(this.drawThread);
      }
      this.drawThread = setTimeout(this.draw, 0);
   }

   render() {
      return (
         <div>
            <canvas id="canvas" >
               Your browser does not support the  HTML5 canvas element
            </canvas>
         </div>
      );
   }

   push() {
      this.stack.push({ x: this.x, y: this.y, omega: this.omega });
   };

   pop() {
      var st = this.stack.pop();
      this.x = st.x;
      this.y = st.y;
      this.omega = st.omega;
   };

   contextFunc(args) {
      return this.ticks;
   }

   rotate(args) {
      this.omega += args[0];
   };

   move(args) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      var newX = this.x + args[0] * this.moveFactor * Math.cos((this.omega / 360.0) * Math.PI * 2);
      var newY = this.y + args[0] * this.moveFactor * Math.sin((this.omega / 360.0) * Math.PI * 2);

      this.ctx.lineWidth = args[1];
      this.ctx.lineTo(newX, newY);
      this.ctx.closePath();
      this.ctx.stroke();
      this.x = newX;
      this.y = newY;
   };

}
export default Turtle;
