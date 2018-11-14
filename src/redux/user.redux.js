import axios from 'axios';
import { getRedirectPath } from './../util'

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOGOUT = 'LOGOUT';

const initState = {
    redirectTo: '',
    msg: '',
    isAuth: false,
    user: '',
    type: ''
}

// reducer
export function user(state=initState, action) {
    switch(action.type) {
        case AUTH_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload),
                    ...action.payload
                   }
        case LOAD_DATA:
            return {...state, ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        case LOGOUT: 
            return {...initState, redirectTo: '/login'}
        default:
            return state
    }
}

function authSuccess(obj) {
    const { pwd, ...data } = obj; 
    return {
        type: AUTH_SUCCESS,
        payload: data
    }
}

function errorMsg(msg) {
    return { msg, type: ERROR_MSG}
}
 
// function registerSuccess(data) {
//     return {
//         type: REGISTER_SUCCESS,
//         payload: data
//     }
// }

// function loginSuccess(data) {
//     return {
//         type: LOGIN_SUCCESS,
//         payload: data
//     }
// }
 
export function loadData(userinfo) {
    // console.log(userinfo);
    return {
        type: LOAD_DATA,
        payload: userinfo
    }
}

export function login({user, pwd}) {
    if(!user || !pwd) {
        return errorMsg('Must enter username and paassword')
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd})
        .then(res => {
            if (res.status === 200 && res.data.code === 0) {
                // dispatch(registerSuccess({user, pwd, type}))
                
                dispatch(authSuccess(res.data.data))
            }
            else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function register({user, pwd, repeatpwd, type}) {
    if (!user || !pwd || !type) {
        return errorMsg('Must enter username and password')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('Password and confirm password must be the same')
    }
    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
        .then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess({user, pwd, type}))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }   
}

// export function userinfo() {
//     return dispatch => {
//         axios.get('/user/info').
//             then(res => {
//                 if (res.status === 200) {
//                     console.log(res.data);
//                     if(res.data.code === 0) {
//                     } else {
//                         this.props.loadData(res.data.data)
//                         this.props.history.push('/login')
//                         // console.log(this.props.history)
//                     }
//                 }
//         })
//     }
    
// }

export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            } )
    }
}

export function logoutSubmit() {
    return { type: LOGOUT }
}
