import React from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import NavLinkBar  from './../navlink/navlink';
import { Route, Redirect } from 'react-router-dom';
import Boss from '../../component/boss/boss';
import Genius from '../../component/genius/genius';
import User from '../../component/user/user';
import { getMsgList, receMsg } from '../../redux/chat.redux';
import Msg from '../../component/msg/msg';
import QueueAnim from 'rc-queue-anim';


@connect(
    state => state,
    { getMsgList, receMsg }
)

class DashBoard extends React.Component {
   
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.receMsg()
        }
        
    }
    render() {
        
        const {pathname} = this.props.location;
        const user = this.props.user;
        const navList = [
            {
                path: '/boss',
                text: 'genius',
                icon: 'boss',
                title: 'Genius List',
                component: Boss,
                hide: user.type == 'genius'  
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'Boss List',
                component: Genius,
                hide: user.type == 'boss'
            },
            {
                path: '/msg',
                text: 'Message',
                icon: 'msg',
                title: 'Message List',
                component: Msg,
            }, 
            {
                path: '/me',
                text: 'Me',
                icon: 'user',
                title: 'Personal Center',
                component: User,
            }
        ]

        const page = navList.find(v => v.path == pathname)
        return page ? (
            <div>
                <NavBar className="fixed-header" mode="dard">{page.title}</NavBar>
                <div style={{marginTop: 45}}>
                    <QueueAnim type='scaleX' delay={800}>
                        <Route key={page.path} path={page.path} component={page.component} />
                    </QueueAnim>
                </div>

                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        ) : <Redirect to="/login" />
    }
}

export default DashBoard