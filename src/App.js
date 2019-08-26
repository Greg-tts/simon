import React from 'react';
import './App.css';


class App extends React.Component{
  constructor(){
    super();
    this.state={
      pattern:[1,2,3,2,4],
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
    let currPat = this.state.pattern;
    let currentState;

    for(let i=0;i<currPat.length;i++){

      setTimeout(()=>{
        // currentState = this.state["box"+currPat[i]];
        this.setState({["box"+currPat[i]]: true});
        setTimeout(()=>{
          this.setState({["box"+currPat[i]]: false});
        }, 500)
      }, 800*i)

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
