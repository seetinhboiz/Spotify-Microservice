import PropTypes from 'prop-types';
import React from 'react';
import AlbumList from '../AlbumList';
import ArtistList from '../ArtistList';
import BrowseView from '../BrowseView';
import Livestream from '../Livestream/Livestream';
import SongList from '../SongList';
import './MainView.css';

const MainView = ({ headerTitle, audioControl, resumeSong, pauseSong }) => {
  return (
    <React.Fragment>
      {headerTitle === 'Albums' ? (
        <AlbumList audioControl={audioControl} />
      ) : headerTitle === 'Artists' ? (
        <ArtistList />
      ) : headerTitle === 'Browse' ? (
        <BrowseView />
      ) : headerTitle === 'Livestream' ? (
        <Livestream />
      ) : (
        //anything else show SongList
        <SongList
          resumeSong={resumeSong}
          pauseSong={pauseSong}
          audioControl={audioControl}
        />
      )}
    </React.Fragment>
  );
};

MainView.propTypes = {
  headerTitle: PropTypes.string,
  audioControl: PropTypes.func,
  resumeSong: PropTypes.func,
  pauseSong: PropTypes.func,
};

export default MainView;
