const moongose = require('mongoose')
let Schema = moongose.Schema;

let pendingSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    resName: {
        type: String
    },
    location: {
        type: [],
        required: true
    },
    dateOfAnnouncment: {
        type: Date,
        default: Date.now
    },
    picture: {
        url: {
            type: String,
            default : "https://picsum.photos/536/354"
        },
        picTitle: {
            type: String,
            default: "no-name image"
        },
    },
})



const PendingSchema = moongose.model('pending', pendingSchema);
module.exports = PendingSchema


