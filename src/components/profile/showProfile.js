import React from 'react';
import { myFirestore } from '../config/firebase';
import './showProfile.css';

export class Profile extends React.Component{
    constructor(){
        super();
        this.state={
            id: localStorage.getItem('id'),
            emailUser: '',
            nameUser: '',
            pictureUser: ''
        }
    }

    componentDidMount(){
        this.getTexto()
    }

    getTexto = () =>{   //
        myFirestore.collection('users').doc(`${this.state.id}`)
        .onSnapshot(snap=>{
            this.setState({
                emailUser: snap.data().emailUser,
                nameUser: snap.data().nameUser,
                pictureUser: snap.data().pictureUser
            })
        })
    }

    returnImagen=()=>{
        if(this.state.pictureUser == null){
            return `https://i.pinimg.com/originals/60/99/f3/6099f305983371dadaceae99f5c905bf.png`            
        }else{
            return this.state.pictureUser
        }
    }

    render(){
        return(
            <div class="row">
                <div class="col-lg-4"></div>
                <div class="col-lg-4">
                    <div class="text-center">
                        <img src={this.returnImagen()} id="imagenPerfil" class="img-thumbnail" /><br/>
                        <label>{this.state.nameUser}</label><br/>
                        <label>{this.state.emailUser}</label><br/>
                    </div>
                </div>
                <div class="col-lg-4"></div>
            </div>
        )
    }
}