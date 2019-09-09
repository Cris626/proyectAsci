import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Session } from './components/login/login'
import  Text  from './components/texts/text';

const Routes = (appName, user, onAuth, onLogout) =>{
    return (
        <Switch>
            <div class="container-fluid">
                <Route exact path='/home' component={ Session }/>
                <Route exact path='/user/Text' component={ Text }/>
                <Route exact path='/user' component={ Session } />
            </div>
        </Switch>
    )
}

export default Routes