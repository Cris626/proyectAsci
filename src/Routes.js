import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Session } from './components/login/login';
import { Txt } from './components/texts/text';
import { Share } from './components/share/share';
import { OpenText } from './components/openTxt/openText';
import { ShareIt } from './components/shareIt/shareIt';
import { OpenTextShare } from './components/openTxt/openTxtShare';
import { Upload } from './components/fileUpload/fileUpload'

const Routes = (appName, user, onAuth, onLogout) =>{
    return (
        <Switch>
            <div class="container-fluid">
                <Route path='/home' component={ Session }/>
                <Route path='/user' component={ Session } />
                <Route path='/user/my-drive' component={ Txt } />
                <Route path='/user/text' component={ OpenText } />
                <Route path='/user/text-share' component={ OpenTextShare } />
                <Route path='/user/shared-with' component={ Share }/>
                <Route path='/user/share' component={ShareIt} />
                <Route path='/user/test' component={ Upload } />
            </div>
        </Switch>
    )
}

export default Routes