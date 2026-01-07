const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobCode:{ type:String, required:true, unique:true},
    // userId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'User',
    //     required:true
    // },
    userId: { type: String, required: true },

    title: {type:String, required:true},
    company:{type:String,required:true},
    logo:{type:String},

    location:{type:String},
    locatedIn:{type:String},
    type:{type:String, required:true},

    tags:{type:[String], default:[]},

    salary:{
        min:{type:Number, required:true},
        max:{type:Number, required:true},  
    },

    expriencenceLevel:{type:String, required:true},

    category:{type:String,required:true},
    industry:{type:String, required:true},

    isfeatured:{type:Boolean, default:false},
    isRemote:{type:Boolean, default:false},
    applyUrl:{type:String, required:true},

    postedAt:{type:Date, default:Date.now},
    deadline:{type:Date, required:true},

    benefits: {type:[String], default:[]},
    views:{type:Number, default:0},
   savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }]

});


module.exports = mongoose.model('job',jobSchema);