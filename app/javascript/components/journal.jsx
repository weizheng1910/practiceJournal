
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Journal extends React.Component { 
  constructor(){
    super()
    this.state = {
      date: "",
      goals: "",
      reflections:""
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


  render(){
   
    return <div>
      <div>Start</div>
      <div>
      <input type="date"></input>
      </div>
      <textarea onChange={(evt) => {this.updateGoals(evt.target.value)}} value={this.state.goals}></textarea>
      <textarea onChange={(evt) => {this.updateReflections(evt.target.value)}} value={this.state.reflections}></textarea>
      <button onClick={(evt) => {this.props.liftEntry(this.state)}}>Add Entry</button>
      <div>End</div>
    </div>
  }
}

export default Journal
