const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const users  = require("./MOCK_DATA.json");
const { type } = require("os");
const app = express();

const PORT = 3000;

const userSchema = new mongoose.Schema({
    name:{type:String,required:true,},
    enrollment_no:{unique:true,type:String,},
    father_name:{type:String,required:true,},
    program:{type:String,required:true,},
    dob:{type:String,required:true},
    validity:{type:String,},
    address:{type:String,required:true,},
    phone_no:{type:String,required:true,unique:true}
});

const User = mongoose.model("students",userSchema);

mongoose.connect('mongodb://127.0.0.1:27017/students')
.then(()=>console.log('Mongodb connected'))
.catch((err)=>console.log('Mongo error',err));

//middleware-plugin
app.use(express.urlencoded({extended:false}));
app.use(cors());


app.get("/users",async(req,res)=>{
    const allDBusers = await User.find({});
    const html = `
    <ul>
        ${allDBusers.map((user)=>`<li>${user.name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

//rest api
app.get("/api/users",async(req,res)=>{
    const allDBusers = await User.find({});
    return res.json(allDBusers);
})

app.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  console.log(`Query: User.find({ enrollment_no: ${id} })`);
  try {
    const user = await User.find({ enrollment_no: id }).exec();
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/api/users", async (req, res) => {
    const body = req.body;
    const enrollmentNo = body.enrollment_no;
  
    try {
      const user = await User.findOne({ enrollment_no: enrollmentNo }).exec();
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

app.listen(PORT,()=>console.log('Server Started at Port',PORT))

