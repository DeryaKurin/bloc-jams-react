import React, { Component } from 'react';
import './playerbar.css';

class PlayerBar extends Component {

  render() {
    return (
      <section className="player-bar">
        <section id="buttons">
           <button className="waves-effect waves-light btn pink darken-1" id="previous" onClick={this.props.handlePrevClick} >
             <span className="icon ion-md-skip-backward"></span>
           </button>
           <button className="waves-effect waves-light btn pink darken-1" id="play-pause" onClick={this.props.handleSongClick} >
             <span className={this.props.isPlaying ? "icon ion-md-pause" : "icon ion-md-play"}></span>
           </button>
           <button className="waves-effect waves-light btn pink darken-1" id="next" onClick={this.props.handleNextClick} >
             <span className="icon ion-md-skip-forward"></span>
           </button>
         </section>
         <section id="time-control">

           <input
             type="range"
             className="seek-bar"
             value={(this.props.currentTime / this.props.duration) || 0 }
             max='1'
             min='0'
             step='0.01'
             onChange={this.props.handleTimeChange}
          />
          <div className="time-info">
            <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
            <div className="total-time">{this.props.formatTime(this.props.duration)}</div>
          </div>
         </section>
         <section id="volume-control">
           <img className="volume-icons" src="/assets/images/icons/volume-high.png" alt="low volume icon" />
           <input
             type="range"
             className="seek-bar"
             value={this.props.volume}
             max='1'
             min='0'
             step='0.01'
             onChange={this.props.handleVolumeChange}
           />
         </section>
      </section>
    );
  }
}

export default PlayerBar;
