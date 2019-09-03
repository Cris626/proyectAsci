//import React from 'react';
//import firebase from '../config/firebase';
import Header from '../Header/Header';

//const database = firebase.database();

export class Session extends React.Component{
    constructor(){
        super();
        this.state = {
            user : {
                
            }
        }
    }

    writeUserData (userId, name, email, imageUrl){
        firebase.database().ref('users/' + userId).set({
          username: name,
          email: email,
          profile_picture : imageUrl
        });
      }

      render(){
          return(
              <div>

              </div>
          )
      }
}
