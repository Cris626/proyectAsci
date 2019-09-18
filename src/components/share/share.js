import React from 'react';
//import firebase from 'firebase';
import { AllTexts } from './allText';

export class Share extends React.Component{
    state={
        showListAll:false,        
    }
    toggleShowListAll = () => {
        this.setState({showListAll: !this.state.showListAll})
        this.setState({showListMe:false})
        this.setState({showListShare:false})
    }
    render(){
        return(
            <div class="row">
                    <div class="col-lg-2">
                        <div class="list-group" id="list-tab" role="tablist">                            
                            <button onClick={this.toggleShowListAll} class="list-group-item list-group-item-action">Solo conmigo</button>
                        </div>
                    </div>
                    {this.state.showListAll? <AllTexts/>: ''}
                    <div class="col-lg-2">
                    </div>
            </div>
        )
    }
}