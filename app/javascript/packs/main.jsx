// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Journal from '../components/journal'
import Pdf from '../components/document'
import Score from '../components/score'

import './style.scss';

class App extends React.Component { 
  constructor(){
    super()
    this.state = {
      entries:[],
      display: false,
      file: ''
    }
  }

  addEntry(entry){
    this.state.entries.push(entry)
    this.setState({entries:this.state.entries})
    console.log("after addEntry")
    console.log(this.state.entries)
  }

  setFile(file){
    this.setState({file: file, display: true})
  }

  clearFile(){
    this.setState({file: '', display: false})
  }

  render(){
    let monitor = (this.state.display ? <Pdf close={() => {this.clearFile()}} file={this.state.file}/> : <Score liftFile={(file) => {this.setFile(file)}}/>)
    
    return <div className="row vw-100">
      <div className="col mx-3">
      <Journal liftEntry={(entry) => this.addEntry(entry)}/>
      </div>
      <div className="col mx-3">
      {monitor}
      </div>
    </div>
    
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App/>,
    document.body.appendChild(document.querySelector('#root')),
  )
})
