import React from 'react';
import { myFirestore } from '../config/firebase';
import firebase from 'firebase';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export class TextArea extends React.Component{
    constructor(){
        super();
        this.state={
            id:localStorage.getItem('id'),
            items: [],
            txt: '',
            contId:'',
            titletxt: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this)
    }

    handleFileUpload() {    // upLoad
        firebase.storage().ref()
        .child(`test/${this.state.titletxt}.txt`)
        .putString(this.state.txt)
        .then(snap => {
            this.setState({uploading: false})            
          })
          .catch(err => console.log(err.message))
    }


    updateInputTitleTxt=e=>{
        this.setState({
            titletxt: e.target.value
        })
    }

    componentDidMount(){
        myFirestore.collection('users').doc(`${this.state.id}`).collection("textos").get()
        .then(snapShots=>{
            this.setState({
                items: snapShots.docs.map(doc=>{
                    this.setState({
                        contId: doc.id
                    })
                    return {
                        id: doc.id,
                    }
                })
            })
        },error=>{
            console.log(error)
        })
        .then(()=>{
            let cont = parseFloat(this.state.contId) + 1;
            if(cont){
                this.setState({contId: cont})
            }else{
                cont = 1;
                this.setState({contId: cont})
            }
        })
    }

    handleSubmit=e=>{
        e.preventDefault();
        myFirestore.collection("users").doc(`${this.state.id}`).collection("textos").doc(`${this.state.contId}`)
        .set({
            txtDocument: this.state.txt,
            title: this.state.titletxt
        });
        this.handleFileUpload();
    }

    handleChange = value => {
        this.setState({ 
            txt: value
        });
    };

    confirmAlert=()=>{alert(`Se guardo con exito`)}

    render(){
        return(
            <div class="col-lg-8" >
                <form onSubmit={this.handleSubmit}>
                    <h2>New File</h2><hr align="left" noshade="noshade" size="2" width="100%"/>
                    <label id="lbTitle">Title:</label>
                    <input
                        type="text" 
                        id="txtTitle"
                        onChange={this.updateInputTitleTxt}
                        value={this.state.titletxt}
                        autoComplete="off"
                    />
                    <SimpleMDE
                        onChange={this.handleChange}
                        value={this.state.txt}
                        placeholder="Ingresar texto" 
                    /><br/>
                    <button id="x" class="btn btn-primary" onClick={this.confirmAlert}>Save</button>
                </form>
            </div>
        )
    }
}