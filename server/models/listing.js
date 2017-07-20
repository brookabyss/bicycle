var mongoose     = require('mongoose'),
// bcrypt = require('bcryptjs');
  Schema    = mongoose.Schema,
  ListingSchema  = new mongoose.Schema({
    _creator_id:{ type: Schema.Types.ObjectId, ref: "User"},
    title: {
        type: String,
        required:[true,"The title field is empty"]
    },
    price: {
        type: Number,
        required:[true,"The price field is empty"]
    },
    description: {
        type: String,
        required:[true,"The description field is empty"],
        maxlength: [200, "The description has to be less than 200 characters in length."]
    },
    location: {
        type: String,
        required:[true,"The location is empty"]
    },
    bike_img:{
         type: String
    }

  },
{ timestamps: true } );


var Listing= mongoose.model('Listing', ListingSchema);
