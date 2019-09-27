import React from 'react';
import { myFirestore } from '../config/firebase';
import { Link } from "react-router-dom";
//import firebase from 'firebase';

export class AllTexts extends React.Component{
    constructor(){
        super();
        this.state={
            id:localStorage.getItem('id'),
            items: [],
        }
    }


    componentDidMount(){
        myFirestore.collection('users').doc(`${this.state.id}`).collection("shareWithMe").get()
        .then(snapShots=>{
            this.setState({
                items: snapShots.docs.map(doc=>{
                    return {
                        id: doc.id,
                        data: doc.data()
                    }
                })
            })
        },error=>{
            console.log(error)
        })
    }

    getDate = (id, title, idUser) =>{
        localStorage.setItem("txtIdUser", id); 
        localStorage.setItem("titleText", title); 
        localStorage.setItem("userId", idUser)}

    render(){const { items } = this.state;
    return(
        <div class="col-lg-8">
            <h2>Mis Textos</h2><hr align="left" noshade="noshade" size="2" width="100%"/>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Text</th>
                    <th scope="col">Open</th>
                    <th scope="col">User</th>
                    </tr>
                </thead>
                <tbody>
                    { items && items!== undefined? items.map((item, key) =>(
                        <tr key={key}>
                            <td>{item.id}</td>
                            <td>{item.data.title/*item.data.txtDocument*/}</td>
                            <td><Link to="/user/text-share" type="button" class="btn btn-primary" onClick={()=> this.getDate(item.id, item.data.title, item.data.idUser)}>Open</Link></td>
                            <td>{item.data.emailUser}</td>
                        </tr>
                    )): null}
                </tbody>
            </table>
        </div>
        )
    }
}