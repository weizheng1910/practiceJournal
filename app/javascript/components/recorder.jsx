import React from 'react';

import { TiMediaRecord } from 'react-icons/ti';
import { FaStop } from 'react-icons/fa';



import MicRecorder from 'mic-recorder-to-mp3';
import Journal from '../components/recorder'


const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Recorder extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
    };
  }

  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        this.setState({ blobURL, isRecording: false });
      }).catch((e) => console.log(e));
  };

  componentDidMount() {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      },
    );
  }

  render(){

    var recordingStatus = (this.state.isRecording ? 'Recording Ongoing': 'Press Record to start recording')
    
    return (
      <div style={{border: "solid black 1px", width: 200 + 'px'}}>
          <TiMediaRecord onClick={this.start} disabled={this.state.isRecording} size={32}/>
          <FaStop onClick={this.start} disabled={this.state.isRecording} size={20}/>
          <p>{recordingStatus}</p>
          <div>
          <audio src={this.state.blobURL} controls="controls" />
          </div>
      </div>
    );
  }
}

export default Recorder;
