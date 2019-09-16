import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Session } from './components/login/login';
import { Txt } from './components/texts/text';
import { Share } from './components/share/share';
/*
<Route path='/test' component={ Upload } />
<Route path='/test1' component={ Delete } />
*/
//import {Upload}  from './components/fileUpload/fileUpload'; //SubirArchivo
//import {Delete} from './components/delete';

const Routes = (appName, user, onAuth, onLogout) =>{
    return (
        <Switch>
            <div class="container-fluid">
                <Route path='/home' component={ Session }/>
                <Route path='/user' component={ Session } />
                <Route path='/user/my-drive' component={ Txt } />
                <Route path='/user/shared-with' component={ Share }/>
                
            </div>
        </Switch>
    )
}

export default Routes