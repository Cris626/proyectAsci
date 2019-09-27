// it does not work

import React from 'react';
import firebase from 'firebase';


export class Upload extends React.Component{
    constructor() {
    super()
        this.state = {
          uploading: false,
          percent: 0,
          file: '',
          names: '',
          urlFile: '',
          items: []
        }
        this.handleFileSelect = this.handleFileSelect.bind(this)
        this.handleFileUpload = this.handleFileUpload.bind(this)
    }


    handleFileSelect(e) {
        this.setState({
            file: e.target.files[0],    // file select
            names: e.target.files[0].name   // file name
//            urlFile: e.target.file[0].
        })
    }

    handleFileUpload() {    // upLoad
        this.setState({uploading: true})
        firebase.storage().ref()
        .child(`test/${this.state.names}`)
        .put(this.state.file)
        .then(snap => {
            this.setState({uploading: false})            
          })
          .catch(err => console.log(err.message))
    }

    render(){
        return (
            <div>
                <div>
                <input type='file' onChange={this.handleFileSelect}/>
                <button onClick={this.handleFileUpload}>Upload</button>
                </div>
                {this.state.uploading? 
                <div>
                    <div className='load-bar'/>
                    <span>Uploading: {this.state.percent}%</span>
                    </div>
                :''
                }
            </div>
        )
    }
}
