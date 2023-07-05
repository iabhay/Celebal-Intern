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
        "patternProperties": {
            "email": "([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])"
        }
}
}
const model = mongoose.model("NewMod", schema);
app.post("/post", async(req, res)=>{
    console.log("Inside Post Function");

    const data = new model({
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
    let id = req.params.id;
    let name = req.body.name;
    let branch= req.body.branch;
    let year = req.body.year;
    let cgpa = req.body.cgpa;
    let email = req.body.email;

    model.findByIdAndUpdate(id, {$set: {
        name:name,
        branch:branch,
        year:year,
        cgpa:cgpa,
        email:email
    }},{new:true},(err,data)=>{
        if(data == null){
            res.send("Nothing Found");
        }
        else{
            res.send(data);
        }
    })
    const val = await data.save();
    res.json(val);
})

app.listen(3000, ()=>{
    console.log("App Running");
})
