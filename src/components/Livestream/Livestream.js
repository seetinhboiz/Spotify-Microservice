import React from 'react';
import './Livestream.css';

let mediaRecorder;
const chunks = [];

// Component
const Livestream = () => (
  <div className="livestream-container">
    <div>
      <button id="startBtn" className="button-record" onClick={startRecording}>
        Start recording
      </button>
      <button id="stopBtn" className="button-record" onClick={stopRecording}>
        Stop recording
      </button>
    </div>
  </div>
);

const startRecording = () => {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function (stream) {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };
      mediaRecorder.start();
    })
    .catch(function (err) {
      console.error('Lỗi: Không thể truy cập microphone', err);
    });
};

const stopRecording = () => {
  mediaRecorder.stop();
  mediaRecorder.onstop = function () {
    const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
    const audioURL = URL.createObjectURL(blob);
    const audio = new Audio(audioURL);
    audio.controls = true;
    document.querySelector('.livestream-container').appendChild(audio);
  };
};

export default Livestream;
