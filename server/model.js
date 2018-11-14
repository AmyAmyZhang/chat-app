const mongoose = require('mongoose')
//connect mongo, and use hengli collection
const DB_URL = 'mongodb://127.0.0.1:27017/hengli-chat'
mongoose.connect(DB_URL);

const models = {
    user: {
        'user': {type: String, require: true},
        'pwd': {type: String, require: true},
        'type': {'type': String, require: true},
        //image
        'avatar': {'type': String},
        // description
        'desc': {'type': String},
        // position name
        'title': { 'type': String},
        //if you are a boss, have other two word sections
        'company': {'type': String},
        'salary': {'type': String}

    },
    chat: {
        'chatid': {'type': String, 'require' : true},
        'from': { 'type': String, 'require': true},
        'to': { 'type': String, 'require': true},
        'read': {'type': Boolean, default: false},
        'content': { 'type': String, 'require': true},
        'create_time': { 'type': Number, 'default': new Date().getTime()}

    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}