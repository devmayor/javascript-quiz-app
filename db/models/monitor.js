const mongoose = require('mongoose');
const {MonitorSchema} = require('../schemas/monitor');
const Model = mongoose.model;

const Monitor = new Model('Monitor',MonitorSchema);

module.exports = {Monitor}