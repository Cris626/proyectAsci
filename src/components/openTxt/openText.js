import React from 'react';
//import { storage } from 'firebase-admin';
import { myFirestore } from '../config/firebase';

export class OpenText extends React.Component{
    constructor(){
        super();
        this.state={
            id:localStorage.getItem('id'),
            idText:localStorage.getItem('userId'),
            title: '',
            texto: ''
        }
        this.getTexto = this.getTexto.bind(this);
    }

    componentDidMount(){
        console.log(localStorage.getItem('userId'));
        this.getTexto()
    }

    getTexto=()=>{
        myFirestore.collection('users').doc(`${this.state.id}`).collection('textos').doc(`${this.state.idText}`)
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