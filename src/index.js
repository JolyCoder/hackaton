import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router'
import { Provider } from 'react-redux' 
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import history from './parts/history'
import Register from './parts/register'
import { createStore } from 'redux'
import Login from './parts/login'
import MyCab from './parts/mycab'
import Tests from './parts/tests'
import TestU from './parts/testu'
import Fl from './parts/fl'

const initState = {
    session: {
        user: "",
        logged: false
    }
}

function reducer(state = initState, action)
{
    if(action.type == "LOGGED"){
        state.session.user = action.payload
        state.session.logged = true
    }
    return state;
}

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route exact path='/' component={App} />
                <Route path='/reg' component={Register} />
                <Route path='/login' component={Login} />
                <Route path='/mycab' component={MyCab} />
                <Route path='/tests' component={Tests} />
                <Route path='/testu' component={TestU} />
                <Route path='/fl' component={Fl} />
            </div>
        </Router>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
