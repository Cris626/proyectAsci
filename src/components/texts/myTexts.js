import React from 'react';
import { myFirestore } from '../config/firebase';
import { Link } from "react-router-dom";

export class MyTexts extends React.Component{
    constructor(){
        super();
        this.state={
            id:localStorage.getItem('id'),            
            items: [],
        }
    }
    componentDidMount(){
        myFirestore.collection('users').doc(`${this.state.id}`).collection("textos").get()
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

    getUserId = (id, title) =>{
        localStorage.setItem("userId", id); 
        localStorage.setItem("titleText", title)
    }

    render(){
        const { items } = this.state;
        return(
            <div class="col-lg-8">
                <h2>My Texts</h2><hr align="left" noshade="noshade" size="2" width="100%"/>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Text</th>
                        <th scope="col">Open</th>
                        <th scope="col">Share</th>
                        </tr>
                    </thead>
                    <tbody>
                        { items && items!== undefined? items.map((item, key) =>(
                            <tr key={key}>
                                <td>{item.id}</td>
                                <td>{item.data.title/*item.data.txtDocument*/}</td>
                                <td><Link to="/user/text" type="button" class="btn btn-primary" onClick={()=> this.getUserId(item.id)}>Open</Link></td>
                                <td><Link to="/user/share" type="button" class="btn btn-primary" onClick={()=> this.getUserId(item.id, item.data.title)}>Share</Link></td>
                            </tr>
                        )): null}
                    </tbody>
                </table>
            </div>
        )
    }
}