import React from 'react';
import { myFirestore } from '../config/firebase';
import { Link } from "react-router-dom";

export class ShareIt extends React.Component{
    constructor(){
        super();
        this.state={
            id:localStorage.getItem('id'),  
            //email:localStorage.getItem('emailUser'),
            titleText: localStorage.getItem('titleText'),
            idUsers:'',
            idText:localStorage.getItem('userId'),        
            items: [],
        }
    }

    componentDidMount(){
        myFirestore.collection('users').get()
        .then(snapShots=>{            
            this.setState({
                items: snapShots.docs.map(doc=>{
                    return {
                        idUsers: doc.id,
                        data: doc.data(),
                        emailUser: doc.data().emailUser
                    }
                })
            })
        },error=>{
            console.log(error)
        })
    }

    setUserShare=(id, email)=>{
        myFirestore.collection("users").doc(id).collection("shareWithMe").doc(`${this.state.idText}`)
        .set({
            idText: this.state.idText,  //Id del texto que se esta compartiendo
            idUser: this.state.id, //Id del que esta compartiendo
            title: this.state.titleText, //Titulo del texto
            emailUser: localStorage.getItem('emailUser')
        })
        if (this.state.idText!==undefined&&id!==undefined){
            alert(`Se compartio el texto ${this.state.idText} con ${email}`)
        }else{alert('Error')}
    }
    render(){
        const { items } = this.state;
        return(
            <div class="row">
                <div class="col-lg-2">
                </div>
                    <div class="col-lg-8">
                        <h2>Share With</h2><hr align="left" noshade="noshade" size="2" width="100%"/>
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Name</th>
                                <th scope="col">Share</th>
                                </tr>
                            </thead>
                            <tbody>
                                { items && items!== undefined? items.map((item, key) =>(
                                    <tr key={key}>
                                        <td>{item.data.emailUser}</td>
                                        <td>{item.data.nameUser/*item.data.txtDocument*/}</td>
                                        <td><Link to="/user/share" type="button" class="btn btn-primary" onClick={()=>this.setUserShare(item.data.id, item.data.emailUser)}>Share</Link></td>
                                    </tr>
                                )): null}
                            </tbody>
                        </table>
                    </div>
                    <div class="col-lg-2">
                    </div>
            </div>
        )
    }
}