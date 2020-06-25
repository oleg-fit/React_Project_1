import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            count: 0,
            countWinX: 0,
            countWinO: 0
        }
        // Выигрышные комбинации 
        this.winnerLine = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
    }

    resetGame = () => {
        this.setState({
            squares: Array(9).fill(null)
        })

        this.setState({
            count: 0
        })
    }

    checkFirstXOrY = event => {
        let data = +event.target.getAttribute('data');
        if (data === 0) {
            this.setState({
                count: 0
            })
        } else if (data === 1) {
            this.setState({
                count: 1
            })
        }
    }

    checkDraw = () => {
        if (!this.state.squares.includes(null)) {
            alert('Ничья');
            setTimeout(() => {
                this.resetGame();
            }, 1000)
        }
    }

    checkWinXOrY = () => {
        if (this.state.count % 2 === 0) {
            this.setState({
                countWinX: this.state.countWinX + 1
            })
        } else {
            this.setState({
                countWinO: this.state.countWinO + 1
            })
        }
    }

    isWinner = () => {
        let s = (this.state.count % 2 === 0) ? 'X' : 'O';
        let maxNumberOfMoves = 8;
        let winnerFlag = false;

        for (let i = 0; i < maxNumberOfMoves; i++) {
            let line = this.winnerLine[i];

            if (this.state.squares[line[0]] === s &&
                this.state.squares[line[1]] === s &&
                this.state.squares[line[2]] === s) {

                this.checkWinXOrY();

                alert(s + ' ' + 'win');
                winnerFlag = true;

                setTimeout(() => {
                    this.resetGame();
                }, 1000)
            }
        }

        if (!winnerFlag) {
            this.checkDraw();
        }
    }

    clickHandler = event => {
        //data - номер квадрата по которому кликнули
        let data = event.target.getAttribute('data');
        let currentSquares = this.state.squares;

        if (currentSquares[data] === null) {
            currentSquares[data] = (this.state.count % 2 === 0) ? 'X' : 'O';

            this.setState({
                count: this.state.count + 1
            });

            this.setState({
                squares: currentSquares
            });
        } else {
            alert('Так нельзя!')
        }

        this.isWinner();
    }

    render() {
        return (
            <section>
                <div className="text">
                    <p>
                        Количество побед за X: {this.state.countWinX}
                    </p>
                    <p>
                        Количество побед за O: {this.state.countWinO}
                    </p>
                </div>
                <div className="btns">
                    <button className="btn" onClick={this.checkFirstXOrY} data="0">
                        First X
                    </button>
                    <button className="btn" onClick={this.checkFirstXOrY} data="1">
                        First Y
                    </button>
                </div>
                <div className="tic-tac-toe">
                    <div className="ttt-grid" onClick={this.clickHandler} data="0">
                        {this.state.squares[0]}
                    </div>
                    <div className="ttt-grid" onClick={this.clickHandler} data="1">
                        {this.state.squares[1]}
                    </div>
                    <div className="ttt-grid" onClick={this.clickHandler} data="2">
                        {this.state.squares[2]}
                    </div>
                    <div className="ttt-grid" onClick={this.clickHandler} data="3">
                        {this.state.squares[3]}
                    </div>
                    <div className="ttt-grid" onClick={this.clickHandler} data="4">
                        {this.state.squares[4]}
                    </div>
                    <div className="ttt-grid" onClick={this.clickHandler} data="5">
                        {this.state.squares[5]}
                    </div>
                    <div className="ttt-grid" onClick={this.clickHandler} data="6">
                        {this.state.squares[6]}
                    </div>
                    <div className="ttt-grid" onClick={this.clickHandler} data="7">
                        {this.state.squares[7]}
                    </div>
                    <div className="ttt-grid" onClick={this.clickHandler} data="8">
                        {this.state.squares[8]}
                    </div>
                </div>
                <button className="btn" onClick={this.resetGame}>
                    Reset
                </button>
            </section>
        );
    }
}

export default App;
