import React, { Component } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';

import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import { FaWindowClose } from 'react-icons/fa';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import 'react-pdf/dist/Page/AnnotationLayer.css';

export default class Pdf extends Component {
  state = { numPages: null, pageNumber: 1 };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>{
    if(this.state.pageNumber < 2){
      this.setState(state => ({ pageNumber: 1 }));
    } else {
      this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    }
  }

  goToNextPage = () => {
    if(this.state.pageNumber == this.state.numPages){
      this.setState(state => ({ pageNumber: state.numPages }));
    } else {
      this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
    }
  }

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div style={{border: 0 + 'px'}}>
        <div className="d-flex justify-content-between" style={{border: 0 + 'px'}}>
            <div className='arrows'>
              <FaArrowLeft onClick={this.goToPrevPage} size={40}/>
            </div>
            <div className='d-flex flex-row'>
              <div className='close-score mx-2' >
                <FaWindowClose size={40} onClick={(evt) => {this.props.close()}}/>
              </div>
              <div style={{fontSize: 28 + 'px'}} className="font-weight-bold">
                Page {pageNumber} of {numPages}
              </div>
            </div>
            <div className='arrows'>
              <FaArrowRight onClick={this.goToNextPage} size={40}/>
            </div>
        </div>
        

        <div style={{ width: 800}}>
          <Document
            options={{
              cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
              cMapPacked: true,
            }}
            file={this.props.file}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={800} />
          </Document >
        </div>

        
      </div>
    );
  }
}