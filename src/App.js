import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(){
    super();
    this.state={
      score:0,
      compPattern:[],
      userPattern:[],
      showGame:true,
      disabled:true,
      boxStatus1:false,
      boxStatus2:false,
      boxStatus3:false,
      boxStatus4:false
    }
  }

  componentDidMount(){
    let randNum = this.getRandomInt();
    this.setState({compPattern: [...this.state.compPattern, randNum] });
  }

  componentDidUpdate(){

    let inputArr = this.state.userPattern;
    let compArr = this.state.compPattern;

    let boolArr = this.state.userPattern.map((item, index)=>{
      return item === this.state.compPattern[index];
    })

    let isCorrect = !boolArr.includes(false);

    if(compArr.length <= inputArr.length && isCorrect){
      let newRandNum = this.getRandomInt();
      this.setState({score:this.state.score + 1, userPattern:[], compPattern: [...this.state.compPattern, newRandNum]});
      this.showPattern([...compArr, newRandNum]);
    }

    if(!isCorrect && this.state.showGame){
      this.setState({showGame:false});
    }

  }

  getRandomInt=()=>{
    return Math.floor(Math.random()*4) + 1;
  }

  showPattern=(currPat)=>{
    for(let i=0;i<currPat.length;i++){
      setTimeout(()=>{
        this.blink(currPat[i]);
      }, 800*(i+1))
    }
  }

  blink=(boxId)=>{
    this.setState({["boxStatus"+boxId]: true});
    setTimeout(()=>{
      this.setState({["boxStatus"+boxId]: false});
    }, 300)
  }

  handleBoxClick=(id)=>{
    this.blink(id, 300);
    this.setState({
      userPattern: [...this.state.userPattern, id]
    });
  }

  startGame=()=>{
    this.setState({disabled:false})
    let compPat = this.state.compPattern;
    this.showPattern(compPat);
  }

  render(){
    return(
      <div id="wrapper">
        <h1>Simon</h1>
        <div>{"Score: " + this.state.score}</div>
        <div id="boxWrapper" style={{display:this.state.showGame ? "block":"none"}}>
          <Box id={1} disabled={this.state.disabled} active={this.state.boxStatus1} handleBoxClick={this.handleBoxClick} color={"lightCyan"}/>
          <Box id={2} disabled={this.state.disabled} active={this.state.boxStatus2} handleBoxClick={this.handleBoxClick} color={"lightGreen"}/>
          <Box id={4} disabled={this.state.disabled} active={this.state.boxStatus4} handleBoxClick={this.handleBoxClick} color={"lightYellow"}/>
          <Box id={3} disabled={this.state.disabled} active={this.state.boxStatus3} handleBoxClick={this.handleBoxClick} color={"lightBlue"}/>
        </div>
        <button onClick={this.startGame}>Start Game</button>
      </div>
    )
  }
}

const Box = (props) =>{
  let darkColor = props.color.replace("light", "").toLowerCase()
  let boxColor = props.active ? darkColor : props.color;
  let disableClick = props.disabled ? "none" : "auto";
  let boxStyle = {
    pointerEvents: disableClick,
    backgroundColor: boxColor
  }
  return(
    <div onClick={()=>{props.handleBoxClick(props.id)}} className="boxStyling" style={boxStyle}></div>
  )

}
export default App;