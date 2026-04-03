const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const listingschema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    image: {
    filename: {
      type: String,
    },
    url: {
      type: String,
      default: "https://www.dreamstime.com/photos-images/greeting-guest.html",
    },
  },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    }
});

const Listing=mongoose.model("Listing",listingschema);
module.exports=Listing;
