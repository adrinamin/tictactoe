import { Component } from "react";
import { Board } from "./components/Boards/Board";
import { MoveHistory } from "./components/MoveHistory/MoveHistory";
import './App.css';

interface GameState {
  history: { squares: string[] }[],
  stepNumber: number;
  xIsNext: boolean;
}

class Game extends Component<{}, GameState> {
  constructor(props: any) {
    super(props);
    const initsqrs: string[] = [];
    for (let i = 0; i < 9; i++) {
        initsqrs[i] = "";
    }
    this.state = {
      history: [{        
        squares: Array(9).fill(null),      
      }],
      stepNumber: 0,
      xIsNext: true,
    };

    this.jumpTo = this.jumpTo.bind(this);
  }

  private handleClick(i : any) : void {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {      
      return;    
    }    
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step: number) : void {    
    this.setState({      
      stepNumber: step,      
      xIsNext: (step % 2) === 0,    
    });  
  }

  render() {
    const history = this.state.history;    
    const current = history[this.state.stepNumber];  
    const winner = calculateWinner(current.squares);
    
    let status;    
    if (winner) {      
      status = 'Winner: ' + winner;    
    } else {      
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');    
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board            
            squares={current.squares}            
            onClick={(i) => this.handleClick(i)} />        
        </div>
        <div className="game-info">
          <div>{status}</div>          
          <MoveHistory history={history} jumpTo={this.jumpTo}/>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render(): React.ReactNode {
    return (
      <div>
        <h2>Hello React TS!</h2>
        <Game />
      </div>
    );
  }
}

function calculateWinner(squares: string[]) : string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
