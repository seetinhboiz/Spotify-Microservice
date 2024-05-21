import React, { Component } from "react";
import PropTypes from "prop-types";
import "./TrackSearch.css";

class TrackSearch extends Component {
  state = {
    searchTerm: ""
  };

  updateSearchTerm = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Trình duyệt của bạn không hỗ trợ tính năng nhận dạng giọng nói.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'vi-VN'; // Thiết lập ngôn ngữ nhận dạng

    recognition.addEventListener('result', e => {
      const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      this.setState({ searchTerm: transcript });
    });

    recognition.addEventListener('end', () => {
      recognition.stop();
      this.props.searchSongs(this.state.searchTerm, this.props.token);
    });

    recognition.start();
  };

  render() {
    return (
      <div className="track-search-container">
        <form
          onSubmit={() => {
            this.props.searchSongs(this.state.searchTerm, this.props.token);
          }}
        >
          <input
            onChange={this.updateSearchTerm}
            value={this.state.searchTerm}
            type="text"
            placeholder="Search..."
          />
          <button
            onClick={e => {
              e.preventDefault();
              this.props.searchSongs(this.state.searchTerm, this.props.token);
            }}
          >
            <i className="fa fa-search search" aria-hidden="true" />
          </button>
          <button type="button" onClick={this.startVoiceRecognition}>
            <i className="fa fa-microphone" aria-hidden="true"/>
          </button>
        </form>
      </div>
    );
  }
}

TrackSearch.propTypes = {
  searchSongs: PropTypes.func,
  token: PropTypes.string
};

export default TrackSearch;
