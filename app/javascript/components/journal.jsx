// Convert the mp3 into 'File' type
// To play convert it into a URL and use '<audio type="audio/mp3" controls="controls" />'


import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Recorder from '../components/recorder'

import axios from 'axios';

class Journal extends React.Component { 
  constructor(){
    super()
    this.state = {
      date: "",
      goals: "",
      reflections:"",
      blob: []
    }
  }

  updateDate(currentInput){
    this.setState({date: currentInput})
  }

  updateGoals(currentInput){
    console.log(currentInput)
    this.setState({goals: currentInput})
  }

  updateReflections(currentInput){
    console.log(currentInput)
    this.setState({reflections: currentInput})
  }

  updateBlob(blob){
    this.setState({blob:blob[0]})
    console.log("Blob successfully uploaded!")
    console.log(this.state.blob)
    console.log("Current State is")
    console.log(this.state)
  }

  postEntry(){
    const formData = new FormData()
      formData.append('date',this.state.date)
      formData.append('goals',this.state.goals)
      formData.append('reflections',this.state.reflections)
      formData.append('blob',this.state.blob)
     
    const url = '/entry'
      
    axios({
      method: 'post',
      url: url,
      data: formData,
      
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render(){
   
    return <div>
      <div>Date</div>
      <div>
      <input onChange={(evt) => this.updateDate(evt.target.value)} type="date"></input>
      </div>


     <button onClick={(evt) => this.postEntry()}>THIS WILL POST</button>

      <br></br>
        <div>
          <p>What are your goals today?</p>
          <textarea rows="4" cols="50" onChange={(evt) => {this.updateGoals(evt.target.value)}} value={this.state.goals}></textarea>
        </div>
        <div>
          <p>Pen your reflections here!</p>
        <textarea rows="4" cols="50" onChange={(evt) => {this.updateReflections(evt.target.value)}} value={this.state.reflections}></textarea>
        </div>
      <div>
        <button className='btn btn-primary' onClick={(evt) => {this.props.liftEntry(this.state)}}>Add Entry</button>
      </div>
      <Recorder liftRecording={(blob)=>this.updateBlob(blob) }/>
     



      <div>End</div>
    </div>
  }
}

export default Journal
