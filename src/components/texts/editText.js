import React from 'react';
import { myFirestore } from '../config/firebase';
import firebase from 'firebase';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";


export class EditText extends React.Component{
    constructor(){
        super();
        this.state={
            id:localStorage.getItem('id'),
            idText: localStorage.getItem('userId'),
            txt: '',
            txtArea: '',    //////
            titletxt: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTexto = this.getTexto.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.updateText = this.updateText.bind(this);
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

    updateText=()=>{
        myFirestore.collection("users").doc(`${this.state.id}`).collection("textos").doc(`${this.state.idText}`)
            .update({                                
                txtDocument: this.state.txt
            })
    }    

    componentDidUpdate(txt){       /////////
        
        /*setTimeout(() => {
            this.updateText()
        }, 1000);*/

        if(txt !== this.txtArea){
            myFirestore.collection("users").doc(`${this.state.id}`).collection("textos").doc(`${this.state.idText}`)
            .update({
                txtDocument: this.state.txt,
            });
        }
    }

    ////////
    /*updateInputTxt=e=>{
        this.setState({
            txt: e.target.value,
        })
    }*/

    componentDidMount(){     
        this.getTexto()
    }

    getTexto = () =>{
        myFirestore.collection('users').doc(`${this.state.id}`).collection("textos").doc(`${this.state.idText}`)
        .onSnapshot(snap=>{
            this.setState({
                txt: snap.data().txtDocument,
                txtArea: snap.data().txtDocument,
                titletxt: snap.data().title
            })
        })
    }

    handleSubmit=e=>{
        e.preventDefault();
        myFirestore.collection("users").doc(`${this.state.id}`).collection("textos").doc(`${this.state.idText}`)
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
                        <label id="lbTitle">{this.state.titletxt}</label>
                        {/*<label>{this.state.txt}</label>*/}
                        <SimpleMDE 
                            onChange={this.handleChange}
                            value={this.state.txt}                             
                            placeholder="Ingresar texto" 
                            options={{
                                autofocus: false,
                                spellChecker: false,
                                lineWrapping: false,
                              }}
                        />;
                        {/*<textarea                             
                            name="fulltext" 
                            onChange={this.updateInputTxt} 
                            value={this.state.txt}                             
                            placeholder="Ingresar texto" 
                            rows="15" cols="120"
                        /><br/>*/}
                        <button id="x" class="btn btn-primary" onClick={()=> this.alert()}>Guardar</button>
                    </form>
                </div>
                <div class="col-lg-2"></div>
            </div>
            
        )
    }
}