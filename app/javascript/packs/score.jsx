// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import axios from 'axios';


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
    }).then( function(res){
      console.log(res.data.resources)
      currentComponent.setState({gallery: res.data.resources})
      console.log("Now State has")
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
                <h1>Galleria</h1>
                <button onClick={this.uploadWidget.bind(this)} className="upload-button">upload</button>
                <div className="gallery">
                    <CloudinaryContext cloudName="dia55ehom">
                <Image publicId="pqajsu5ih75c8rxee1jd" alt="A sample photo" className="Samples"></Image>
                        {
                            this.state.gallery.map(data => {
                                return (
                                    <div className="responsive" key={data.public_id}>
                                        <div className="img">
                                            <a target="_blank" href={`https://res.cloudinary.com/dia55ehom/image/upload/${data.public_id}.pdf`}>
                                              {data.public_id}
                                              <Image publicId="long_multi_page_pdf" >   </Image>
                                            </a>
                                            <div className="desc">Created at {data.created_at}</div>
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

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Score/>,
    document.body.appendChild(document.querySelector('#score')),
  )
})
