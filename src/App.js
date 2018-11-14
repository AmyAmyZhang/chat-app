import React from 'react';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authroute/AuthRoute';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import Dashboard from './component/dashboard/dashboard';
import Chat from './component/chat/chat';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
     
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(err, info) {
        console.log(err, info)
        this.setState({
            hasError: true
        })
    }
    render() {
        return this.state.hasError 
            ? <h2>Page has error</h2> 
            :(
            <div>
                <AuthRoute />
                <Switch>
                    <Route path="/geniusinfo" component={GeniusInfo} />
                    <Route path="/bossinfo" component={BossInfo} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/chat/:user" component={Chat} />
                    <Route component={Dashboard} />
                </Switch>
			</div>
        )
    }
}

export default App