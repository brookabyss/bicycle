var mongoose = require('mongoose');
var User = mongoose.model('User');
var Listing = mongoose.model('Listing');

module.exports ={// if errors ,send errors
    create_listing: function (req,res){
        console.log("listng body" ,req.body.title)
        var listing= new Listing({_creator_id: req.body.creator_id,title: req.body.title, description: req.body.description, price: req.body.price,location: req.body.location,bike_img: req.body.avatar })
        listing.save(function(err){
          if (err){
         ////  //  Failure , sending false to component     
            console.log("Inside listings error",err)
            res.json(false) 
          }
          else{
            User.findOne({_id: req.body.creator_id},function(err,user){
                if (err){
                    console.log(err)
                }
                else{
                    user.listings.push(listing)
                    user.save(function(err){
                        console.log("Listings not pushed" ,err)
                    })
                    Listing.find({},function(err,listings){
                        if (err){
                            console.log("Error retrieving listings from db",err)
                        }
                        else{
                 //////           // here is where everything is successful and we're sending the listings to the component
                            res.json(listings)
                        }
                    })
                }
            })
            
          }
        })
    }

}
