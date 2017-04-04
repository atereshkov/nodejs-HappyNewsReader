var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const log = require('winston');

var Updater = new Schema({
    status: {type: String, required: true},
    name: {type: String, required: true},
    lastUpdate: {type: String, required: false}
});

Updater.statics.getById = function (id) {
    const idQuery = { '_id': id };
    return this.findOne(idQuery);
};

Updater.statics.updateById = function (id, post) {
    const idQuery = { '_id': id };
    return this.findOneAndUpdate(idQuery, post);
};

module.exports = mongoose.model('Updater', Updater);

/*
class Updater {

    constructor(status){
        this.status = status;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status;
    }

    isRunning() {
        return status == "running";
    }

    print(){
        console.log('Status is :' + this.status);
    }
}

module.exports = Updater;
*/