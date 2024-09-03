const mongoose  = require('mongoose');
const Company = require('./company.model');

const courieStatusSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: ['Pending','dispatched', 'In_Transit', 'Delivered', 'Cancelled']
    },
    courier_id :{
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
        type: Number, 
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
        type: Number,
        required: true 
    },
    recipient_email: { 
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
    notify:{
        type:String,
        required: true,
        enum: ['SMS','Email']
    },
    Company_Admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }

},{timesstamps: true})

const Courier = mongoose.model('Courier', courierSchema);
const CourierStatus = mongoose.model('CourierStatus', courieStatusSchema);
module.exports = {Courier,CourierStatus};