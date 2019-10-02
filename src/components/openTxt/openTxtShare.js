import React from 'react';
import { myFirestore } from '../config/firebase';
import { Link } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export class OpenTextShare extends React.Component{
    constructor(){
        super();
        this.state={
            id:localStorage.getItem('id'),
            idTextUser:localStorage.getItem('txtIdUser'),   //Id del texto compartido conmigo
            title: localStorage.getItem('titleText'),  // Titulo del texto recepcionado
            texto: '',  // Texto del titulo recepcionado
            userIdTxt: localStorage.getItem('userId')   // Id del usuario del texto recepcionado
        }
        this.getDate = this.getDate.bind(this);
        this.getTexto = this.getTexto.bind(this);
    }

    componentDidMount(){
        this.getDate()
        this.getTexto()
    }


    
    getDate=()=>{
        myFirestore.collection('users').doc(`${this.state.id}`).collection('shareWithMe').doc(`${this.state.idTextUser}`)
        .onSnapshot(snap=>{
            this.setState({
                idTextUser: snap.data().idText,
                userIdTxt: snap.data().idUser,
            })
            localStorage.setItem("shareId",this.state.userIdTxt)
        })
    }

    getTexto=()=>{
        myFirestore.collection('users').doc(`${this.state.userIdTxt}`).collection('textos').doc(`${this.state.idTextUser}`)
        .onSnapshot(snap=>{
            this.setState({
                texto: snap.data().txtDocument,
                title: snap.data().title
            })
        })
    }

    getIntance = instance => {  //  Iniciar Vista
        instance.togglePreview();
      };


    render(){
        return(
            <div class="row">
                <div class="col-lg-2"></div>
                <div class="col-lg-8">
                <h2>{this.state.title}</h2><hr align="left" noshade="noshade" size="2" width="100%"/>
                    {<SimpleMDE
                        value={this.state.texto}
                        getMdeInstance= { this.getIntance }
                        options={{
                            toolbar: false,
                            enabled: false,
                        }}
                    />}
                    <Link to="/user/edit-text-share" id="x"class="btn btn-primary">Edit</Link>
                </div>
                <div class="col-lg-2"></div>
            </div>
        )
    }
}