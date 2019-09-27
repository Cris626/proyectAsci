import React from 'react';
import { myFirestore } from '../config/firebase';
import { Link } from "react-router-dom";

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
                    <Link to="/user/edit-text" id="x"class="btn btn-primary">Edit</Link>
                </div>
                <div class="col-lg-2"></div>
            </div>
        )
    }
}