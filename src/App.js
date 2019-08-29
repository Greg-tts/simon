import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(){
    super();
    this.state={
      score:0,
      highScore:0,
      displayGame:true,
      displayStartButton:true,
      disabled:true,
      compPattern:[],
      userPattern:[],
      box1:false,
      box2:false,
      box3:false,
      box4:false,
      audioControl:false,
      audioAuto:false
    }
  }

  componentDidMount(){
    let highScore = localStorage.getItem('highScore');
    let randNum = this.getRandomInt();

    this.rotatingLights(3);
    this.setState({ highScore, compPattern: [...this.state.compPattern, randNum] });
      import('./appScript.js')
    .then(module => this.setState({ module: module.default }))

  }

  componentDidUpdate(){
    let inputArr = this.state.userPattern;
    let compArr = this.state.compPattern;

    let boolArr = inputArr.map((item, index)=>{
      return item === compArr[index];
    })
    console.log(inputArr, compArr, boolArr)
    let isCorrect = !boolArr.includes(false);

    if(isCorrect !== true && this.state.displayGame === true) {
      this.setState({displayGame:false})
    }
    if(compArr.length <= inputArr.length && isCorrect){
      this.setState({score:this.state.score + 1})

      let newRandNum = this.getRandomInt();
      this.setState({userPattern:[], compPattern: [...this.state.compPattern, newRandNum]});

      this.showPattern([...compArr, newRandNum]);
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

  getRandomInt=()=>{
    let min = Math.ceil(1);
    let max = Math.floor(5);
    return Math.floor(Math.random() * (max - min)) + min;
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
    this.setState({disabled:false, displayStartButton:false, audioAuto:true})
    let compPat = this.state.compPattern;
    this.showPattern(compPat);
  }
  restartFunc=()=>{
    let randNum = this.getRandomInt();
    this.setState({displayGame:true, score:0, compPattern:[randNum], userPattern:[]})
    this.showPattern([randNum]);
  }

  render(){
    return(
      <div id="wrapper">
        <canvas id="c"></canvas>
        <h1>Simon</h1>
        <button onClick={(()=>this.setState({audioControl:!this.state.audioControl}))}>Audio Controls</button>
        <audio controls={this.state.audioControl && "controls"} autoplay={this.state.audioAuto && "autoplay"}>
          <source src="onandon.ogg" type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
        <div>{"High Score: " + this.state.highScore}</div>
        <button onClick={this.resetHighScore}>Reset High Score</button>
        <div>{"Score: " + this.state.score}</div>
        <div id="boxWrapper" style={{display:this.state.displayGame ? "block": "none"}}>
          <Box disabled={this.state.disabled} active={this.state.box1} handleClick={this.handleClick} id={1} radius={"100px 0 0 0"} color={{num1:255, num2:0, num3:0}}/>
          <Box disabled={this.state.disabled} active={this.state.box2} handleClick={this.handleClick} id={2} radius={"0 100px 0 0"} color={{num1:0, num2:255, num3:0}}/>
          <Box disabled={this.state.disabled} active={this.state.box4} handleClick={this.handleClick} id={4} radius={"0 0 0 100px"} color={{num1:255, num2:255, num3:0}}/>
          <Box disabled={this.state.disabled} active={this.state.box3} handleClick={this.handleClick} id={3} radius={"0 0 100px 0"} color={{num1:0, num2:0, num3:255}}/>
        </div>
        {this.state.displayStartButton ? <button onClick={this.startFunc}>Start Game</button> : <button onClick={this.restartFunc}>Restart Game</button>}
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
