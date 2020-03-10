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

  componentDidMount() {
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
                                          <div className='w-25'>
                                            <MdDelete size={30}/>
                                          </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </CloudinaryContext>
                    <div className='w-25 px-6' style={{border: 'solid black 2px', borderRadius: 25 + 'px'}}>
                      Upload <FiUpload onClick={this.uploadWidget.bind(this)} />
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>

        );
  }
}


export default Score