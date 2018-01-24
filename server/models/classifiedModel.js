var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Add the Currency type field to the mongoose schema
 */
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var imageSchema = new Schema({
  public_id: {
    type: String
  },
  url: {
    type: String
  }
});

var classifiedSchema = new Schema({
    classifiedCategory: {
        type: String,
        required: true,
        unique: false
    },
    classifiedSubCategory: {
        type: String,
        required: true,
        unique: false
    },
    classifiedType: {
        type: String,
        required: true,
        unique: false
    },
    listingType: {
        type: String,
        required: true
    },
    listingDuration: {
        type: Number,
        required: true
    },
    premiumListing: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true,
        unique: false
    },
    cost: {
        type: Currency
    },
    images: [imageSchema],
    author: {
        fullname: {
            type: String,
            required: true,
            unique: false
        },
        phone: {
            type: String,
            required: true,
            unique: false
        },
        email: {
            type: String,
            unique: false
        }
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{timestamps: true});

/**
 * mongoose will create a collection on the database called classifieds
 */
var Classifieds = mongoose.model('Classified', classifiedSchema)

/**
 * export the module
 */
module.exports = Classifieds;
