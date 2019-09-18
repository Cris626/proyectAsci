import React from 'react';
import { myFirestore } from '../config/firebase';
import firebase from 'firebase';

export class TextArea extends React.Component{
    constructor(){
        super();
        this.state={
            id:localStorage.getItem('id'),
            items: [],
            txt: '',
            titletxt: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTexto = this.getTexto.bind(this);
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

    updateInputTxt=e=>{
        this.setState({
            txt: e.target.value
        })
    }

    updateInputTitleTxt=e=>{
        this.setState({
            titletxt: e.target.value
        })
    }

    componentDidMount(){
        this.getTexto()
    }

    getTexto = () =>{
        myFirestore.collection('users').doc(`${this.state.id}`).collection("textos").doc("2")
        .onSnapshot(snap=>{
            this.setState({
                txt: snap.data().txtDocument                
            })
            //console.log(this.state.txt)
        })
    }

    handleSubmit=e=>{
        e.preventDefault();
        myFirestore.collection("users").doc(`${this.state.id}`).collection("textos").doc("2")
        .update({
            txtDocument: this.state.txt,
            title: this.state.titletxt
        });
        console.log(this.state.txt)
        this.handleFileUpload();
    }

    

    render(){
        return(
            <div class="col-lg-8" >
                <form onSubmit={this.handleSubmit}>
                    <h2>Nuevo archivo</h2><hr align="left" noshade="noshade" size="2" width="100%"/>
                    {/*<label>{this.state.nm}</label>*/}
                    <label id="lbTitle">Titulo:</label>
                    <input
                        type="text" 
                        id="txtTitle"
                        onChange={this.updateInputTitleTxt}
                        value={this.state.titletxt}
                    />
                    <textarea 
                        name="fulltext" 
                        onChange={this.updateInputTxt} 
                        value={this.state.txt} 
                        placeholder="Ingresar texto" 
                        rows="15" cols="120"
                    /><br/>
                    <button id="x" class="btn btn-primary">Guardar</button>
                </form>
            </div>
        )
    }
}