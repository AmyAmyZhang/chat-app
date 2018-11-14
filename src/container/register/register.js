import React from 'react';
import Logo from './../../component/logo/logo'
import { List, InputItem, Radio, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';
import { Redirect } from 'react-router';
import imoocForm from '../../component/imooc-form/imooc-form';

@connect(
    state => state.user,
    { register }
)
@imoocForm
class Register extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     user: '',
        //     pwd: '',
        //     repeatpwd: '',
        //     type: 'genius'
        // }
        this.handleRegister = this.handleRegister.bind(this);
    }

    // handleChange(key, val) {
    //     this.setState({
    //         [key]: val
    //     })
    // }

    componentDidMount() {
        this.props.handleChange('type', 'genius')
    }

    handleRegister() {
        this.props.register(this.props.state)
        // console.log(this.state)
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo />
                <List>
                    {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                    <InputItem onChange={(v) => this.props.handleChange('user', v)}>Username</InputItem>
                    
                    <InputItem type="password"
                        onChange={(v) => this.props.handleChange('pwd', v)}>Password</InputItem>
                    <WhiteSpace />
                    <InputItem type="password" labelNumber={10}
                        onChange={(v) => this.props.handleChange('repeatpwd', v)}>Confirm password</InputItem>
                    <WhiteSpace />
                    <RadioItem 
                        checked={this.state.type === 'genius'} 
                        onChange={() => this.props.handleChange('type', 'genius')}
                    >
                        Genius
                    </RadioItem>
                    <RadioItem checked={this.state.type === 'boss'} 
                        onChange={() => this.props.handleChange('type', 'boss')}
                    >
                        Boss
                    </RadioItem>
                    <Button type="primary" onClick={this.handleRegister}>Login</Button>
                </List>

            </div>
        )
    }
}

export default Register