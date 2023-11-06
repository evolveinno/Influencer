const mongoose = require('mongoose');

const personalInformationSchema = new mongoose.Schema({
    firstName:{
     type: String,
     required: true,
    },
    lastName:{ 
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,  
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    city:{
     type: String,
     required: true,
    },
    state: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        requird: true,
    },
    shortBio: {
        type: String,
        required: true,
    },
    aboutSelf: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    
    pricing:{ 
        type: String,
        required: true,
    },
    youtube:{
        type: String,
        required: true,
    },
    instagram: {
        type: String,
        required: true,
    },
    tiktok: {
        type: String,
        required: true,
    },
    twitter: {
        type: String,
        required: true,
    },
    twitch: {
        type: String,
        required: true,
    }
});

const PersonalInformation = mongoose.model('PersonalInformation', personalInformationSchema);

module.exports = PersonalInformation;
