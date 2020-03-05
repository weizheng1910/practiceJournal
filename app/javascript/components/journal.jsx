
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Recorder from '../components/recorder'

class Journal extends React.Component { 
  constructor(){
    super()
    this.state = {
      date: "",
      goals: "",
      reflections:"",
      blob: ""
    }
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
    this.setState({blob:blob})
    console.log("Blob successfully uploaded!")
    console.log(this.state.blob)
  }


  render(){
   
    return <div>
      <div>Date</div>
      <div>
      <input type="date"></input>
      </div>
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
