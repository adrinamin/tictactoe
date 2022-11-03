import React, { Component, FunctionComponent } from 'react';
import './App.css';

interface SquareProps {
  value: string;
  onClick: () => void;
}

function Square(props: SquareProps): JSX.Element {
  return (
    <button 
      className="square" 
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// interface BoardState {
//   squares: string[];
// }

class Board extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  private handleClick(i : any) : void {
    const squares : string[] = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {      
      return;    
    }    
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  private renderSquare(i : number) : JSX.Element {
    return <Square 
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)} />;
  }

  render() {
    const winner: string | null = calculateWinner(this.state.squares);    
    let status: string;    
    if (winner) {      
      status = 'Winner: ' + winner;    
    } else {      
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');    
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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
