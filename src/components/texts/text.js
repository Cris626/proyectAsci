import React from 'react';
import {TextArea} from './note'

export class Txt extends React.Component{
    constructor(){
        super();
        this.state={
            showTexto: false,
            showOnlyMe: false,
        }

    }

    toggleShow = () => {
        this.setState({showTexto: !this.state.showTexto})
        this.setState({showOnlyMe: false})
    }   
    toggleMe = () =>{
        this.setState({showOnlyMe: !this.state.showOnlyMe})
        this.setState({showTexto: false})
    }
    
    render(){ 
        function justMe(){
            return(
                <div class="col-lg-8" >
                    <h2>Mis Textos</h2><hr align="left" noshade="noshade" size="2" width="100%"/>
                    {/*Hacer una lista de todos los textos del usuario donde podra eliminar y ver sus textos*/}
                </div>
            )
        }
        
        return(
            <div class="row">
                    <div class="col-lg-2">
                        <div class="list-group" id="list-tab" role="tablist">                            
                            <button onClick={this.toggleMe} class="list-group-item list-group-item-action">Ver</button>
                            <button onClick={this.toggleShow} class="list-group-item list-group-item-action">Nuevo</button>
                        </div>
                    </div>
                    {this.state.showOnlyMe? justMe():''}
                    {this.state.showTexto? <TextArea />:''}
                    <div class="col-lg-2">
                    </div>
            </div>
        )
    }
}