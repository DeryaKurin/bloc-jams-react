import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './album.css';

class Album extends Component {
  constructor(props) {
    super(props);
    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug
    });
    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 0.5,
      isPlaying: false,
      isHovered: null
    };
    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {
        this.setSong(song);
      }
      this.play();
    }
  }

  mouseEnterHandler(song) {(
    this.setState({isHovered: song})
  )}

  mouseEnterHandler(song) {
    this.setState({isHovered: song})
  }

  mouseLeaveHandler(song) {
    this.setState({isHovered: null})
  }

  playOrPauseIcon(song, index) {
    const isSameSong = this.state.currentSong === song;
    let btn;

    if(this.state.isHovered === song) {
        if (this.state.isPlaying && isSameSong) {
        btn = <span className="icon ion-md-pause"></span>
      } else {
        btn = <span className="icon ion-md-play"></span>
        }
    } else {
      if (this.state.isPlaying && isSameSong) {
        btn = <span className="icon ion-md-pause"></span>
      } else {
        btn = index + 1;
      }
    }
    return btn;
  }

  handlePrevClick() {
    let indexOfSong = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    let newIndex = Math.max(indexOfSong - 1, 0);
    let newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    let indexOfSong = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    let newIndex = Math.min(indexOfSong + 1, this.state.album.songs.length);
    let newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  formatTime(time) {
    if(isNaN(time)) {
      return "-:--";
    }
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time %60);
    seconds = seconds < 10 ? "0" + seconds : seconds.toString();
    return `${minutes}:${seconds}`;
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }

  render() {
    return (
      <section id="album">
        <section id="album-info">
           <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
           <div className="album-details">
             <h3 id="album-title">{this.state.album.title}</h3>
             <h5 className="artist">{this.state.album.artist}</h5>
             <div id="release-info">{this.state.album.releaseInfo}</div>
           </div>
         </section>
         <section className="songs">
             <table id="song-list">
               <colgroup>
                 <col id="song-number-column" />
                 <col id="song-title-column" />
                 <col id="song-duration-column" />
               </colgroup>
               <tbody>
               {
                 this.state.album.songs.map( (song, index) =>
                   <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.mouseEnterHandler(song)} onMouseLeave={() => this.mouseLeaveHandler(song)} >
                     <td>
                       <button className="waves-effect waves-light btn pink darken-1">
                         <span className="song-number">{this.playOrPauseIcon(song, index)}</span>
                       </button>
                     </td>
                     <td>{song.title}</td>
                     <td>{this.formatTime(song.duration)} seconds</td>
                   </tr>
                 )
               }
               </tbody>
             </table>
             <PlayerBar
               isPlaying={this.state.isPlaying}
               currentSong={this.state.currentSong}
               currentTime={this.audioElement.currentTime}
               duration={this.audioElement.duration}
               volume={this.audioElement.volume}
               handleSongClick={() => this.handleSongClick(this.state.currentSong)}
               handlePrevClick={() => this.handlePrevClick()}
               handleNextClick={() => this.handleNextClick()}
               handleTimeChange={(e) => this.handleTimeChange(e)}
               handleVolumeChange={(e) => this.handleVolumeChange(e)}
               formatTime={(time) => this.formatTime(time)}
             />
         </section>
      </section>
    );
  }
}

export default Album;
