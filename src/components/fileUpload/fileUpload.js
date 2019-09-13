import React from 'react';
import firebase from 'firebase';
//import { snapShots } from 'firebase';

//import { myStorage } from '../config/firebase';
//import { file } from '@babel/types';
//import  FileUploader  from 'react-firebase-file-uploader' ; 


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


/*
<pre>
    <code>
        {this.state.error ? <span className='error'>{this.state.error}</span> : ''}
        {JSON.stringify(this.state.file, null, 2)}
    </code>
</pre>
*/