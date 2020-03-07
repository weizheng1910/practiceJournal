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
      recordings: []
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

  updateRecording(recording){
    // push
    this.state.recordings.push(recording)
    this.setState({recordings: this.state.recordings})
    
  }

  getDetails(date){
    let currentComponent = this
    const url = '/entry?date=' + date

    axios({
      method: 'get',
      url: url,
    })
    .then(function (response) {
      console.log("Get Details Response promise")
      console.log(response.data)
      const data = response.data
      currentComponent.setState({
        date: data.date,
        goals: data.goals,
        reflections: data.reflections,
        recordings: data.recordings
      })
    })
    .catch(function (error) {
      console.log(error);
    })

  }

  deleteRecording(index){
    let currentComponent = this
    const url = '/delete?index=' + index
    axios({
      method: 'post',
      url: url,
    })
    .then(function (response) {
      
      const data = response.data
      currentComponent.setState({
        date: data.date,
        goals: data.goals,
        reflections: data.reflections,
        recordings: data.recordings
      })
    })
    .catch(function (error) {
      console.log(error);
    })


  }

  postEntry(){
    const formData = new FormData()
      formData.append('date',this.state.date)
      formData.append('goals',this.state.goals)
      formData.append('reflections',this.state.reflections)
      for(let i = 0; i< this.state.recordings.length; i++){
        let currentRecording = this.state.recordings[i]
        if( currentRecording instanceof File){
          formData.append('record' + i, currentRecording)
          console.log('File instance is correctly appended')
          console.log(currentRecording)
        } else {
          let existingRecording = JSON.stringify(currentRecording)
          formData.append('record' + i, existingRecording)
          console.log('Existing recording is correctly appended')
          console.log(existingRecording)
        }
      }

      console.log("Posting!!!!")
      console.log(formData)
      
     
    const url = '/entry'
    let currentComponent = this

    axios({
      method: 'post',
      url: url,
      data: formData,

    })
    .then(function (response) {
      const data = response.data

      currentComponent.setState({
        date: data.date,
        goals: data.goals,
        reflections: data.reflections,
        recordings: data.recordings
      })

      console.log(currentComponent.state)
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render(){

    var recordings = this.state.recordings.map(file => {
      return<div>
        <div>{file.name}</div>
        <div><audio type="audio/mp3" controls="controls" src={file.file}/></div>
        <div><button onClick={(evt)=>this.deleteRecording(file.id)}>{file.id}</button></div>
      </div>
    })


   
    return <div>
      <div>Date</div>
      <div>
      <input onChange={(evt) => {this.getDetails(evt.target.value);this.updateDate(evt.target.value)}} type="date"></input>
      </div>

     <div>
      <p>henlo recordings here!</p>
      {recordings}
     </div>

     <button onClick={(evt) => {this.postEntry()}}>Post Entry</button>

      <br></br>
        <div>
          <p>What are your goals today?</p>
          <textarea rows="4" cols="50" onChange={(evt) => {this.updateGoals(evt.target.value);console.log(this.state)}} value={this.state.goals}></textarea>
        </div>
        <div>
          <p>Pen your reflections here!</p>
        <textarea rows="4" cols="50" onChange={(evt) => {this.updateReflections(evt.target.value)}} value={this.state.reflections}></textarea>
        </div>
      <div>
        <button className='btn btn-primary' onClick={(evt) => {this.props.liftEntry(this.state)}}>Add Entry</button>
      </div>




      <Recorder liftRecording={(recording)=>this.updateRecording(recording) }/>
     



      <div>End</div>
    </div>
  }
}

export default Journal
