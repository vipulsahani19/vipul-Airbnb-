const mongoose=require('mongoose');
const datainit=require("./data.js");
const Listing=require("../models/listing.js");
const MONGO_url="mongodb://127.0.0.1:27017/Vipulairbnb";

main()
.then(()=>{
    console.log("DB connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_url);
}

const initdb=async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(datainit.data);
    console.log("data was initialized");
}
initdb();