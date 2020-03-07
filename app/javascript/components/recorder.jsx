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
      blobFiles: [],
      isBlocked: false,
      name: ''
    };
  }

  updateInput(currentInput){
    this.setState({name: currentInput})
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
        const file = new File(buffer, this.state.name + '.mp3', {
          type: blob.type,
          lastModified: Date.now()
        })
        //Push and update state object with recording files
        this.state.blobFiles.push(file)
        this.setState({ blobFiles: this.state.blobFiles, isRecording: false, name: '' });
        // Transfer recording files to journal.jsx
        this.props.liftRecording(this.state.blobFiles)
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

    /*
    var recordings = this.state.blobFiles.map(file => {
      return <div className='d-flex flex-row'>
          <div className='p-3'>
            <span>{file.name}</span>
          </div>
          <div>
            <audio type="audio/mp3" src={URL.createObjectURL(file)} controls="controls" />
          </div>
        </div>
    })
    */

    var recordingStatus = (this.state.isRecording ? 'Recording Ongoing': 'Press Record to start recording')
    
    return (
      <div style={{border: "solid black 1px", width: 400 + 'px'}}>
        <div style={{width: 80 + '%'}} className="d-flex flex-row bd-highlight mb-3">
          <div>
            <input placeholder="Name of Recording" onChange={(evt) => this.updateInput(evt.target.value)} value={this.state.name}></input>
          </div>
          <div>
            <TiMediaRecord onClick={this.start} disabled={this.state.isRecording} size={32}/>
          </div>
          <div>
            <FaStop onClick={this.stop} disabled={this.state.isRecording} size={20}/>
          </div>
        </div>
        <div style={{width: 80 + '%'}}>
            <p>{recordingStatus}</p>
        </div>
      </div>
    );
  }
}

export default Recorder;
