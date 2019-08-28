import React from 'react';
import './App.css';


class App extends React.Component{
  constructor(){
    super();
    this.state={
      score:0,
      clear:false,
      compPattern:[],
      userPattern:[],
      box1:false,
      box2:false,
      box3:false,
      box4:false
    }
  }

  componentDidMount(){
    this.addRandomNum();
  }

  componentDidUpdate(){
    let inputArr = this.state.userPattern;
    let compArr = this.state.compPattern;
    let isCorrect=false;
    let newPattern=[];
    for(let i=0;i<inputArr.length;i++){
      if(inputArr[i] === compArr[i]){
        isCorrect=true;
      }
      if(!isCorrect && this.state.clear === false) {
        this.setState({clear:true})
        // this.setState({score:"Final Score: " + this.state.score + 1})
      }
    }
    if(compArr.length <= inputArr.length && isCorrect){
      console.log(true);
      this.setState({score:this.state.score + 1})
      let newNum = this.addRandomNum();
      newPattern = [...inputArr, newNum];
      this.setState({userPattern:[]});
      this.showPattern(newPattern);
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
    return randNum;
  }

  showPattern=(currPat)=>{
    for(let i=0;i<currPat.length;i++){
      setTimeout(()=>{
        this.blink(currPat[i]);
      }, 800*(i+1))
    }
  }

  blink=(boxId)=>{
      this.setState({["box"+boxId]: true});
      setTimeout(()=>{
        this.setState({["box"+boxId]: false});
      }, 300)
  }

  handleClick=(id)=>{
    this.blink(id);
    this.setState({
      userPattern: [...this.state.userPattern, id]
    });
  }

  startFunc=()=>{
    let compPat = this.state.compPattern;
    this.showPattern(compPat);
  }

  render(){
    console.log("Render", this.state.compPattern, this.state.userPattern)
    return(
      <div id="wrapper">
        <h1>Simon</h1>
        <div>{"Score: " + this.state.score}</div>
        <div id="boxWrapper" style={{display:this.state.clear ? "none" : "block"}}>
          <Box active={this.state.box1} handleClick={this.handleClick} id={1} radius={"100px 0 0 0"} color={{num1:255, num2:0, num3:0}}/>
          <Box active={this.state.box2} handleClick={this.handleClick} id={2} radius={"0 100px 0 0"} color={{num1:0, num2:255, num3:0}}/>
          <Box active={this.state.box4} handleClick={this.handleClick} id={4} radius={"0 0 0 100px"} color={{num1:255, num2:255, num3:0}}/>
          <Box active={this.state.box3} handleClick={this.handleClick} id={3} radius={"0 0 100px 0"} color={{num1:0, num2:0, num3:255}}/>
        </div>
        <button onClick={this.startFunc}>Start Game</button>
      </div>
    )
  }
}

const Box = (props) =>{
  let opacity = props.active ? ".75" : ".25";
  let boxStyle = {
    borderRadius:props.radius,
    backgroundColor:"rgba("+ props.color.num1 + "," + props.color.num2 + "," + props.color.num3 + "," + opacity + ")"
  }
  return(
    <div onClick={()=>{props.handleClick(props.id)}} className="boxStyling" style={boxStyle}></div>
  )
}


export default App;
