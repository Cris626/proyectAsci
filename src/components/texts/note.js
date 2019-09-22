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

    /*getTexto = () =>{
        myFirestore.collection('users').doc(`${this.state.id}`).collection("textos").doc("2")
        .onSnapshot(snap=>{
            this.setState({
                txt: snap.data().txtDocument                
            })
            //console.log(this.state.txt)
        })
    }*/

    handleSubmit=e=>{
        e.preventDefault();
        myFirestore.collection("users").doc(`${this.state.id}`).collection("textos").doc(`${this.state.contId}`)
        .set({
            txtDocument: this.state.txt,
            title: this.state.titletxt
        });
        //console.log(this.state.txt)
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
                    <h2>Nuevo archivo</h2><hr align="left" noshade="noshade" size="2" width="100%"/>
                    {/*<label>{this.state.nm}</label>*/}
                    <label id="lbTitle">Titulo:</label>
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
                    />
                    {/*<textarea 
                        name="fulltext" 
                        onChange={this.updateInputTxt} 
                        value={this.state.txt} 
                        placeholder="Ingresar texto" 
                        rows="15" cols="120"
                    /><br/>*/}
                    <button id="x" class="btn btn-primary" onClick={this.confirmAlert}>Guardar</button>
                </form>
            </div>
        )
    }
}