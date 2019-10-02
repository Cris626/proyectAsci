import firebase from 'firebase';
import React from 'react';
import { myFirestore } from '../config/firebase';
import { Header } from '../Header/Header';
import { Link } from "react-router-dom";


export class Session extends React.Component{
    constructor(props){
        super(props)
        this.state ={
        user : {},
        idUser: '',
        };
        this.login=this.login.bind(this)
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user =>{
            console.log("XXXXXXXXXXXXXXXXXX")
            if(this.state.user){
                this.setState({ user: user })
            }else{
                this.setState({ user: user })
            }
        })
    } 
    
    login(){
        let provider = new firebase.auth.OAuthProvider('microsoft.com');
        firebase.auth().signInWithPopup(provider) // devuelve promesa
        .then(result => this.writeData(result.user.uid, result.user.displayName, result.user.email, result.user.photoURL))        
        .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }

    //
    logout(){
        firebase.auth().signOut()
        .then(result => alert("Logout"))
        .then(localStorage.clear())
        .catch(error => console.log(`Error: ${error.code}: ${error.message}`))
    }

    writeData(userId, name, email, imageUrl){
        localStorage.setItem("id", userId);
        localStorage.setItem("emailUser", email);
        myFirestore.collection('users').doc(userId)
        .set({
            id: userId,
            nameUser: name,
            emailUser: email,
            pictureUser: imageUrl
        })
        
    }


    render(){
        const renderLoginButton=()=>{
            return (
                <div class="row">
                    <div class="col-lg-12">
                        <ul class="nav nav-pills nav-justified">
                        <li class="btn btn-primary">
                            Demo-CrS
                        </li>
                        <li>
                            <Link to="/" onClick={this.login} class="btn btn-primary">Login</Link>
                        </li>
                        </ul>
                    </div>
                </div>
            )
        }        
        return(
            <main>
                <nav class="navbar navbar-dark bg-primary">
                    <div>
                        {this.state.user?<Header 
                            userId= {this.state.userId}
                            appName='Demo-CrS'
                            user= {this.state.user}
                            onLogout={this.logout.bind(this)}
                        />:renderLoginButton()}
                    </div>
                </nav>
            </main>
        
        )
    }
}