import React from 'react';

function Header ({appName, user, onAuth, onLogout}){
    function renderUserData(){
        return (
            <div class="row">
                <div class="col-lg-12">
                    <ul class="nav nav-pills nav-justified">
                        <li class="btn btn-primary">
                            {appName}
                        </li>
                        <li>
                            <button class="btn btn-primary">
                                Mi texto
                            </button>
                        </li>
                        <li class="btn btn-primary">
                            Compartido conmigo
                        </li>
                        <li class="btn btn-primary">
                            Compartido
                        </li>
                        <li class="btn btn-primary">
                            {user.displayName}
                        </li>
                        <li>
                            <button onClick={onLogout} class="btn btn-primary">
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
    function renderLoginButton(){
        return (
            <div class="row">
                <div class="col-lg-12">
                    <ul class="nav nav-pills nav-justified">
                    <li class="btn btn-primary">
                        {appName}
                    </li>
                    <li>
                        <button onClick={onAuth} class="btn btn-primary">
                            Login
                        </button>
                        </li>
                    </ul>
                </div>
            </div>
            
        )
    }
    return (
        <nav class="navbar navbar-dark bg-primary">
            <div>
                {user ? renderUserData(): renderLoginButton()}
            </div>
        </nav>
    )
}

export default Header