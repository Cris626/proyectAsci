import firebase from 'firebase';
import React from 'react';
import { myFirestore } from '../config/firebase';
import { Header } from '../Header/Header';


export class Session extends React.Component{
    constructor(props){
        super(props)
        this.state ={
        user : {},
        idUser: '',
        };
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user =>{
            if(this.state.user){
                this.setState({ user: user })
            }else{
                this.setState({ user: null })
            }
        })
    }
    
    login(){
        let provider = new firebase.auth.OAuthProvider('microsoft.com');
        firebase.auth().signInWithPopup(provider) // devuelve promesa
        .then(result => this.writeData(result.user.uid,result.user.displayName,result.user.email,result.user.photoURL))        
        .then(this.props.history.push("/user"))
        .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }
    
    logout(){
        firebase.auth().signOut()
        .then(result => 
            //this.props.history.push("/home")
            console.log('Cerro Sesion')
            )
        .then(localStorage.clear())
        .catch(error => console.log(`Error: ${error.code}: ${error.message}`))
    }

    writeData(userId, name, email, imageUrl){
        localStorage.setItem("id", userId)
        myFirestore.collection('users').doc(userId)
        .set({
            id: userId,
            nameUser: name,
            emailUser: email,
            pictureUser: imageUrl
        })
        
    }

    render(){
        return(
        <div>
            <Header 
                userId= {this.state.userId}
                appName='ascI'
                user= {this.state.user}
                onAuth={this.login.bind(this)}
                onLogout={this.logout.bind(this)}
            />
        </div>
        )
    }
}