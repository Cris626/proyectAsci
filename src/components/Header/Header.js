import React from 'react';
import { Txt } from '../texts/text';
import { Link } from "react-router-dom";

export class Header extends React.Component{
    state = {
        app: this.props.appName,
        id: localStorage.getItem('id'),
        email: localStorage.getItem('emailUser'),
    }

    clearStorage=()=>{
        localStorage.clear()
        localStorage.setItem("id", this.state.id)
        localStorage.setItem("emailUser", this.state.email)
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
                                <Link to="/user/my-Drive" class="btn btn-primary" onClick={this.clearStorage}>My Drive</Link>
                            </li>
                            <li>
                                <Link to="/user/shared-with" class="btn btn-primary" onClick={this.clearStorage}>Shared With Me</Link>
                            </li>
                            <li>
                                <Link to="/user/profile" class="btn btn-primary">{this.props.user.displayName}</Link>
                                
                            </li>
                            <li>
                                <Link to="/" onClick={this.props.onLogout} class="btn btn-primary">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
        return(
            <div>
                {renderUserData()}                    
            </div>
        )
    }
}