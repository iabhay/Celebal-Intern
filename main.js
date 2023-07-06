const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/mynewdb",{
    useNewUrlParser :true,
    useUnifiedTopology: true
},(err) => {
    if(!err){
        console.log("Connection Successful!");
    }
    else{
        console.log("Not Connected due to :  " + err);
    }
})

const schema = {
     name:String,
     "id": {
        "type":"Number",
        "required": true
    },
     "branch": "String",
     "year": "Number",
     "cgpa": "String",
     "email": {
        "type": "String",
        // "patternProperties": {
        //     "email": "([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])"
        // }
}
}
const monmodel = mongoose.model("NewMod", schema);
app.post("/post", async(req, res)=>{
    console.log("Inside Post Function");

    const data = new monmodel({
        name: req.body.name,
        id: req.body.id,
        branch: req.body.branch,
        year: req.body.year,
        cgpa: req.body.cgpa,
        email:req.body.email

    });

    const val = await data.save();
    res.json(val);
})

app.put("/update/:id", async(req, res)=>{
    console.log("Inside UPDATE Function");
    let Aid = req.params.id;
    let upname = req.body.name;
    let upbranch= req.body.branch;
    let upyear = req.body.year;
    let upcgpa = req.body.cgpa;
    let upemail = req.body.email;

    monmodel.findOneAndUpdate({id : Aid}, {$set: {
        name:upname,
        branch:upbranch,
        year:upyear,
        cgpa:upcgpa,
        email:upemail
     }},{new: true},(err,data)=>{
        if(err){
            res.send("ERROR");
        }
        else{
            if(data == null){
                res.send("Nothing Found");
            }
            else{
                res.send(data);
            }
        }
    })
    const val = await data.save();
    res.json(val);
})

app.listen(3000, ()=>{
    console.log("App Running");
})
