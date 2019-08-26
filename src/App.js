import React from 'react';
import './App.css';


class App extends React.Component{
  constructor(){
    super();
    this.state={
      box1:false,
      box2:false,
      box3:false,
      box4:false
    }
  }
  // // The HTML way
  // handleClick=(event)=>{
  //   console.log(event.target.dataset.id);
  // }

  handleClick=(id)=>{
    // let currentBox = "box"+id;// "box1"
    // let currentState = this.state[currentBox]; //false
    // this.setState({[currentBox]: !currentState});

    for(let i=1;i<5;i++){
      setTimeout(()=>{
        this.setState({["box"+i]: true});
      }, 500*i)
    }

  }
  render(){
    return(
      <div>
        <h1>Simon</h1>
        <div id="boxWrapper">
          <Box active={this.state.box1} handleClick={this.handleClick} id={1} color={{num1:255, num2:0, num3:0}}/>
          <Box active={this.state.box2} handleClick={this.handleClick} id={2} color={{num1:0, num2:255, num3:0}}/>
          <Box active={this.state.box4} handleClick={this.handleClick} id={4} color={{num1:255, num2:255, num3:0}}/>
          <Box active={this.state.box3} handleClick={this.handleClick} id={3} color={{num1:0, num2:0, num3:255}}/>

        </div>
      </div>
    )
  }
}

const Box = (props) =>{
  let opacity = props.active ? ".75" : ".25";
  let boxStyle = {
    backgroundColor:"rgba("+ props.color.num1 + "," + props.color.num2 + "," + props.color.num3 + "," + opacity + ")"
  }

  return(
    /* 
      The HTML Way
      <div data-id={props.id} onClick={props.handleClick} className="boxStyling" style={boxStyle}>{"box " + props.id}</div> 
    */
    <div onClick={()=>{props.handleClick(props.id)}
  } className="boxStyling" style={boxStyle}>{"box " + props.id}</div>
  )
}


export default App;
