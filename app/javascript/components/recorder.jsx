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
      blobFile: null,
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
        this.state.blobFile = file
        this.props.liftRecording(this.state.blobFile)

        this.setState({ blobFile: null, isRecording: false, name: '' });
        // Transfer recording files to journal.jsx
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
    var recordingButton = (this.state.isRecording ? <FaStop className='record-element' onClick={this.stop} disabled={this.state.isRecording} size={20}/> : <TiMediaRecord className='record-element' onClick={this.start} disabled={this.state.isRecording} size={32}/> )
    
    return (
      <div style={{width: 400 + 'px'}}>
        <div style={{width: 80 + '%'}} className="d-flex flex-row bd-highlight mb-3">
          <p>Recorder</p>
          <div className='mx-2'>
            <input className='input-box' style={{backgroundColor: 'rgba(225,225,225,0.1)', color: 'white'}} placeholder="Name of Recording" onChange={(evt) => this.updateInput(evt.target.value)} value={this.state.name}></input>
          </div>
          <div>
            {recordingButton}
          </div>
        </div>
        <div style={{width: 80 + '%'}}>
        </div>
      </div>
    );
  }
}

export default Recorder;
