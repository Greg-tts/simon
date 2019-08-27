import React from 'react';
import './App.css';


class App extends React.Component{
  constructor(){
    super();
    this.state={
      compPattern:[],
      userPattern:[],
      box1:false,
      box2:false,
      box3:false,
      box4:false
    }
  }

  getRandomInt=(min, max)=>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  addRandomNum=()=>{
    let randNum = this.getRandomInt(1,5);
    this.setState({
      compPattern: [...this.state.compPattern, randNum]
    })
  }

  componentDidMount(){
    this.addRandomNum();
  }

  showPattern=(currPat)=>{
    for(let i=0;i<currPat.length;i++){
      setTimeout(()=>{
        this.setState({["box"+currPat[i]]: true});
        setTimeout(()=>{
          this.setState({["box"+currPat[i]]: false});
        }, 500)
      }, 800*i)
    }
  }

  handleClick=(id)=>{
    this.setState({
      userPattern: [...this.state.userPattern, id]
    });
  }
  startFunc=()=>{
    let compPat = this.state.compPattern;
    this.showPattern(compPat);
  }
  render(){
    console.log(this.state.compPattern, this.state.userPattern)
    return(
      <div>
        <h1>Simon</h1>
        <div id="boxWrapper">
          <Box active={this.state.box1} handleClick={this.handleClick} id={1} color={{num1:255, num2:0, num3:0}}/>
          <Box active={this.state.box2} handleClick={this.handleClick} id={2} color={{num1:0, num2:255, num3:0}}/>
          <Box active={this.state.box4} handleClick={this.handleClick} id={4} color={{num1:255, num2:255, num3:0}}/>
          <Box active={this.state.box3} handleClick={this.handleClick} id={3} color={{num1:0, num2:0, num3:255}}/>
        </div>
        <button onClick={this.startFunc}>Start Game</button>
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
    <div onClick={()=>{props.handleClick(props.id)}
  } className="boxStyling" style={boxStyle}>{"box " + props.id}</div>
  )
}


export default App;
