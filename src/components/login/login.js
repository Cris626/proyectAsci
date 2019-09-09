import React from 'react';
import firebase from '../config/firebase';
import Header from '../Header/Header';

export class Session extends React.Component{
    constructor(props){
        super(props)
        this.state ={
        user : {}
        };
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user =>{
            if(this.state.user){
                this.setState({ user })
            }else{
                this.setState({ user: null })
            }
        })
    }
    
    login(){
        let provider = new firebase.auth.OAuthProvider('microsoft.com');
        firebase.auth().signInWithPopup(provider) // devuelve promesa
        .then(result => 
            this.writeUserData(result.user.uid,result.user.displayName,result.user.email,result.user.photoURL),
            this.props.history.push("/user")
            )
        .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }
    
    logout(){
        firebase.auth().signOut()
        .then(result => 
            this.props.history.push("/home")
            )
        .catch(error => console.log(`Error: ${error.code}: ${error.message}`))
    }
    
    writeUserData(userId, name, email, imageUrl) {
        firebase.database().ref('users/' + userId).set({
          username: name,
          email: email,
          profile_picture : imageUrl
        });
    }

    render(){
        return(
        <div>
            <Header 
                appName='ascI'
                user= {this.state.user}
                onAuth={this.login.bind(this)}
                onLogout={this.logout.bind(this)}
            />
            
        </div>
        )
    }
}