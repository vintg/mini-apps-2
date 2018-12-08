import React, { Component } from 'react';
import axios from 'axios';

import Pins from  './components/pins';
import InfoBoard from './components/infoboard';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      playerCt: 0,
      playerNames: [],
      currentPlayer: 0,
      currentGame: 0,
      GameCt: 0,
      pinsRemaining: 10,
      turn: 1,
      frame: 1,
      frameScore: undefined,
      scoreBoard : {}
    };

    this.updateScore = this.updateScore.bind(this);
  }

  updateScore(e){
    let bowl = $(e).target.value();
    let playername = this.playerNames[this.currentPlayer];
    let turn = this.state.turn;
    let turnsAllowed = 2;
    let updatedBoard = this.state.scoreBoard;

    if (bowl===10){
      if (this.state.frame===10 && turn===2) turnsAllowed = 3;
      else turnsAllowed = 1;
    }

    updatedBoard[playername].frameBowls.push(bowl);

    this.setState({
      scoreBoard: updatedBoard,
      pinsRemaining: this.state.pinsRemaining - bowl,
      turn: this.state.turn++
    });

    if(turn === turnsAllowed) {
      this.setState({
        currentPlayer: ++this.state.currentPlayer%this.state.playerCt,
        this.state.turn: 1
      });
    }

    if(this.state.currentPlayer === this.state.playerCt-1){
      if(this.state.frame<10){
        this.setState({
          frame: this.state.frame++;
        });
      } else {
        if(this.state.gameCt>0){
          this.saveGame();
          this.setState({
            gameCt: this.state.gameCt--,
            frame: 1
          });
        }
      }
    }
  }

  componentDidMount(){
    this.loadLeaderBoard();
  }

  newGame(){
    let playerCt = prompt("Number of Players", 1)
    let players = [];

    for (let i = 0; i<playerCt; i++){
      players.push(prompt("Please enter your name", "Player "+(i+1)));
    }

    let gameCt = prompt("Number of Games", 1);
    let scoreboard = {};

    for (let j = 0; j<players.length; j++){
      let playerName = players[j];
      scoreboard[playerName] = {
        frameBowls: [],
        frameTotals: [],
        totalScore: 0
      };
    }

    this.setState({
      playerCt: playerCt,
      playerNames: players,
      gameCt: gameCt
      scoreBoard: scoreboard
    });

  }

  saveGame(){

  }

  loadLeaderBoard(){

  }

  render(){
    <InfoBoard board={this.state.scoreBoard} />
    <Pins pins={this.state.pinsRemaining} handleClick={this.updateScore}/>

  }

};