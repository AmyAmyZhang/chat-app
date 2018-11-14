import React from 'react'
import Axios from 'axios';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { loadData } from './../../redux/user.redux'

@withRouter
@connect(
    null, 
    {loadData}
)
class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname;
        if (publicList.indexOf(pathname) > -1) {
            return null;
        }
        // get user information
        Axios.get('/user/info')
            .then(res => {
                if (res.status === 200) {
                    if(res.data.code === 0) {
                        this.props.loadData(res.data.data)
                    } else {
                        this.props.history.push('/login')
                        // console.log(this.props.history)
                    }
                }
        })
        // 是否登录
        // 现在的地址 login
    }

    render() {
        return null;
    }
}

export default AuthRoute