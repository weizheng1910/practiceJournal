// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.



import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { FiUpload } from 'react-icons/fi';


import SimpleModal from '../components/modal'


class Score extends React.Component { 

  constructor(props) {
      super(props);
      this.state = {
          gallery: []
      }
  }

  componentDidMount(){
    const url = `https://res.cloudinary.com/dia55ehom/image/list/scores.json`
    let currentComponent = this
    axios({
      method: 'get',
      url: url,
      cache: false,
    }).then( function(res){
      console.log(res.data.resources)
      currentComponent.setState({gallery: res.data.resources})
      console.log(currentComponent.state.gallery)
    }).catch(function (error) {
      console.log(error);
    })
  }

  uploadWidget(){
    let _this = this;
    cloudinary.openUploadWidget({ cloud_name: 'dia55ehom', upload_preset: 'fym39chg', tags:['scores']},
        function(error, result) {
          if (result != null){
            _this.setState({gallery: _this.state.gallery.concat(result)})
          }
            })
  }

  removeScore(publicid){
    let currentComponent = this
    const url = '/remove?publicid=' + publicid
    axios({
      method: 'post',
      url: url,
    })
    .then(function (response) {
      // Client-side removal
      // Find the score in the state array
      // And remove from it.
      for (let i = 0; i < currentComponent.state.gallery.length; i++){
        if(currentComponent.state.gallery[i].public_id == publicid.toString()){
          console.log('match')
          currentComponent.state.gallery.splice(i,1)
          console.log('success delete!')
          currentComponent.setState({gallery: currentComponent.state.gallery})
          console.log('Check gallery')
          console.log(currentComponent.state.gallery)

        } else {
          console.log('no match')
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render(){
        return (
            <div className="main">
                <h3>Your Scores</h3>
                <div className="gallery">
                    <CloudinaryContext cloudName="dia55ehom">
                        {
                            this.state.gallery.map(data => {
                                let file = `https://res.cloudinary.com/dia55ehom/image/upload/${data.public_id}.pdf`
                                
                                return (
                                    <div className="responsive" key={data.public_id}>
                                        <div className="d-flex justify-content-start">
                                          <div className='w-75 banana'>
                                            <p onClick={(evt)=>{this.props.liftFile(file)}}>{data.public_id}</p>                                            
                                          </div>
                                          <div className='score-delete w-25'>
                                            <MdDelete onClick={(evt) => {this.removeScore(data.public_id)}} size={30}/>
                                          </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </CloudinaryContext>
                    <div id='upload-button' onClick={this.uploadWidget.bind(this)} className='w-25 px-6' >
                      Upload <FiUpload />
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>

        );
  }
}


export default Score