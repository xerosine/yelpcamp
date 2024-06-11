const mongoose = require('mongoose')
const Review = require('./Review')
const { required } = require('joi')

const Schema = mongoose.Schema

const imageSchema = new Schema({
    url: String,
    filename: String
})

imageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200,h_200')
})

imageSchema.virtual('indexImage').get(function() {
    return this.url.replace('/upload', '/upload/c_fill,g_auto,ar_5:5,w_450')
})

const opts = { toJSON: { virtuals: true} }

const campgroundSchema = new Schema({
    title: String,
    price: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true 
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    description: String,
    location: String,
    images: [imageSchema],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts)

campgroundSchema.virtual('properties.popUpMarkup').get(function() {
    return `<h6><a href="/campgrounds/${this._id}">${this.title}</a></h6>
    <strong><p>${this.description.substring(0, 20)}...</p></strong>`
})

campgroundSchema.post('findOneAndDelete', async (doc) => {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', campgroundSchema)