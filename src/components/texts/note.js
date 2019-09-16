import React from 'react';
import { myFirestore } from '../config/firebase';

export class TextArea extends React.Component{
    constructor(){
        super();
        this.state={
            id:localStorage.getItem('id'),
            items: [],
            nm: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTexto = this.getTexto.bind(this);
        this.setTexto = this.setTexto.bind(this);
    }

    updateInput=e=>{
        this.setState({
            nm: e.target.value
        })
    }

    componentDidMount(){
        this.getTexto()
        this.setState()
    }

    getTexto = () =>{
        myFirestore.collection('users').doc(`${this.state.id}`).collection("textos").doc("2")
        .onSnapshot(snap=>{
            this.setState({
                nm: snap.data().txtDocument
            })
            console.log(this.state.nm)
        })
    }

    /*setTexto = () =>{
        myFirestore.collection('users').doc(`${this.state.id}`).collection("textos").where('state','==', '2')
        .onSnapshot(querySnapshot =>{
            console.log(`recive query snapshot of size ${querySnapshot.size}`)
        })
    }*/

    handleSubmit=e=>{
        e.preventDefault();
        myFirestore.collection("users").doc(`${this.state.id}`).collection("textos").doc("2")
        .update({
            txtDocument: this.state.nm
        })
    }

    render(){
        return(
            <div class="col-lg-8" >
                <form onSubmit={this.setTexto}>
                    <h2>Nuevo archivo</h2>
                    <label>{this.state.nm}</label>
                    <textarea 
                        name="fulltext" 
                        onChange={this.setState} 
                        value={this.state.nm} 
                        placeholder="Ingresar texto" 
                        rows="18" cols="132"
                    /><br/>
                    <button id="x" class="btn btn-primary">Guardar</button>
                    <button type="submit" id="x" class="btn btn-primary">Share</button>
                </form>
            </div>
        )
    }
}