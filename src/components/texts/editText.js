import React from 'react';
import { myFirestore } from '../config/firebase';
import firebase from 'firebase';

export class EditText extends React.Component{
    constructor(){
        super();
        this.state={
            id:localStorage.getItem('id'),
            idText: localStorage.getItem('userId'),
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

    componentDidMount(){
        this.getTexto()
    }

    getTexto = () =>{
        myFirestore.collection('users').doc(`${this.state.id}`).collection("textos").doc(`${this.state.idText}`)
        .onSnapshot(snap=>{
            this.setState({
                txt: snap.data().txtDocument,
                titletxt: snap.data().title
            })
            //console.log(this.state.txt)
        })
    }

    handleSubmit=e=>{
        e.preventDefault();
        myFirestore.collection("users").doc(`${this.state.id}`).collection("textos").doc(`${this.state.idText}`)
        .update({
            txtDocument: this.state.txt,
//            title: this.state.titletxt
        });
        console.log(this.state.txt)
        this.handleFileUpload();
    }

    alert=()=>{alert("Se guardo con exito")}

    render(){
        return(
            <div class="col-lg-8" >
                <form onSubmit={this.handleSubmit}>
                    <h2>Editar archivo</h2><hr align="left" noshade="noshade" size="2" width="100%"/>
                    <label id="lbTitle">Titulo:</label>                    
                    {<label id="lbTitle">{this.state.titletxt}</label>}
                    <textarea 
                        name="fulltext" 
                        onChange={this.updateInputTxt} 
                        value={this.state.txt} 
                        placeholder="Ingresar texto" 
                        rows="15" cols="120"
                    /><br/>
                    <button id="x" class="btn btn-primary" onClick={()=> this.alert()}>Guardar</button>
                </form>
            </div>
        )
    }
}