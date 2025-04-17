const mongoose = require('mongoose');
var schedule = new mongoose.Schema({
    doctor: String,
    days: Object,
}, {collection: 'schedule'});
const Schedule = mongoose.model('Schedule', schedule);
module.exports = Schedule;
