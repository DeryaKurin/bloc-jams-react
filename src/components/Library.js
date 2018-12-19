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
        {
          this.state.albums.map( (album, index) =>
            <div className="container">
              <div className="row">
                <div className="album col-4">
                  <Link to={`/album/${album.slug}`} key={index}>
                  <img src={album.albumCover} alt={album.title} />
                  <div className="album-info">
                  <div>{album.title}</div>
                  <div>{album.artist}</div>
                  <div>{album.songs.length} songs</div>
                  </div>
                  </Link>
                  </div>
              </div>
            </div>
          )
        }
      </section>
    );
  }
}



export default Library;
