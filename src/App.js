import React from 'react';
import './App.css';


class App extends React.Component{
  constructor(){
    super();
    this.state={

    }
  }
  handleClick=()=>{
    console.log("trigger");
  }
  render(){
    return(
      <div>
        <h1>Simon</h1>
        <div id="boxWrapper">
          <Box handleClick={this.handleClick} id={1} color={{num1:255, num2:0, num3:0}}/>
          <Box handleClick={this.handleClick} id={2} color={{num1:0, num2:255, num3:0}}/>
          <Box handleClick={this.handleClick} id={3} color={{num1:0, num2:0, num3:255}}/>
          <Box handleClick={this.handleClick} id={4} color={{num1:255, num2:255, num3:0}}/>
        </div>
      </div>
    )
  }
}

const Box = (props) =>{
  let boxStyle = {
    backgroundColor:"rgba("+ props.color.num1 + "," + props.color.num2 + "," + props.color.num3 + ", .25)"
  }
  return(
    <div onClick={props.handleClick} className="boxStyling" style={boxStyle}>box {props.id}</div>
  )
}


export default App;
