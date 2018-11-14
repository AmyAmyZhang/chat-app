const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat  = model.getModel('chat')
const _filter = { 'pwd': 0, '__v': 0 }

// Chat.remove({}, function(e, d){})
Router.get('/list', function(req, res) {
    const { type } = req.query;
    // User.remove({type}, function(e,d) {});
    User.find({type}, function(err, doc) {
        return res.json({code: 0, data: doc})
    })
})

Router.get('/getmsglist', function(req, res) {

    const user = req.cookies.userid;

    User.find({}, function(e, userdoc) {
        let users = {};
        userdoc.forEach(v => {
            users[v._id] = {name: v.user, avatar: v.avatar}
        })
        Chat.find({'$or': [{from:user}, {to: user}]}, function(err, doc) {
            if (!err) {
                return res.json({code: 0, msgs: doc, users: users})
            }
        })
    })
    // {'$or': [{from: user, to: user}]}
    
})

Router.post('/readmsg', function(req, res) {
    const userid = req.cookies.userid;
    const { from } = req.body
    console.log(userid, from)
    Chat.update(
        {from, to: userid}, 
        {'$set': {read: true}},
        {'multi': true}, 
    function(err, doc) {
        console.log(doc)
        if (!err) {
            return res.json({code: 0, num: doc.nModified})
        }
        return res.json({code: 1, msg: 'Update failed'})
    })
} )

Router.post('/update', function(req, res) {
    const userid = req.cookies.userid;
    if (!userid) {
        return json.dumps({code: 1})
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, function(err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type,
        }, body)
        return res.json({code: 0, data})
    })
})
Router.post('/login', function(req, res) {
    const { user, pwd } = req.body;
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function(e, doc) {
        if (!doc) {
            return res.json({code: 1, msg: 'Username or password is wrong'})
        }
        res.cookie('userid', doc._id)
        return res.json({code: 0 , data: doc})
    })

})
Router.post('/register', function(req, res) {
    console.log(req.body);
    const { user, pwd, type } = req.body;
    User.findOne({user}, function(err, doc) {
        if (doc) {
            return res.json({code: 1, msg: 'Username is repeated'})
        }
        const userModel = new User({user, pwd: md5Pwd(pwd), type })
        userModel.save(function(e, d) {
            if (e) {
                return res.json({code: 1, msg: 'There are some problems with back-end'})
            }
            const { user, type, _id} = d;
            res.cookie('userid', _id)
            return res.json({code: 0, data: {user, type, _id}})
        })
        // User.create({user, pwd: md5Pwd(pwd), type}, function(e, d){
        //     if(e) {
        //         return res.json({code: 1, msg: 'There are some problems with back-end'})
        //     }
        //     return res.json({code: 0})
        // })
    })
})

Router.get('/info', function(req, res) {
    const { userid } = req.cookies;
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, function(err, doc) {
        if (err) {
            return res.json({code: 1, msg: 'Wrong with back-end'})
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }
    })
    
})

function md5Pwd(pwd) {
    const salt = 'imooc_is_good_3957x8!@UHJ~';
    return utils.md5(utils.md5(pwd+salt));
}

module.exports = Router