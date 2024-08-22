const mongoose  = require('mongoose');
const Company = require('./company.model');

const courieStatusSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'In Transit', 'Delivered', 'Cancelled']
    },
    courier :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courier',
        required: true
    },
},{timestamps: true});

const courierSchema =  new mongoose.Schema({
    sender_name:{
        type: String,
        required: true 
    },
    sender_address: { 
        type: String, 
        required: true 

    },
    sender_contact: { 
        type: String, 
        required: true 

    },
    recipient_name: { 
        type: String, 
        required: true 

    },
    recipient_address: { 
        type: String,
        required: true 

    },
    recipient_contact: { 
        type: String,
        required: true 
    }, 
    package_weight:{ 
        type: Number, 
        required: true 
    },
    package_dimensions: { 
        type: String 
    },
    package_type: { 
        type: String 
    },
    Company:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },

},{timesstamps: true})

const Courier = mongoose.model('Courier', courierSchema);

module.exports = Courier;