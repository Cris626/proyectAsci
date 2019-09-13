import React from 'react';
import firebase from 'firebase';
import {snapShots} from 'firebase';



//////DELETE
export class Delete extends React.Component{
    state = {
        items : []
    }
    componentDidMount(){
        firebase.collection('test').get().then((snapShots) => {
            this.setState({
                items : snapShots.docs.map(doc=>{
                    console.log(doc.data());
                })
            })
        })
    }
    render(){
        return(
            <div>Hello There</div>
        )
    }
}


