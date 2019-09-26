import React from 'react';
import { myFirestore } from '../config/firebase';
import firebase from 'firebase';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export class EditTextShare extends React.Component{
    constructor(){
        super();
        this.state={
            id:localStorage.getItem('id'),
            idUser: localStorage.getItem('shareId'),
            idText: localStorage.getItem('txtIdUser'),
            txt: '',
            txtArea: '',    ////
            titletxt: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTexto = this.getTexto.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.updateText = this.updateText.bind(this);
    }

    updateText=()=>{
        myFirestore.collection("users").doc(`${this.state.idUser}`).collection("textos").doc(`${this.state.idText}`)
            .update({
            txtDocument: this.state.txt,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.state.txt!==prevState.txt){
                this.updateText()
        }
    }

    componentDidMount(){
        this.getTexto()
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

    getTexto = () =>{   //
        myFirestore.collection('users').doc(`${this.state.idUser}`).collection("textos").doc(`${this.state.idText}`)
        .onSnapshot(snap=>{
            if(this.state.txt!==snap.data().txtDocument){
                this.setState({
                    txt: snap.data().txtDocument,
                    titletxt: snap.data().title
                })
            }
        })
    }

    handleSubmit=e=>{
        e.preventDefault();
        myFirestore.collection("users").doc(`${this.state.idUser}`).collection("textos").doc(`${this.state.idText}`)
        .update({
            txtDocument: this.state.txt,
        });
        this.handleFileUpload();
    }

    handleChange = value => {
        this.setState({ 
            txt: value
        });
    };

    alert=()=>{alert("Se guardo con exito")}

    render(){
        return(
            <div class="row">
                <div class="col-lg-2"></div>
                <div class="col-lg-8" >
                    <form onSubmit={this.handleSubmit}>
                        <h2>Editar archivo</h2><hr align="left" noshade="noshade" size="2" width="100%"/>
                        <label id="lbTitle">Titulo:</label> 
                        <label>{this.state.titletxt}</label>                                      
                        <SimpleMDE 
                            onChange={this.handleChange}
                            value={this.state.txt}                             
                            placeholder="Ingresar texto" 
                        />
                        <button id="x" class="btn btn-primary" onClick={()=> this.alert()}>Guardar</button>
                    </form>
                </div>
                <div class="col-lg-2"></div>
            </div>
        )
    }
}