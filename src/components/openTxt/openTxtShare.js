import React from 'react';
//import { storage } from 'firebase-admin';
import { myFirestore } from '../config/firebase';

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
        /*console.log(this.state.userIdTxt)
        console.log(this.state.idTextUser)*/
        myFirestore.collection('users').doc(`${this.state.id}`).collection('shareWithMe').doc(`${this.state.idTextUser}`)
        .onSnapshot(snap=>{
            this.setState({
                idTextUser: snap.data().idText,
                userIdTxt: snap.data().idUser
            })
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


    render(){
        return(
            <div class="row">
                <div class="col-lg-2"></div>
                <div class="col-lg-8">
                <h2>{this.state.title}</h2><hr align="left" noshade="noshade" size="2" width="100%"/>
                    <div class="margin">
                        <p class="text-justify">{this.state.texto}</p>
                    </div>
                    <button id="x"class="btn btn-primary">Guardar</button>
                    <button id="x"class="btn btn-primary">Editar</button>
                </div>
                <div class="col-lg-2"></div>
            </div>
        )
    }
}