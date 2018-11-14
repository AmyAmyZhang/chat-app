import express from 'express'
// const express = require('express')
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import model from './model';
import csshook from 'css-modules-require-hook/preset';
import assetHook from 'asset-require-hook';
assetHook({
    extensions: ['png']
})
import React from 'react';
import { renderToString, renderToNodeStream } from 'react-dom/server';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import path from 'path';
import staticPath from '../build/asset-manifest.json';
import App from '../src/app.js';
import reducers from '../src/reducer'

// function App() {
//     return (
//         <div>
//             <p>server render</p>
//             <p>imooc rocks!</p>
//         </div>
//     )
// }


const Chat = model.getModel('chat')
const app = express();
const  userRouter = require('./user');
// work with express
const server = require('http').Server(app)

const io = require('socket.io')(server)


io.on('connection', function(socket) {
    
    socket.on('sendMsg', function(data) {
        const {from, to, msg} = data;
        const chatid = [from, to].sort().join('_')
        Chat.create({chatid, from, to, content: msg}, function(err, doc) {
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
        // console.log(data)
        // io.emit('recemsg', data)
    })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use(function(req, res, next) {
    if (req.url.startsWith('/user/')|| req.url.startsWith('/static/')) {
        return next()
    }
    let context = {}
    const store = createStore(reducers, compose(
        applyMiddleware(thunk)
    ));
    // const markup = renderToString(
    //     (<Provider store={store}>
    //         <StaticRouter
    //             location = {req.url}
    //             context = {context}
    //         >
    //             <App />
    //         </StaticRouter>
    //     </Provider>) 
    // )

    const obj = {
        '/msg': 'React chat list',
        '/boss': 'Boss to serach genius page'
    }

    res.write(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <meta name="description" content="React development App" />
        <title>React App</title>
        <link rel="stylesheet" href="${staticPath['main.css']}">
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">${markup}`)

    const markupStream = renderToNodeStream(
        (<Provider store={store}>
            <StaticRouter
                location = {req.url}
                context = {context}
            >
                <App />
            </StaticRouter>
        </Provider>) 
    )

    markupStream.pipe(res, {end: false})
    markupStream.on('end', () => {
        res.write(`</div>
        <script src="${staticPath['main.js']}">
      </body>
    </html>`)
    res.end();
    })
    // const pageHtml = `<!DOCTYPE html>
    // <html lang="en">
    //   <head>
    //     <meta charset="utf-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    //     <meta name="theme-color" content="#000000">
    //     <meta name="description" content="React development App" />
    //     <title>React App</title>
    //     <link rel="stylesheet" href="${staticPath['main.css']}">
    //   </head>
    //   <body>
    //     <noscript>
    //       You need to enable JavaScript to run this app.
    //     </noscript>
    //     <div id="root">${markup}</div>
    //     <script src="${staticPath['main.js']}">
    //   </body>
    // </html>
    // `
    
    // return res.send(pageHtml)
    // return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))

server.listen(9093, function() {
    console.log('Node app start at port 9093') 
})

// It's similar to table in mysql, mongo has concept like Schema and Model
// const User =  mongoose.model('user', new mongoose.Schema({
//     user: {type: String, required: true},
//     age: {type: Number, required: true}
// })) 

// create data
// User.create({
//     user: 'mlxg',
//     age: 19
// }, function(err, doc) {
//     if (!err) {
//         console.log(doc)
//     } else {
//         console.log(err)
//     }
// })

//delete data 
// User.remove({}, function(err, doc) {
//     console.log(doc);
// })

// update data
// User.update({'user': 'mlxg'}, {'$set': {age: 21}}, function(err, doc) {
//     console.log(doc);
// })



// app.get('/data', function(req, res) {
//     User.findOne({user: 'mlxg'}, function(err, doc) {
//         res.json(doc)
//     })
// })

// app.get('/delete', )

