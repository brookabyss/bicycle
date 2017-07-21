var mongoose = require('mongoose');
var User = mongoose.model('User');
var Listing = mongoose.model('Listing');

module.exports ={// if errors ,send errors
    create_listing: function (req,res){
        // let user=User.findOne({_id: req.body.creator_id})
        console.log("listng body" ,req.body.title)
        let id=mongoose.Types.ObjectId(req.body.creator_id)
        var listing= new Listing({_creator_id: id,title: req.body.title, description: req.body.description, price: req.body.price,location: req.body.location,bike_img: req.body.avatar })
        listing.save(function(err,listing){
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
                     Listing.findOne(listing).populate('creator_id',['email']).exec(function(err,reply){
                        if (err){
                            console.log("EXEC ERROR",err)
                        }
                        else{
                            console.log('REPLY',reply._creator_id)
                        }
                    })
                    user.listings.push(listing)
                    user.save(function(err){
                        if(err){
                             console.log("Listings not pushed" ,err)
                        }
                       
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
        
    },
    get_listings: function (req,res){
        Listing.find({},function(err,listings){
                        if (err){
                            console.log("Error retrieving listings from db",err)
                        }
                        else{
                            console.log("get listings are we &*&&&&&&&*%^**^*^**^")
                            res.json(listings)
                        }
                    })
    },
    update_listing: function (req,res){
        Listing.update({_id: req.body._id},{
            title: req.body.title,
            bike_img: req.body.bike_img,
            location: req.body.location,
            description: req.body.description,
            price: req.body.price,
        }, function(err, numberAffected, rawResponse){
            console.log(err);
            console.log(rawResponse);
            console.log(numberAffected);
        })
        res.redirect('/get_all_listings')
    },
    delete_listing: function (req,res){
        console.log("the deleting id is ",req.body.id)
        Listing.remove({_id: req.body.id},function(err){
            if (err){
                res.json(false)
            }
            else{
                res.redirect('/get_all_listings')
            }
        })
    },

}
