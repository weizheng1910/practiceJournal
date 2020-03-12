// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import axios from 'axios';

import SimpleModal from '../components/modal'


class Score extends React.Component { 

  constructor(props) {
      super(props);
      this.state = {
          gallery: []
      }
  }

  componentDidMount() {
    console.log('In COMPONENT DID MOUNT')
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
          _this.setState({gallery: _this.state.gallery.concat(result)})
            })
  }

  

  render(){
        return (
            <div className="main">
                <h3>Your Scores</h3>
                <button onClick={this.uploadWidget.bind(this)} className="upload-button">
                  Upload
                </button>
                <div className="gallery">
                    <CloudinaryContext cloudName="dia55ehom">
                        {
                            this.state.gallery.map(data => {
                                return (
                                    <div className="responsive" key={data.public_id}>
                                        <div className="d-flex justify-content-start">
                                          <div>
                                            <SimpleModal name={data.public_id} file={`https://res.cloudinary.com/dia55ehom/image/upload/${data.public_id}.pdf`}/>                                            
                                          </div>
                                          <div>
                                            <button className="btn btn-outline-danger mx-1">Remove Score</button>
                                          </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </CloudinaryContext>
                    <div className="clearfix"></div>
                </div>
            </div>

        );
  }
}


export default Score