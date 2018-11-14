import React from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { login } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import imoocForm from '../../component/imooc-form/imooc-form';

// HOC 
// function hello() {
//     console.log('hello imooc I love React')
// }
// hello()

// function WrapperHello(fn) {
//     return function() {
//         console.log('before say hello')
//         fn()
//         console.log('after say hello')
//     }  
// }

// hello = WrapperHello(hello)
// hello()

// function WrapperHello(Comp) {

    //反向继承，可以修改渲染流程，生命周期
    // class WrapComp extends Comp {
    //     componentDidMount() {
    //         console.log('HOC new added lifecycle')
    //     }
    //     render() {
    //         return <Comp></Comp>
    //     }
    // }
    //属性代理
    // class WrapComp extends React.Component {
    //     render() {
    //         return (
    //             <div>
    //                 <p>HOC</p>
    //                 <Comp  {...this.props}> </Comp>
    //             </div>
    //         )  
    //     }
    // }
//     return WrapComp
// }

// @WrapperHello
// class Hello extends React.Component {
//     render() {
//         return <h2>Hello imooc I love React and Redux</h2>
//     }
// }

// Hello = WrapperHello(Hello)

@connect(
    state => state.user,
    {login}
)
 
@imoocForm
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    // handleChange(key, val) {
    //     this.setState({
    //         [key]: val
    //     })
    // }

    handleLogin() {
        this.props.login(this.props.state);
    }

    register() {
        this.props.history.push('/register');
    } 
    render() {
        return (
            <div>
                {(this.props.redirectTo &&this.props.redirectTo!='/login')? <Redirect to={this.props.redirectTo} />:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                    <InputItem 
                        onChange={(v) => this.props.handleChange('user', v)}
                    >Username
                    </InputItem>
                    <WhiteSpace />
                    <InputItem type="password"
                        onChange={(v) => this.props.handleChange('pwd', v)}
                    >Password</InputItem>
                    </List> 
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleLogin}>Login</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>Register</Button>
                </WingBlank>
            </div>
        )  
    }
}

export default Login