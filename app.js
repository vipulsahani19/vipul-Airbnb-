const express=require("express");
const app=express();
const mongoose=require("mongoose");
const MONGO_url="mongodb://127.0.0.1:27017/Vipulairbnb";
const Listing=require("./models/listing.js");
const path=require("path");
const methodoverride=require("method-override");
const ejsmate=require("ejs-mate");


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodoverride("_method"));
app.engine("ejs",ejsmate);

main()
.then(()=>{
    console.log("DB connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_url);
}
app.get("/",(req,res)=>{
    res.send("Hi this working");
});

//index route
app.get("/listings",async (req,res)=>{
    const alllisting=await Listing.find({});
    res.render("./listings/index.ejs",{alllisting});
});

//add new listing
app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
});
//create route
app.post("/listings",async(req,res)=>{
    const newlisting=new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
    // console.log(req.body);
});


//show route
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});
});

// edit route
app.get("/listings/:id/edit", async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
});

//update route
app.put("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings?${id}`);
});
// delete route
app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    let deletlisting=await Listing.findByIdAndDelete(id);
    console.log(deletlisting);
    res.redirect("/listings");
})

//add listing
// app.get("/testlistings", async (req,res)=>{
//     let samplelisting=new Listing({
//         title:"My vila",
//         description:"By the beach",
//         price:1500,
//         location:"Goa",
//         country:"India",
//     });
//     await samplelisting.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });


app.listen(8080,() =>{
    console.log("Sever run at 8080");
});