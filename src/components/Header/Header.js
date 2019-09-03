import React from 'react';

function Header ({appName, user, onAuth, onLogout}){
    function renderUserData(){
        return (
            <ul class="nav nav-pills nav-justified">
                <li class="btn btn-primary">
                    {appName}
                </li>
                <li class="btn btn-primary">
                    Mis textos
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
        )
    }
    function renderLoginButton(){
        return (
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