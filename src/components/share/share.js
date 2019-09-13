import React from 'react';

export class Share extends React.Component{
    state={
        showListAll:false,
        showListMe:false,
        showListShare:false
    }
    toggleShowListAll = () => {
        this.setState({showListAll: !this.state.showListAll})
        this.setState({showListMe:false})
        this.setState({showListShare:false})
    }
    toggleShowListMe = () => {
        this.setState({showListMe: !this.state.showListMe})
        this.setState({showListAll:false})
        this.setState({showListShare:false})
    }
    toggleShowListShare = () => {
        this.setState({showListShare: !this.state.showListShare})
        this.setState({showListAll:false})
        this.setState({showListMe:false})
    }
    
    render(){
        function toggleList(){
            return(
                <div class="col-lg-8">
                    <h2>Todos los archivos</h2><hr align="left" noshade="noshade" size="2" width="100%"/>
                    {/* Enlistar todos los archivos compartidos por el usuario y compartidos con el usuario */}
                </div>
            )
        } 
        function toggleListMe(){
            return(
                <div class="col-lg-8">
                    <h2>Compartido solo conmigo</h2><hr align="left" noshade="noshade" size="2" width="100%"/>
                    {/* Mostrar todos los archivos compartidos conmigo */}
                </div>
            )
        }
        function toggleListShare(){
            return(
                <div class="col-lg-8">
                    <h2>Compartido</h2><hr align="left" noshade="noshade" size="2" width="100%"/>
                    {/* Mostrar todos los archivos que compartio el usuario */}
                </div>
            )
        }
        const white=()=>{}    
        return(
            <div class="row">
                    <div class="col-lg-2">
                        <div class="list-group" id="list-tab" role="tablist">                            
                            <button onClick={this.toggleShowListAll} class="list-group-item list-group-item-action">Ver</button>
                            <button onClick={this.toggleShowListMe} class="list-group-item list-group-item-action">Solo conmigo</button>
                            <button onClick={this.toggleShowListShare} class="list-group-item list-group-item-action">Compartido</button>
                        </div>
                    </div>
                    {this.state.showListAll? toggleList(): white()}
                    {this.state.showListMe? toggleListMe(): white()}
                    {this.state.showListShare? toggleListShare(): white()}
                    <div class="col-lg-2">
                    </div>
            </div>
        )
    }
}