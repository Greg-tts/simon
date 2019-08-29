import React from 'react';
import './App.css';


class App extends React.Component{
  constructor(){
    super();
    this.state={
      score:0,
      highScore:0,
      display:true,
      disabled:true,
      compPattern:[],
      userPattern:[],
      box1:false,
      box2:false,
      box3:false,
      box4:false
    }
  }

  componentDidMount(){
    this.rotatingLights(3);
    this.addRandomNum();
    const highScore = localStorage.getItem('highScore');
    this.setState({ highScore });
  }

  componentDidUpdate(){
    let inputArr = this.state.userPattern;
    let compArr = this.state.compPattern;

    let boolArr = inputArr.map((item, index)=>{
      return item === compArr[index];
    })
    let isCorrect = !boolArr.includes(false);

    if(isCorrect !== true && this.state.display === true) {
      this.setState({display:false})
    }
    if(compArr.length <= inputArr.length && isCorrect){
      this.setState({score:this.state.score + 1})
      let newNum = this.addRandomNum();
      this.setState({userPattern:[]});
      this.showPattern([...compArr, newNum]);
    }
    let score = this.state.score;
    if(score > this.state.highScore){
      this.setState({highScore:score});
      localStorage.setItem('highScore',score);
    }
  }
  resetHighScore=()=>{
    this.setState({highScore:0});
    localStorage.setItem('highScore',0);
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
        this.blink(currPat[i], 300);
      }, 800*(i+1))
    }

  }

  blink=(boxId, speed)=>{
      this.setState({["box"+boxId]: true});
      setTimeout(()=>{
        this.setState({["box"+boxId]: false});
      }, speed)
  }

  handleClick=(id)=>{
    this.blink(id, 300);
    this.setState({
      userPattern: [...this.state.userPattern, id]
    });
  }

  rotatingLights=(rotations)=>{
    let boxArr = [1,2,3,4];
    for(let i=1;i<5*rotations;i++){
      setTimeout(()=>{
        this.blink(boxArr[i%4],150);
      }, 100*(i+1))
    }
  }

  startFunc=()=>{
    this.setState({disabled:false})
    let compPat = this.state.compPattern;
    this.showPattern(compPat);
  }

  render(){
    return(
      <div id="wrapper">
        <h1>Simon</h1>
        <div>{"High Score: " + this.state.highScore}</div>
        <button onClick={this.resetHighScore}>Reset High Score</button>
        <div>{"Score: " + this.state.score}</div>
        <div id="boxWrapper" style={{display:this.state.display ? "block": "none"}}>
          <Box disabled={this.state.disabled} active={this.state.box1} handleClick={this.handleClick} id={1} radius={"100px 0 0 0"} color={{num1:255, num2:0, num3:0}}/>
          <Box disabled={this.state.disabled} active={this.state.box2} handleClick={this.handleClick} id={2} radius={"0 100px 0 0"} color={{num1:0, num2:255, num3:0}}/>
          <Box disabled={this.state.disabled} active={this.state.box4} handleClick={this.handleClick} id={4} radius={"0 0 0 100px"} color={{num1:255, num2:255, num3:0}}/>
          <Box disabled={this.state.disabled} active={this.state.box3} handleClick={this.handleClick} id={3} radius={"0 0 100px 0"} color={{num1:0, num2:0, num3:255}}/>
        </div>
        <button onClick={this.startFunc}>Start Game</button>
      </div>
    )
  }
}

const Box = (props) =>{
  let opacity = props.active ? ".75" : ".25";
  let disableClick = props.disabled ? "none" : "auto";
  let boxStyle = {
    pointerEvents: disableClick,
    borderRadius:props.radius,
    backgroundColor:"rgba("+ props.color.num1 + "," + props.color.num2 + "," + props.color.num3 + "," + opacity + ")"
  }
  return(
    <div onClick={()=>{props.handleClick(props.id)}} className="boxStyling" style={boxStyle}></div>
  )
}


export default App;
