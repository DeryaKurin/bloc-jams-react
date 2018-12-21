import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import './library.css';


class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return (
      <section className='library'>
        {  this.state.albums.map( (album, index) =>
            <div className="album-list">
                <div className="album">
                  <Link to={`/album/${album.slug}`} key={index}>
                    <img className="z-depth-5 hoverable" src={album.albumCover} alt={album.title} />
                    <div className="album-info">
                    <div>{album.title}</div>
                    <div>{album.artist}</div>
                    <div>{album.songs.length} songs</div>
                    </div>
                  </Link>
                </div>
            </div>
          )
        }

      </section>
    );
  }
}



export default Library;
