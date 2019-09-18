import React from 'react';
import { Txt } from '../texts/text';
import { Link } from "react-router-dom";

export class Header extends React.Component{
    state = {
        showTexto: false,
        showShare: false,
        app: this.props.appName,
        id: localStorage.getItem('id'),
        email:localStorage.getItem('emailUser'),
    }

    clearStorage=()=>{
        localStorage.clear()
        localStorage.setItem("id", this.state.id)
        localStorage.setItem("emailUser", this.state.email)
    }

    toggleShow = () => {
        this.setState({showTexto: !this.state.showTexto})
    }    
    toggleShowShare = () => {
        this.setState({showShare: !this.state.showShare})
    }    
    render(){
        const renderUserData=()=>{
            return (
                <div class="row">
                    <div class="col-lg-12">
                        <ul class="nav nav-pills nav-justified">
                            <li class="btn btn-primary">
                                {this.state.app}
                            </li>
                            <li>
                                <Link to="/user/my-Drive" class="btn btn-primary" onClick={this.clearStorage}>Mi Unidad</Link>
                            </li>
                            <li>
                                <Link to="/user/shared-with" class="btn btn-primary" onClick={this.clearStorage}>Compartido Solo Conmigo</Link>
                            </li>
                            <li class="btn btn-primary">
                                {this.props.user.displayName}
                            </li>
                            <li>
                                <Link to="/home" onClick={this.props.onLogout} class="btn btn-primary">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
        const renderLoginButton=()=>{
            return (
                <div class="row">
                    <div class="col-lg-12">
                        <ul class="nav nav-pills nav-justified">
                        <li class="btn btn-primary">
                            {this.props.appName}
                        </li>
                        <li>
                            <button onClick={this.props.onAuth} class="btn btn-primary">
                                Login
                            </button>
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
                    {this.props.user? renderUserData(): renderLoginButton()}                    
                </div>
            </nav>   
                {this.state.showTexto? 
                <Txt
                    userID= {this.state.app}
                />: ''}         
            </main>
        )
    }
}