const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const listingschema=new Schema({
    title:{
        type:String,
        required:true,
    },
    decprection:{
        type:String
    },
    image:{
        type:String,
        set:(v)=>
            v===""
            ?"https://www.dreamstime.com/photos-images/greeting-guest.html"
            :v,
    },
    price:{
        type:Number
    },
    loaction:{
        type:String
    },
    country:{
        type:String
    }
});

const Listing=mongoose.model("Listing",listingschema);
module.exports=Listing;
