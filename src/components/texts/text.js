import React from 'react';
import {TextArea} from './note' 
import {MyTexts} from './myTexts'
import { AllTexts } from '../share/allText'

export class Txt extends React.Component{
    constructor(){
        super();
        this.state={
            showTexto: false,
            showOnlyMe: true,
            showShare: false,
        }

    }

    toggleShow = () => {
        if(this.state.showTexto){
            console.log("None...")
        }else{
            this.setState({showTexto: !this.state.showTexto})
            this.setState({showOnlyMe: false})
            this.setState({showShare: false})
        }
    }   
    toggleMe = () =>{
        if(this.state.showOnlyMe){
            console.log("None...")
        }else{
            this.setState({showOnlyMe: !this.state.showOnlyMe})
            this.setState({showTexto: false})
            this.setState({showShare: false})
        }
    }
    toggleShare=()=>{
        if(this.state.showShare){
            console.log("None...")
        }else{
            this.setState({showShare: !this.state.showShare})
            this.setState({showTexto: false})
            this.setState({showOnlyMe: false})
        }
    }
    
    render(){
        return(
            <div class="row">
                    <div class="col-lg-2">
                        <div class="list-group" id="list-tab" role="tablist">                            
                            <button onClick={this.toggleMe} class="list-group-item list-group-item-action">Texts</button>
                            <button onClick={this.toggleShare} class="list-group-item list-group-item-action">Share With Me</button>
                            <button onClick={this.toggleShow} class="list-group-item list-group-item-action">New</button>
                        </div>
                    </div>
                    {this.state.showOnlyMe? <MyTexts />:''}
                    {this.state.showShare? <AllTexts/>:''}
                    {this.state.showTexto? <TextArea />:''}
                    <div class="col-lg-2">
                    </div>
            </div>
        )
    }
}