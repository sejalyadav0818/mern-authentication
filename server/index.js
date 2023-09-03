const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookiePareser = require('cookie-parser')
const RegisterModel = require('./models/Register');

const app = express();
app.use(cors(
    {
        origin : ["http://localhost/5173"],
        methods : ["GET" , "POST"],
        credentials : true

    }
));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;  // Extracting password as well
    console.log({name, email, password});
    bcrypt.hash(password , 10)
    .then( hash =>{
        RegisterModel.create({name , email ,password : hash  }) 
        .then(user => res.json({status : "Ok"}))
        .catch(err => res.json(err))
    }).catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const { email, password} = req.body;  // Extracting password as well
    console.log({email, password});

        RegisterModel.findOne({ email}) 
        .then(user => {
            if(user){
                bcrypt.compare(password , user.password ,(err , res)=>{
                    if(res){
                        const token = jwt.sign({email : user.email, role : user.role}, "iamsky" ,{expiresIn : '1d'})
                        res.cookie("token" , token)
                        return res.json("success") 
                    
                    }else
                    {
                        return res.json("password is incorrect") 
                    }
                })
            }else
            {
             return res.json("no user exists")
            }
        })
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});