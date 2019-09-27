import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Session } from './components/login/login';
import { Txt } from './components/texts/text';
import { Share } from './components/share/share';
import { OpenText } from './components/openTxt/openText';
import { ShareIt } from './components/shareIt/shareIt';
import { OpenTextShare } from './components/openTxt/openTxtShare';
import { EditText } from './components/texts/editText';
import { EditTextShare } from './components/openTxt/editTextShare';
import { Profile } from './components/profile/showProfile';

const Routes = () =>{
    return (
        <Switch>
            <div class="container-fluid">
                <Route exact path='/' component={ Session }/>
                <Route path='/user' component={ Session } />
                <Route path='/user/profile' component={ Profile } />
                <Route path='/user/my-drive' component={ Txt } />
                <Route path='/user/text' component={ OpenText } />
                <Route path='/user/edit-text' component={ EditText } />
                <Route path='/user/text-share' component={ OpenTextShare } />
                <Route path='/user/edit-text-share' component={ EditTextShare } />
                <Route path='/user/shared-with' component={ Share }/>
                <Route path='/user/share' component={ShareIt} />
            </div>
        </Switch>
    )
}

export default Routes